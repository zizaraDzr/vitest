import { isEmpty, isNumeric, isValidJson, isValidDate } from '../src/helpers/index.js'

export const Operation = {
    eq: 'eq',
    neq: 'neq',
    lte: 'lte',
    gte: 'gte',
    lt: 'lt',
    gt: 'gt',
    isNull: 'is_null',
    isNotNull: 'is_not_null',
    in: 'in',
    notIn: 'not_in',
    equalsAll: 'equals_all',
    notEqualsAll: 'not_equals_all',
    cs: 'cs',
    ncs: 'ncs',
 } as const;

 export type OperationKeys = keyof typeof Operation;
 export type OperationValues = typeof Operation[OperationKeys];
 export type MathOperationKeys = Extract<OperationValues, "eq" | "neq" | "lte" | "gte" | "lt" | "gt">
 export type OperationXref = Extract<OperationValues, 'in' | 'not_in' | 'equals_all' | 'not_equals_all'>
 export type OperationEmpty = Extract<OperationValues, 'is_null' | 'is_not_null'>
 export type OperationString= Extract<OperationValues, 'cs' | 'ncs'>
 export type filterTypes ='field' | 'constant'
 export type componentType = 'agGrid' | 'list'
 export type IRowClassRulesList = boolean | string;
 export interface IDataFilters {
  alias: string;
  attribute: string;
  equalsType: OperationValues;
  isKey: boolean;
  isXref: boolean;
  type: filterTypes
}
export interface IRowClassRulesBuilder {
  id: number;
  operator: 'and'| 'or'
  className: string
  nameCondition: string
  dataFilter: IDataFilters[]
}
export interface IRowClassRulesAgGrid {
  [cssClassName: string]: (params: {data: any}) => boolean | string;
}

export interface IModelCard {
  id?: number,
  guid?: string,
  [attr: string]: any;
}
export interface IDataTable {
    [attr: string]: any;
  }
export interface IBuildData {
  rules: IRowClassRulesBuilder[],
  modelCard: IModelCard,
  componentType?: componentType,
  dataTable?:IDataTable
}
export const mathOperation: MathOperationKeys[] = ['eq', 'gt', 'gte', 'lt', 'lte', 'neq'];
export const operationXref: OperationXref[] = ['equals_all', 'in', 'not_equals_all', 'not_in'];
export const operationEmpty: OperationEmpty[] = ['is_not_null', 'is_null'];
export const operationString: OperationString[] = ['cs', 'ncs'];

export const mathOperations: { [K in MathOperationKeys]: (x: number | string, y: number | string) => boolean } = {
  [Operation.eq]: (x, y) => x === y,
  [Operation.neq]: (x, y) => x !== y,
  [Operation.lt]: (x, y) => x < y,
  [Operation.lte]: (x, y) => x <= y,
  [Operation.gt]: (x, y) => x > y,
  [Operation.gte]: (x, y) => x >= y,
};
// пусто / не пусто
export const operationByEmpty: { [K in OperationEmpty]: (fieldTable: any) => boolean } = { 
  [Operation.isNull]: (fieldTable) =>{
    return isEmpty(fieldTable)
  },
  [Operation.isNotNull]: (fieldTable) =>{
    return !isEmpty(fieldTable)
  },
}
// содержит / не содержит
export const operationByString: { [K in OperationString]: (fieldTable: string, fieldCard: string) => boolean }= { 
  [Operation.cs]: (fieldTable, fieldCard) => {
    let сardData = fieldCard.toLocaleLowerCase().trim()
    let tableData = fieldTable.toLocaleLowerCase().trim()
    if (сardData.length && tableData.length) {
       // /\s*[\s,]\s*/ - разбивает строку на подстроки, используя  пробельные символы или запятые в качестве разделителей.
      let arrAttr = сardData.split(/\s*[\s,]\s*/)
      let arrvalue = tableData.split(',')
      arrvalue = arrvalue.map(item => item.trim())
      return arrAttr.some(el => arrvalue.toString().includes(el))
    }
  
    return false
  },
  [Operation.ncs]: (fieldTable, fieldCard) => {
    let сardData = fieldCard.toLocaleLowerCase().trim()
    let tableData = fieldTable.toLocaleLowerCase().trim()
    if (сardData.length && tableData.length) {
       // /\s*[\s,]\s*/ - разбивает строку на подстроки, используя  пробельные символы или запятые в качестве разделителей.
      let arrAttr = сardData.split(/\s*[\s,]\s*/)
      let arrvalue = tableData.split(',')
      arrvalue = arrvalue.map(item => item.trim())
      return !arrAttr.some(el => arrvalue.toString().includes(el))
    }
  
    return false
  }
}

// множественная сслыка
export const operationByXref: { [K in OperationXref]: (fieldTable: any, fieldCard?: string[] | number) => boolean } = {
  [Operation.in]: (fieldTable, fieldCard?) => {
    const attr = fieldTable + ''
    const valueColumn = fieldCard + ''
    if (attr?.length && valueColumn?.length) {
      const arrAttr = attr.split(',')
      const arrvalueColumn = valueColumn.split(',')
      // сравнить элементы двух массивов
      return arrAttr.some(el => arrvalueColumn.includes(el))
    }
    return false
  },
  [Operation.notIn]: (fieldTable, fieldCard?)=> {
    const attr = fieldTable + ''
    const valueColumn = fieldCard + ''
    if (attr?.length && valueColumn?.length) {
      const arrAttr = attr.split(',')
      const arrvalueColumn = valueColumn.split(',')
      // сравнить элементы двух массивов
      return !arrAttr.some(el => arrvalueColumn.includes(el))
    }
    return false
  },
  [Operation.equalsAll]: (fieldTable, fieldCard?)=>  {
    const attr = fieldTable + ''
    const valueColumn = fieldCard + ''
    if (attr?.length && valueColumn?.length) {
      const arrAttr = attr.split(',')
      const arrvalueColumn = valueColumn.split(',')
      // сравнить элементы двух массивов
      return arrAttr.every(el => arrvalueColumn.includes(el))
    }
    return false
  },
  [Operation.notEqualsAll]: (fieldTable, fieldCard?)=>  {
    const attr = fieldTable + ''
    const valueColumn = fieldCard + ''
    if (attr?.length && valueColumn?.length) {
      const arrAttr = attr.split(',')
      const arrvalueColumn = valueColumn.split(',')
      // сравнить элементы двух массивов
      return !arrAttr.every(el => arrvalueColumn.includes(el))
    }
    return false
  },
}
export default class RowClassRulesBuilder {
  private static componentType = {
    'agGrid': RowClassRulesBuilder.aggrid,
    'list': RowClassRulesBuilder.list
  }
  static build ({ rules, modelCard = {}, componentType = 'agGrid', dataTable }: IBuildData): IRowClassRulesAgGrid | IRowClassRulesList | null {
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
  private static сalculateRule (dataTable: IDataTable | undefined, rules: IRowClassRulesBuilder, modelCard:IModelCard): boolean | string {
    if (dataTable) {
      const results: boolean[] = rules.dataFilter.map(item => {
        let isMathOperation = false
        if (mathOperation.some(element => element === item.equalsType)) {
          isMathOperation = true
        }
        // console.log('isMathOperation', isMathOperation)
        if (item.type === 'constant' && isMathOperation) {
          return this.сalculateMathConstant(item, dataTable)
        }
        if (item.type === 'field' && isMathOperation) {
          return this.сalculateMathField(item, dataTable, modelCard)
        }
        if (!isMathOperation) {
         
          return this.сalculateNotMathOperation(item, dataTable, modelCard)
        }
        return false
      })
      if (rules.operator === 'and') {
        return results.every(item => item)
      }
      if (rules.operator === 'or') {
        return results.some(item => item)
      }
    }

    return ''
  }
  private static сalculateMathConstant (dataFilters: IDataFilters, dataTable: IDataTable): boolean {
    // Псевдоним атрибута
    const attr = dataFilters.isXref ? `${dataFilters.alias}id` : dataFilters.alias;
    const valueAsConst = dataFilters.attribute
    const valueByTable = dataTable[attr]
    const equalsType = dataFilters.equalsType as MathOperationKeys
    if (isValidDate(valueAsConst) && isValidDate(valueByTable)) {
      return mathOperations[equalsType](valueByTable, valueAsConst)
    }
    const value = this.conversionToNumber(valueAsConst);
    const attrColumn = this.conversionToNumber(valueByTable);
    if (typeof value === 'undefined' || typeof attrColumn === 'undefined') {
      return false
    }

    return mathOperations[equalsType](attrColumn, value)
  }
  private static сalculateMathField (dataFilters: IDataFilters, dataTable: IDataTable, modelCard: IModelCard): boolean {
    // Псевдоним атрибута
    const attr = dataFilters.isXref ? `${dataFilters.alias}id` : dataFilters.alias;
    const valueByCard = modelCard[dataFilters.attribute]
    const valueByTable = dataTable[attr]
    const equalsType = dataFilters.equalsType as MathOperationKeys

    if (isValidDate(valueByCard) && isValidDate(valueByTable)) {
      return mathOperations[equalsType](valueByTable, valueByCard)
    }
    // поле в карточке
    const value: number | undefined = this.conversionToNumber(valueByCard)
    const attrColumn: number | undefined = this.conversionToNumber(valueByTable)
    if (typeof value === 'undefined' || typeof attrColumn === 'undefined') {
      return false
    }

    return mathOperations[equalsType](attrColumn, value)
  }
  private static сalculateNotMathOperation (dataFilters: IDataFilters, dataTable: IDataTable, modelCard: IModelCard): boolean {
    const attr = dataFilters.isXref ? `${dataFilters.alias}id` : dataFilters.alias;

    let attrColumn = dataTable[attr]
    let equalsType = dataFilters.equalsType
    // мн. ссылка
    if (dataFilters.type === 'field' && dataFilters.attribute && operationXref.includes(equalsType as OperationXref)) {
      let value: string[] = modelCard[dataFilters.attribute]
      if (!attrColumn || !value) {
        return false
      }
      return operationByXref[equalsType as OperationXref](attrColumn, value)
    }
    
    if (operationString.includes(equalsType as OperationString)) {
      const value = dataFilters.type === 'field' ? modelCard[dataFilters.attribute] : dataFilters.attribute
      if (typeof value !== 'string' || typeof attrColumn !== 'string') {
        return false
      }

      // console.log('value', value)
      return operationByString[equalsType as OperationString](attrColumn, value)
    }
    
    if (operationEmpty.includes(equalsType as OperationEmpty)) {
      return operationByEmpty[equalsType as OperationEmpty](attrColumn)
    }
   

    return false
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
      let foundID = arrayXref.map((item: unknown): string | number | undefined => {
        if (item !== null && typeof item === 'object' ) {
            const typedItem = item as {id?: (string | number)}
            if (typedItem.id) {
                return typedItem.id
              }
        }
        return undefined
      })
      if (isNumeric(foundID)) {
        return +foundID
      }
    }
    return undefined
  }
}



