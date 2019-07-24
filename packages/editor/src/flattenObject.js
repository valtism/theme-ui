export const flattenObject = object => {
  const result = {}

  function flatten(obj, prefix = '') {
    Object.keys(obj).forEach(key => {
      const value = obj[key]
      if (typeof value === 'object') {
        flatten(value, `${prefix}${key}.`)
      } else {
        result[`${prefix}${key}`] = value
      }
    })
  }

  flatten(object)

  return result
}
export default flattenObject
