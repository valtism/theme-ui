/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState, useRef } from 'react'
import set from 'lodash.set'
import { ChromePicker } from 'react-color'
import Swatch from './ColorSwatch'
import { useEditor } from './context'
import { useOnClickOutside } from './hooks'

const join = (...args) => args.filter(Boolean).join('.')

export const ColorRow = ({ colors, name, omit = [], size, setTheme }) => {
  const ref = useRef()
  const [open, setOpen] = useState(false)

  useOnClickOutside(ref, () => {
    setOpen(false)
  })

  return (
    <div
      sx={{
        fontSize: '12px',
        display: 'grid',
        gridGap: 16,
        gridTemplateColumns: `repeat(auto-fit, ${size}px)`,
      }}>
      {Object.entries(colors).map(([key, value]) => {
        if (!value || omit.includes(key)) return false
        const id = join(name, key)
        if (typeof value === 'object') {
          return <ColorRow key={key} name={id} colors={value} omit={omit} />
        }
        return (
          <div
            key={key}
            sx={{
              position: 'relative',
            }}>
            <Swatch
              name={id}
              value={value}
              size={size}
              onClick={e => {
                setOpen(key)
              }}
            />
            {open === key && (
              <div
                ref={ref}
                sx={{
                  position: 'absolute',
                  zIndex: 4,
                  top: '100%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}>
                <ChromePicker
                  color={value}
                  disableAlpha
                  onChangeComplete={next => {
                    const nextColors = set(colors, id, next.hex)
                    setTheme({ colors: nextColors })
                  }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export const ColorPalette = ({ omit = [], size = 64 }) => {
  const context = useEditor()
  const { theme, setTheme } = context
  const { colors = {} } = theme

  return (
    <ColorRow omit={omit} size={size} colors={colors} setTheme={setTheme} />
  )
}

export default ColorPalette
