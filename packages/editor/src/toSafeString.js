export const toSafeString = (text = '') =>
  text
    .split('_')
    .map(w => w.replace(/./, m => m.toUpperCase()))
    .join('')

export default toSafeString
