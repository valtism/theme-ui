import {
  createContext,
  useContext,
  useState,
} from 'react'
import {
  jsx as ejsx,
  ThemeContext as Emotion,
} from '@emotion/core'
import { css, get } from '@styled-system/css'

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
  const css = getCSS(props)
  if (css) next.css = css
  return next
}

export const jsx = (type, props, ...children) =>
  emotion.apply(undefined, [type, parseProps(props), ...children])

const styled = (tag, key) => props =>
  jsx(tag, {
    ...props,
    sx: { variant: 'styles.' + (key || tag) }
  })

export const Styled = {
  p: styled('p'),
  h1: styled('h1'),
  h2: styled('h2'),
  h3: styled('h3'),
  h4: styled('h4'),
  h5: styled('h5'),
  h6: styled('h6'),
  img: styled('img'),
  a: styled('a'),
  pre: styled('pre'),
  code: styled('code'),
  ol: styled('ol'),
  ul: styled('ul'),
  li: styled('li'),
  blockquote: styled('blockquote'),
  hr: styled('hr'),
  em: styled('em'),
  strong: styled('strong'),
  del: styled('delete'),
  table: styled('table'),
  tr: styled('tr'),
  th: styled('th'),
  td: styled('td'),
  inlineCode: styled('code', 'inlineCode'),
  thematicBreak: styled('hr', 'thematicBreak'),
  // theme-ui custom
  div: styled('div'),
  root: styled('div', 'root'),
}

export const Context = createContext({
  theme: {},
  components: Styled,
})

export const useThemeUI = () => useContext(Context)

const useColorState = () => {
  // todo: localStorage shit
  return useState('default')
}

const applyColorMode = (theme, mode) => {
  if (!mode) return theme
  const modes = get(theme, 'colors.modes', {})
  return merge.all({}, theme, {
    colors: get(modes, mode, {}),
  })
}

export const ThemeProvider = ({
  theme: propsTheme,
  children,
}) => {
  const outer = useThemeUI()
  const [colorMode, setColorMode] = useColorState()
  const theme = applyColorMode(propsTheme, colorMode)
  const context = {
    ...outer,
    colorMode,
    setColorMode,
  }

  return jsx(Emotion.Provider, {
    theme,
  },
    jsx(MDXProvider, {
      components: Styled,
    },
      jsx(Context.Provider, {
        children
      })
    )
  )
}
