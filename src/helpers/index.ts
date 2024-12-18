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