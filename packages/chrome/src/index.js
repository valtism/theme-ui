import React from 'react'
import { render } from 'react-dom'
import App from './App'

const panelColorMode =
  window.chrome.devtools.panels.themeName === 'dark' ? 'dark' : 'light'

render(<App panelColorMode={panelColorMode} />, document.getElementById('root'))
