import { describe, expect, it } from 'vitest'
import { checkConditions } from '../src/conditions.js'

/** condition_type: 'and' | 'or'
     * conditions: [{
        attribute: null,
        type: 'equals' | 'not_equals' | equals' | 'is_null' |is_not_null' | 'contains' |not_contains' | 'contains_in_array' |not_contains_in_array
        value: null
      }]
      type: 'condition' |  'never' | 'always' */
let fields = {
  attr_undefined_: undefined,
  attr_stringEmpty_: '',
  attr_null_: null,
  attr_number_: 5,
  attr_string_: 'нет смысла',
  attr_BigString_: '[_EDIT_196_DEL_196_VIEW_196_ACT_2_ADD_2_EDIT_2_DEL_2_VIEW_2_ACT_]',
  attr_xrefEmpty_: '[]',
  attr_xref_: '[{"id": 14529, "name": "26.01.2024  №  06-02-01/ЛК/36"}]',
  attr_xrefMulti_:
    '[{"id": 14529, "name": "26.01.2024  №  06-02-01/ЛК/36"},{"id": 1452, "name": "26.01.2024  №  06-02-01/ЛК/36"}]'
}
describe('Тест условий скрытия ', () => {
  it('1. задано НИКОГДА', () => {
    expect(checkConditions({ type: 'never' }, true, fields)).to.equal(false)
  })
  it('2. задано ВСЕГДА', () => {
    let condition = {
      condition_type: 'and',
      type: 'always',
      conditions: [
        {
          attribute: '1',
          type: 'equals',
          value: 5
        }
      ]
    }
    expect(checkConditions(condition, true, fields)).to.equal(true)
  })
  it('3. задано Условие: Связка "И". Тип: РАВНО (equals). Точное совпадение', () => {
    let condition = {
      condition_type: 'and',
      type: 'condition',
      conditions: [
        {
          attribute: 'number',
          type: 'equals',
          value: 5
        },
        {
          attribute: 'number',
          type: 'equals',
          value: '5'
        },
        {
          attribute: 'string',
          type: 'equals',
          value: 'нет смысла'
        }
      ]
    }

    expect(checkConditions(condition, true, fields)).to.equal(true)
  })
  it('4. задано Условие: Связка "И". Тип: НЕ РАВНО (not_equals).', () => {
    let condition = {
      condition_type: 'and',
      type: 'condition',
      conditions: [
        {
          attribute: 'number',
          type: 'not_equals',
          value: '51'
        },
        {
          attribute: 'number',
          type: 'not_equals',
          value: 51
        },
        {
          attribute: 'string',
          type: 'not_equals',
          value: 'нет1'
        }
      ]
    }

    expect(checkConditions(condition, true, fields)).to.equal(true)
  })
  it('5. задано Условие: Связка "И". Тип: ПУСТО (is_null).', () => {
    let condition = {
      condition_type: 'and',
      type: 'condition',
      conditions: [
        {
          attribute: 'stringEmpty',
          type: 'is_null',
          value: 4
        },
        {
          attribute: 'null',
          type: 'is_null',
          value: 5
        },
        {
          attribute: 'undefined',
          type: 'is_null',
          value: '1452, 14529'
        },
        {
          attribute: 'xrefEmpty',
          type: 'is_null',
          value: '1452, 14529'
        },
        {
          attribute: 'не сущетсвующий атрибут',
          type: 'is_null',
          value: '1452, 14529'
        }
      ]
    }

    expect(checkConditions(condition, true, fields)).to.equal(true)
  })
  it('6. задано Условие: Связка "И". Тип: НЕ ПУСТО (is_not_null).', () => {
    let condition = {
      condition_type: 'and',
      type: 'condition',
      conditions: [
        {
          attribute: 'number',
          type: 'is_not_null',
          value: 4
        },
        {
          attribute: 'string',
          type: 'is_not_null',
          value: 5
        },
        {
          attribute: 'xref',
          type: 'is_not_null',
          value: '1452, 14529'
        },
        {
          attribute: 'xrefMulti',
          type: 'is_not_null',
          value: '1452, 14529'
        }
      ]
    }

    expect(checkConditions(condition, true, fields)).to.equal(true)
  })
  it('7. задано Условие: Связка "И". Тип: НЕ СОДЕРЖИТ (not_contains).', () => {
    let condition = {
      condition_type: 'and',
      type: 'condition',
      conditions: [
        {
          attribute: 'number',
          type: 'not_contains',
          value: '4,6'
        },
        {
          attribute: 'number',
          type: 'not_contains',
          value: '4'
        },
        {
          attribute: 'string',
          type: 'not_contains',
          value: 'неТ, lf, не'
        },
        {
          attribute: 'BigString',
          type: 'not_contains',
          value: '_3_'
        },
        {
          attribute: 'string',
          type: 'not_contains',
          value: '42, смыслай'
        },
        {
          attribute: 'string',
          type: 'not_contains',
          value: 'смыслай'
        },
          {
            attribute: 'xref',
            type: 'not_contains',
            value: '50'
          },
          {
            attribute: 'xref',
            type: 'not_contains',
            value: '50, 14529q'
          },
          {
            attribute: 'xrefMulti',
            type: 'not_contains',
            value: '58, 1452q'
          },
          {
            attribute: 'xrefMulti',
            type: 'not_contains',
            value: '1452q, 52'
          }
      ]
    }

    expect(checkConditions(condition, true, fields)).to.equal(true)
  })
  it('7.1 задано Условие: Связка "ИЛИ" (потому что ожидается false где-то). Тип: НЕ СОДЕРЖИТ (not_contains).', () => {
    let condition = {
      condition_type: 'or',
      type: 'condition',
      conditions: [
        {
          attribute: 'number',
          type: 'not_contains',
          value: '5,4'
        },
        {
          attribute: 'string',
          type: 'not_contains',
          value: 'нет, lf, не'
        },
        {
          attribute: 'BigString',
          type: 'not_contains',
          value: '_2_'
        },
        {
          attribute: 'string',
          type: 'not_contains',
          value: 'смысла'
        },
        {
          attribute: 'xrefNull',
          type: 'not_contains',
          value: ''
        },
          {
            attribute: 'xref',
            type: 'not_contains',
            value: '14529'
          },
          {
            attribute: 'xref',
            type: 'not_contains',
            value: '50, 14529'
          },
          {
            attribute: 'xrefMulti',
            type: 'not_contains',
            value: '58, 1452'
          },
          {
            attribute: 'xrefMulti',
            type: 'not_contains',
            value: '1452, 52'
          }
      ]
    }

    expect(checkConditions(condition, true, fields)).to.equal(false)
  })
  it('8. задано Условие: Связка "И". Тип: СОДЕРЖИТ (contains). Ссылка не включена в тест', () => {
    let condition = {
      condition_type: 'and',
      type: 'condition',
      conditions: [
        {
          attribute: 'number',
          type: 'contains',
          value: '5'
        },
        {
          attribute: 'string',
          type: 'contains',
          value: 'нет'
        },
        {
          attribute: 'string',
          type: 'contains',
          value: '42, смысла'
        },
        {
          attribute: 'string',
          type: 'contains',
          value: 'нетми, нет'
        },
        {
          attribute: 'string',
          type: 'contains',
          value: 'нет, cv'
        },
      //     {
      //       attribute: 'xref',
      //       type: 'contains',
      //       value: '14529'
      //     },
      //     {
      //       attribute: 'xrefMulti',
      //       type: 'contains',
      //       value: '1452'
      //     }
      ]
    }

    expect(checkConditions(condition, true, fields)).to.equal(true)
  })
  it('9. задано Условие: Связка "И". Тип: НЕ СОДЕРЖИТ В МАССИВЕ (|||) (not_contains_in_array). Условие для ссылки?', () => {
    let condition = {
      condition_type: 'and',
      type: 'condition',
      conditions: [
        {
          attribute: 'xref',
          type: 'not_contains_in_array',
          value: '52'
        },
        {
          attribute: 'xref',
          type: 'not_contains_in_array',
          value: '52,46'
        },
        {
          attribute: 'xrefMulti',
          type: 'not_contains_in_array',
          value: '52'
        },
        {
          attribute: 'xrefMulti',
          type: 'not_contains_in_array',
          value: '52, 422'
        }
      ]
    }

    expect(checkConditions(condition, true, fields)).to.equal(true)
  })
  it('10. задано Условие: Связка "И". Тип: СОДЕРЖИТ В МАССИВЕ (|||) (contains_in_array). Условие для ссылки?', () => {
    let condition = {
      condition_type: 'and',
      type: 'condition',
      conditions: [
        {
          attribute: 'xref',
          type: 'contains_in_array',
          value: '14529'
        },
        {
          attribute: 'xref',
          type: 'contains_in_array',
          value: '14529, 46'
        },
        {
          attribute: 'xrefMulti',
          type: 'contains_in_array',
          value: '14529'
        },
        {
          attribute: 'xrefMulti',
          type: 'contains_in_array',
          value: '52, 14529'
        }
      ]
    }

    expect(checkConditions(condition, true, fields)).to.equal(true)
  })
  it('11. задано Условие: Связка "ИЛИ". Тип: СОДЕРЖИТ В МАССИВЕ (|||) (contains_in_array). Тип: ПУСТО (is_null).', () => {
    let condition = {
      condition_type: 'or',
      type: 'condition',
      conditions: [
        {
          attribute: 'xref',
          type: 'contains_in_array',
          value: '14529'
        },
        {
          attribute: 'xref',
          type: 'contains_in_array',
          value: '14529, 46'
        },
        {
          attribute: 'xrefMulti',
          type: 'contains_in_array',
          value: '14529'
        },
        {
          attribute: 'xrefMulti',
          type: 'contains_in_array',
          value: '52, 14529'
        },
        {
          attribute: 'stringEmpty',
          type: 'is_null',
          value: 4
        },
        {
          attribute: 'null',
          type: 'is_null',
          value: 5
        },
        {
          attribute: 'undefined',
          type: 'is_null',
          value: '1452, 14529'
        },
        {
          attribute: 'xrefEmpty',
          type: 'is_null',
          value: '1452, 14529'
        },
        {
          attribute: 'не сущетсвующий атрибут',
          type: 'is_null',
          value: '1452, 14529'
        }
      ]
    }

    expect(checkConditions(condition, true, fields)).to.equal(true)
  })
  it('12. задано Условие: Связка "ИЛИ". Тип: СОДЕРЖИТ (contains). Тип: НЕ ПУСТО (is_not_null). Результат FALSE', () => {
    let condition = {
      condition_type: 'or',
      type: 'condition',
      conditions: [
        {
          attribute: 'number',
          type: 'contains',
          value: '54'
        },
        {
          attribute: 'string',
          type: 'contains',
          value: 'нет0'
        },
        {
          attribute: 'string',
          type: 'contains',
          value: 'нетми, нет0'
        },
        {
          attribute: 'string',
          type: 'contains',
          value: 'нет0, cv'
        },
        {
          attribute: 'xrefEmpty',
          type: 'is_not_null',
          value: '1452, 14529'
        }
      ]
    }

    expect(checkConditions(condition, true, fields)).to.equal(false)
  })
})
