/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui'
import Label from './Label'
import { makeHtmlSafeLabel } from '../utils'

export const Input = ({ label, ...props }) => {
  const [colorMode] = useColorMode()
  const id = makeHtmlSafeLabel(label)
  return (
    <div sx={{ my: 3 }}>
      <Label htmlFor={id}>{label}</Label>
      <input
        {...props}
        name={id}
        id={id}
        sx={{
          appearance: 'none',
          bg: colorMode === 'dark' ? 'color' : 'background',
          color: colorMode === 'dark' ? 'background' : 'color',
          border: `2px solid`,
          borderColor: 'color',
          borderRadius: 6,
          display: `block`,
          fontSize: 1,
          fontFamily: `inherit`,
          lineHeight: 1,
          py: 2,
          px: 2,
          width: `100%`,
          '&:focus': {
            outline: 'none',
            borderColor: 'primary',
          },
        }}
      />
    </div>
  )
}

export default Input
