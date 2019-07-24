/** @jsx jsx */
import { jsx } from 'theme-ui'
import set from 'lodash.set'
import { useEditor } from './context'

const Fields = ({ name, scale, onChange }) => (
  <div>
    <h2>{name}</h2>
    {Object.entries(scale).map(([key, value]) => (
      <div key={key}>
        <label htmlFor={key}>{key}</label>
        <input
          name={key}
          value={value}
          onChange={e => {
            const next = set(scale, key, e.target.value)
            onChange(next)
          }}
        />
      </div>
    ))}
  </div>
)

export const Type = () => {
  const { theme, setTheme } = useEditor()

  const {
    fonts = {},
    fontWeights = {},
    lineHeights = {},
    fontSizes = {},
  } = theme

  return (
    <div>
      <Fields
        name="fonts"
        scale={fonts}
        onChange={next => {
          setTheme({
            fonts: next,
          })
        }}
      />
    </div>
  )
}

export default Type
