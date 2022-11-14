import React from 'react'

const ThemeContext = React.createContext({
  isTheme: false,
  changeTheme: () => {},
})

export default ThemeContext
