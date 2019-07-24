/** @jsx jsx */
import { jsx } from 'theme-ui'

export const ColorSwatch = ({ name, value, size = 64, ...props }) => (
  <div {...props}>
    <div
      sx={{
        width: size,
        height: size,
        bg: value,
      }}
    />
    <div sx={{ py: 2 }}>{name || value}</div>
  </div>
)

export default ColorSwatch
