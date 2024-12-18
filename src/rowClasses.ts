import { isNumeric, isValidJson } from '../src/helpers/index.js'

enum Operation {
   eq = 'eq',
   neq = 'neq',
   lte = 'lte',
   gte = 'gte',
   lt = 'lt',
   gt = 'gt',
   isNull = 'is_null',
   isNotNull = 'is_not_null',
   in = 'in',
   notIn = 'not_in',
}
type filterTypes ='field' | 'constant'
type componentType = 'agGrid' | 'list'
type IRowClassRulesList = boolean | string;
 interface IDataFilters {
  alias: string;
  attribute: string;
  equalsType: Operation;
  isKey: boolean;
  isXref: boolean;
  type: filterTypes
}
interface IRowClassRulesBuilder {
  id: number;
  operator: 'and'| 'or'
  className: string
  nameCondition: string
  dataFilter: IDataFilters[]
}
interface IRowClassRulesAgGrid {
  [cssClassName: string]: (params: {data: any}) => boolean | string;
}

interface IModelCard {
  id?: number,
  guid?: string,
  [attr: string]: any;
}
interface IDataTable {
    [attr: string]: any;
  }
interface IBuildData {
  rules: IRowClassRulesBuilder[],
  modelCard: IModelCard,
  componentType?: componentType,
  dataTable?:object[]
}
const notMathOperation = [Operation.isNull, Operation.isNotNull, Operation.in, Operation.notIn]

const mathOperations = {
  [Operation.eq]: function (x: number, y: number): boolean { return x === y },
  [Operation.neq]: function (x: number, y: number): boolean { return x !== y },
  [Operation.lt]: function (x: number, y: number): boolean { return x < y },
  [Operation.lte]: function (x: number, y: number): boolean { return x <= y },
  [Operation.gt]: function (x: number, y: number): boolean { return x > y },
  [Operation.gte]: function (x: number, y: number): boolean { return x >= y }
}
const notMathOperations = {
  [Operation.isNull]: function (x, y?): boolean {
    if (x === null) {
      return true
    }
    if (isValidJson(x)) {
      let arrayXrefOrMulti = JSON.parse(x) || []
      if (arrayXrefOrMulti.length > 0) {
        return false
      }
      return true
    }

    if (isNumeric(x)) return false
    if (x?.length) return false

    return true
  },
  [Operation.isNotNull]: function (x, y?): boolean {
    if (x === null) {
      return false
    }
    if (isValidJson(x)) {
      let arrayXrefOrMulti = JSON.parse(x) || []
      if (arrayXrefOrMulti.length > 0) {
        return true
      }
      return false
    }

    if (isNumeric(x)) return true
    if (x?.length) return true

    return false
  },
  // множественная сслыка
  [Operation.in]: function (x, y: string[] | number): boolean {
    let attr = x + ''
    let valueColumn = y + ''
    if (attr?.length && valueColumn?.length) {
      let arrAttr = attr.split(',')
      let arrvalueColumn = valueColumn.split(',')
      // сравнить элементы двух массивов
      return arrAttr.some(el => arrvalueColumn.includes(el))
    }
    return false
  },
  // множественная сслыка
  [Operation.notIn]: function (x, y: string[] | number): boolean {
    let attr = x + ''
    let valueColumn = y + ''
    if (attr?.length && valueColumn?.length) {
      let arrAttr = attr.split(',')
      let arrvalueColumn = valueColumn.split(',')
      // сравнить элементы двух массивов
      return !arrAttr.some(el => arrvalueColumn.includes(el))
    }
    return false
  }
}
export default class RowClassRulesBuilder {
  private static componentType = {
    'agGrid': RowClassRulesBuilder.aggrid,
    'list': RowClassRulesBuilder.list
  }
  static build ({ rules, modelCard = {}, componentType = 'agGrid', dataTable }: IBuildData): IRowClassRulesAgGrid | IRowClassRulesList| null {
    const buildFunction = this.componentType[componentType].bind(this)
    if (typeof buildFunction === 'function') {
      const result = buildFunction({ rules, modelCard, dataTable })

      return result
    }

    return null
  }
  private static aggrid ({ rules, modelCard }:IBuildData): IRowClassRulesAgGrid {
    // console.log('aggrid', { rules, modelCard })
    let result = Object.create(null)
    result = rules.reduce((acc: IRowClassRulesAgGrid, item) => {
      let userClass = item.className
      acc[userClass] = function (params: {data: any}) {
        return RowClassRulesBuilder.сalculateRule(params.data, item, modelCard)
      }.bind(this)
      return acc
    }, {})

    return result
  }
  private static list ({ rules, modelCard, dataTable }: IBuildData): IRowClassRulesList {
    // console.log('list', { rules, modelCard, dataTable })
    let result = Object.create(null)
    result = rules.reduce((acc: Record<string, boolean | string>, item) => {
      let userClass = item.className
      acc[userClass] = this.сalculateRule(dataTable, item, modelCard)
      return acc
    }, {})

    return result
  }
  private static сalculateRule (dataTable:object[] | undefined, rules: IRowClassRulesBuilder, modelCard:IModelCard): boolean | string {
    if (dataTable) {
      let result: boolean[] = []
      result = rules.dataFilter.map(item => {
        let mathOperation = !notMathOperation.includes(item.equalsType)
        if (item.type === 'constant' && mathOperation) {
          return this.сalculateConstant(item, dataTable)
        }
        if (item.type === 'field' && mathOperation) {
          return this.сalculateField(item, dataTable, modelCard)
        }
        if (!mathOperation) {
          return this.сalculateNotMathOperation(item, dataTable, modelCard)
        }
        return false
      })
      if (rules.operator === 'and') {
        return result.every(item => item)
      }
      if (rules.operator === 'or') {
        return result.some(item => item)
      }
    }

    return ''
  }
  private static сalculateConstant (dataFilters: IDataFilters, dataTable: IDataTable): boolean {
    // Псевдоним атрибута
    let attr: string = dataFilters.alias
    if (dataFilters.isXref) {
      attr = `${attr}id`
    }
    let value: number | undefined = this.conversionToNumber(dataFilters.attribute)
    let attrColumn: number | undefined = this.conversionToNumber(dataTable[attr])
    if (typeof value === 'undefined' || typeof attrColumn === 'undefined') {
      return false
    }
    let equalsType: Omit<Operation, 'isNull', 'isNotNull'> = dataFilters.equalsType

    return mathOperations[equalsType](attrColumn, value)
  }
  private static сalculateField (dataFilters: IDataFilters, dataTable: IDataTable, modelCard: IModelCard): boolean {
    // Псевдоним атрибута
    let attr: string = dataFilters.alias
    if (dataFilters.isXref) {
      attr = `${attr}id`
    }
    // поле в карточке
    let value: number | undefined = this.conversionToNumber(modelCard[dataFilters.attribute])
    let attrColumn: number | undefined = this.conversionToNumber(dataTable[attr])
    if (typeof value === 'undefined' || typeof attrColumn === 'undefined') {
      return false
    }
    let equalsType: Operation = dataFilters.equalsType

    return mathOperations[equalsType](attrColumn, value)
  }
  private static сalculateNotMathOperation (dataFilters: IDataFilters, dataTable: IDataTable, modelCard: IModelCard): boolean {
    let attr: string = dataFilters.alias
    if (dataFilters.isXref) {
      attr = `${attr}id`
    }

    let attrColumn: any = dataTable[attr]
    let equalsType: Operation = dataFilters.equalsType
    // мн. ссылка
    if (dataFilters.type === 'field' && dataFilters.attribute) {
      let value: string[] = modelCard[dataFilters.attribute]
      if (!attrColumn || !value) {
        return false
      }
      // ожидается equalsType = in, notIn
      return notMathOperations[equalsType](attrColumn, value)
    }

    return notMathOperations[equalsType](attrColumn)
  }
  // Преобразовать данные в число
  private static conversionToNumber (value: any): number | undefined {
    if (isNumeric(value)) {
      return +value
    }
    if (typeof value === 'boolean') {
      return value ? 1 : 0
    }
    // случай, когда включена галка "оптимизировать загрузку"
    if (isValidJson(value)) {
      let arrayXref = JSON.parse(value) || []
      // простая ссылка
      let foundID = arrayXref.map(item => item.id)[0]
      if (isNumeric(foundID)) {
        return +foundID
      }
    }
    return undefined
  }
}



