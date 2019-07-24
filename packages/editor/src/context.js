import { createContext, useContext } from 'react'

const noop = () => {}

export const Context = createContext({
  theme: {},
  setTheme: noop,
})

export const useEditor = () => useContext(Context)
