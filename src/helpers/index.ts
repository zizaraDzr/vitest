/**
 * Валидный JSON (JSON — это объект или массив)
 *
 * @param text
 * @example
 * isValidJson('{"name": "John", "age": 30}')); // true
 * isValidJson('[1, 2, 3]')); // true
 * isValidJson('0')); // false
 * isValidJson('"string"')); // false
 */
export const isValidJson = function (text: any): boolean {
    if (typeof text !== 'string') {
      return false
    }
  
    try {
      const parsed = JSON.parse(text)
      return typeof parsed === 'object' && parsed !== null
    } catch (e) {
      return false
    }
  }

  /**
 проверка на число
 @param n - Любая переменная
*/
export const isNumeric = (n: any): boolean => {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }

  export const isEmpty = (value: any): boolean => {
    if (value == null) { // Проверяет null и undefined
      return true
    }
  
    if (typeof value === 'string') {
      const trimmedValue = value.trim()
      return trimmedValue.length === 0 || trimmedValue === '[]'
    }
  
    if (Array.isArray(value)) {
      return value.length === 0
    }
  
    if (typeof value === 'object') {
      return Object.keys(value).length === 0
    }
  
    return false
  }
  export function isValidDate (dateString:string):boolean {
    if (typeof dateString !== 'string') return false
    // Проверяем, соответствует ли строка формату YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/
    if (!regex.test(dateString)) {
      return false
    }
  
    const parts = dateString.split('-')
    const year = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10)
    const day = parseInt(parts[2], 10)
  
    const date = new Date(year, month - 1, day)
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
  }