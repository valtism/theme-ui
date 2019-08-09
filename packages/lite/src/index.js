import React, { createContext, useContext } from 'react'
import {
  jsx as emotion,
  ThemeContext as EmotionContext,
  Global,
} from '@emotion/core'
import { MDXProvider } from '@mdx-js/react'
import css, { get } from '@styled-system/css'
import { toCustomProperties, createColorStyles } from './custom-properties'

const getCSS = props => {
  if (!props.sx && !props.css) return undefined
  return theme => {
    const styles = css(props.sx)(theme)
    const raw = typeof props.css === 'function' ? props.css(theme) : props.css
    return [styles, raw]
  }
}

const parseProps = props => {
  if (!props) return null
  const next = {}
  for (let key in props) {
    if (key === 'sx') continue
    next[key] = props[key]
  }
  next.css = getCSS(props)
  return next
}

export const jsx = (type, props, ...children) =>
  emotion.apply(undefined, [type, parseProps(props), ...children])

const styled = (tag, key) => props =>
  jsx(tag, {
    ...props,
    sx: { variant: `styles.${key || tag}` },
  })

const p = styled('p')
const h1 = styled('h1')
const h2 = styled('h2')
const h3 = styled('h3')
const h4 = styled('h4')
const h5 = styled('h5')
const h6 = styled('h6')
const img = styled('img')
const a = styled('a')
const pre = styled('pre')
const code = styled('code')
const ol = styled('ol')
const ul = styled('ul')
const li = styled('li')
const blockquote = styled('blockquote')
const hr = styled('hr')
const em = styled('em')
const strong = styled('strong')
const del = styled('delete')
const table = styled('table')
const tr = styled('tr')
const th = styled('th')
const td = styled('td')
const inlineCode = styled('code', 'inlineCode')
const thematicBreak = styled('hr', 'thematicBreak')

// only include MDX components
export const components = {
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  img,
  a,
  pre,
  code,
  ol,
  ul,
  li,
  blockquote,
  hr,
  em,
  strong,
  delete: del,
  table,
  tr,
  th,
  td,
  inlineCode,
}

export const Context = createContext({
  theme: {},
  components,
  colorMode: null,
  setColorMode: () => {},
})

export const useThemeUI = () => useContext(Context)

const STORAGE_KEY = 'theme-ui-color-mode'

const useColorState = () => {
  const [mode, setMode] = useState('default')
  // todo localstorage hooks
  return [mode, setMode]
}

// shallow theme merge
export const merge = (a = {}, b = {}) => {
  const result = {}
  for (const key in a) {
    result[key] = a[key]
  }
  for (const key in b) {
    if (!a[key] || typeof a[key] !== 'object') {
      result[key] = b[key]
    } else {
      result[key] = merge(a[key], b[key])
    }
  }
  return result
}

const createColorStyles = theme => {
  return {}
}

export const ColorMode = () => (
  <Global
    styles={theme => ({
      body: createColorStyles(theme),
    })}
  />
)

const applyColorMode = (theme, mode) => {
  if (!mode) return theme
  const modes = get(theme, 'colors.modes', {})
  return merge(theme, {
    colors: get(modes, mode, theme.colors),
  })
}

export const ThemeProvider = props => {
  const outer = useThemeUI()
  const [colorMode, setColorMode] = useColorState()
  const theme = applyColorMode(
    merge(outer.theme, props.theme),
    outer.colorMode || colorMode
  )
  const context = {
    colorMode,
    setColorMode,
    ...outer,
    theme,
  }
  const emotheme = { ...theme }
  emotheme.colors = toCustomProperties(emotheme.colors, 'colors')

  return (
    <EmotionContext.Provider value={emotheme}>
      <Context.Provider value={context}>
        <ColorMode />
        {props.children}
      </Context.Provider>
    </EmotionContext.Provider>
  )
}

// for making MDX optional
export const ComponentProvider = props => {
  const outer = useThemeUI()
  const components = merge(outer.components, props.components)
  return <MDXProvider components={components}>{props.children}</MDXProvider>
}
