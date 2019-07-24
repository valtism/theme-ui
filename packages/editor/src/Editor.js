import React, { useEffect } from 'react'
import { useThemeUI } from 'theme-ui'
import { Context } from './context'

export const Editor = ({ context: outerContext, children }) => {
  const themeUI = useThemeUI()
  const context = outerContext || themeUI
  context.__EDITOR__ = true

  return <Context.Provider value={context}>{children}</Context.Provider>
}
