import React from 'react'
import Section from './Section'
import Label from './Label'
import Input from './Input'
import toSafeString from './toSafeString'

const InputList = ({ name, values, onChange, type, ...props }) => {
  ;<React.Fragment>
    {Object.keys(values).map(key => {
      const id = toSafeString(name + key)
      return (
        <div key={key}>
          <Label htmlFor={id}>{key}</Label>
          <Input
            {...props}
            id={id}
            name={id}
            value={values[key]}
            onChange={e => {
              const val =
                type === 'number' ? parseFloat(e.target.value) : e.target.value
              onChange({ [key]: val })
            }}
          />
        </div>
      )
    })}
  </React.Fragment>
}

export const Typography = ({ theme, setTheme }) => {
  const { fonts = {}, fontSizes = [] } = theme

  return (
    <Section heading="Typography">
      <h3>Fonts</h3>
      <InputList
        name="fonts"
        values={fonts}
        onChange={next => {
          setTheme({
            fonts: next,
          })
        }}
      />
      {/* Object.keys(theme.fonts || {}).map(key => {
        const id = toSafeString(key)
          return (
            <div key={key}>
              <Label
                htmlFor={id}>
                {key}
              </Label>
              <Input
                id={id}
                name={name}
                value={theme.fonts[key]}
                onChange={e => {
                  setTheme({
                    fonts: {
                      [key]: e.target.value,
                    },
                  })
                }}
              />
            </div>
          )
      })*/}
      <h3>Font Sizes</h3>

      <InputList
        name="fontSizes"
        type="number"
        values={fontSizes}
        onChange={next => {
          console.log({ fontSizes: next })
        }}
      />
      {/* Array.isArray(theme.fontSizes)
        ? theme.fontSizes.map((n, i) => (
            <Input
              key={i}
              label={`theme.fontSizes[${i}]`}
              type="number"
              value={n}
              onChange={e => {
                const n = parseInt(e.target.value)
                setTheme({
                  fontSizes: [
                    ...theme.fontSizes.slice(0, i),
                    n,
                    ...theme.fontSizes.slice(i + 1),
                  ],
                })
              }}
            />
          ))
        : Object.keys(theme.fontSizes).map(key => (
            <Input
              key={key}
              label={`theme.fontSizes.${key}`}
              type="number"
              value={theme.fontSizes[key]}
              onChange={e => {
                const n = parseInt(e.target.value)
                setTheme({
                  fontSizes: {
                    [key]: n,
                  },
                })
              }}
            />
        )) */}
    </Section>
  )
}

export default Typography
