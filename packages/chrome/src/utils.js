export const runScript = script => {
  return new Promise((resolve, reject) => {
    debounce(window.chrome.devtools.inspectedWindow.eval, 100)(
      script,
      (result, err) => {
        if (err) {
          console.error(err)
          reject(err)
        }
        resolve(result)
      }
    )
  })
}

export const makeHtmlSafeLabel = (text = '') => {
  return text
    .split('_')
    .map(w => w.replace(/./, m => m.toUpperCase()))
    .join('')
}
