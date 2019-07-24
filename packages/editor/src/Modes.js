import React, { useState, useEffect } from 'react'
import Section from './Section'
import Label from './Label'
import Select from './Select'

export const Modes = ({ colorMode, theme, setColorMode }) => {
  const [value, setValue] = useState(colorMode)
  const modes = ['initial', ...Object.keys(theme.colors.modes || {})]

  useEffect(() => {
    if (value) {
      setColorMode(value)
    }
  }, [value])

  return (
    <Section heading="Modes">
      <Label htmlFor='modes'>
        Modes
      </Label>
      <Select
        id='modes'
        name='modes'
        value={value}
        onChange={e => setValue(e.target.value)}>
        {modes.map(mode => (
          <option key={mode}>
            {mode}
          </option>
        ))}
      </Select>
    </Section>
  )
}

export default Modes
