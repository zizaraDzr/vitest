
/**
     * data
     *
     * @param data
     * condition_type: 'and' | 'or'
     * conditions: [{
        attribute: null,
        type: 'equals' | 'not_equals' | equals' | 'is_null' |is_not_null' | 'contains' |not_contains' | 'contains_in_array' |not_contains_in_array
        value: null
      }]
      type: 'condition' |  'never' | 'always'
        * @param fields
     * {
        attr_N_: null,
      }
     * @return {boolean}
     */
      export function checkConditions (data, sourceRegistry = false, fields = {}) {
        if (!data || Object.keys(data).length === 0 || data.type === 'never') {
            return false
          } else if (data.type === 'always') {
            return true
          }
          let result = false
          let isXref = false
          data.conditions.forEach((condition) => {
            if (!condition.attribute || !condition.type) {
              return false
            }
            let conditionResult = false
            let attribute
            if (sourceRegistry) {
              attribute = fields[`attr_${condition.attribute}_`]
            } else {
                // нельзя протестить getModel
            //   attribute = this.getModel()[condition.attribute]
            attribute = fields[`attr_${condition.attribute}_`]
            }
            try {
              attribute = JSON.parse(attribute)
            } catch (e) {
    
            }
            if (attribute instanceof Array) {
              isXref = true
              attribute = attribute.map(item => item.id || item).join('|||')
            }
            // console.log({attribute})
            let value = condition.value
            if (value === 'user_id') {
                 // нельзя протестить store
            //   value = this.$store.getters['Authorization/userId']
            value = 1
            }
            if (value === 'role_id') {
                 // нельзя протестить store
            //   value = this.$store.getters['Authorization/roleId']
            value = 1
            }
            // console.log({value})
            switch (condition.type) {
              case 'contains_in_array':
                let attrArray = (attribute || '').toString().split('|||')
                // conditionResult = attrArray.includes(value.toString())
                conditionResult = attrArray.some(el => value.includes(el))
                break
              case 'not_contains_in_array':
                  let _attrArray = (attribute || '').toString().split('|||')
                //   conditionResult = !_attrArray.includes(value.toString())
                  conditionResult = !_attrArray.some(el => value.includes(el))
                break
              case 'contains':
                // const _attr = (attribute || '').toString().split('|||')
                // _attr.forEach((item) => {
                //   if (item.indexOf(value) !== -1) {
                //     conditionResult = true
                //   }
                // })
                let attr1 = attribute + ''
                let valueArray1 = value + ''
                if (attr1?.length && valueArray1?.length) {
                  let arrAttr = attr1.split(' ')
                  let arrvalue = valueArray1.split(',')
                  arrvalue = arrvalue.map(item => item.trim())
                    conditionResult = arrAttr.some(el => arrvalue.includes(el))
    
                  // conditionResult = !attr.includes(valueArray)
                }
                break
              case 'not_contains':
                let attr = attribute + ''
                let valueArray = value + ''
                if (attr?.length && valueArray?.length) {
                  // /\s*[\s,]\s*/ - разбивает строку на подстроки, используя  пробельные символы или запятые в качестве разделителей.
                  let arrAttr = attr.replace(/\|\|\|/gi, ' ').split(/\s*[\s,]\s*/)
                  let arrvalue = valueArray.split(',')
                  arrvalue = arrvalue.map(item => item.trim())
                  // предполагается, что это одна строка
                  if (arrAttr.length === 1 && !isXref ) {
                    conditionResult = !attr.includes(arrvalue)
                    if (arrvalue.length > 1) {
                      conditionResult = !arrvalue.includes(attr)
                    }
                    break
                  }
                    conditionResult = !arrAttr.some(el => arrvalue.includes(el))
                }
                break
              case 'equals':
                if (attribute == value) {
                  conditionResult = true
                }
                break
              case 'not_equals':
                if (attribute != value) {
                  conditionResult = true
                }
                break
              case 'is_null':
                if (
                  attribute === null ||
                  typeof attribute === 'undefined' ||
                  attribute === '' ||
                  attribute === false
                ) {
                  conditionResult = true
                }
                break
              case 'is_not_null':
                if (
                  attribute !== null &&
                  typeof attribute !== 'undefined' &&
                  attribute !== '' &&
                  attribute !== false
                ) {
                  conditionResult = true
                }
                break
              default:
                break
            }
            condition.result = conditionResult
          })
    
          if (data.condition_type === 'and') {
            if (data.conditions.length === data.conditions.filter(item => item.result).length) {
              result = true
            }
          } else if (data.condition_type === 'or') {
            if (data.conditions.find(item => item.result)) {
              result = true
            }
          }
    
          return result
    }