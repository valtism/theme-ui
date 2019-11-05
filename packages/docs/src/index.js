/** @jsx jsx */
import { jsx } from 'theme-ui'
import Layout from './components/layout'

const fullwidthPages = [
  '/',
  '/sandbox',
]

export const wrapPageElement = ({ element, props }) => (
  <Layout
    {...props}
    fullwidth={fullwidthPages.includes(props.location.pathname)}
    children={element}
  />
)

export { default as Banner } from './components/banner'
export { default as Tiles } from './components/tiles'
export { default as Cards } from './components/cards'
export { default as Note } from './components/note'
