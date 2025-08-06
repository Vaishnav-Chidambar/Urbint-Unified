import React, { createContext, useContext, useState, useEffect } from 'react'
import { useColorScheme } from 'react-native'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme()
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    // Initialize theme from system preference
    if (colorScheme) {
      setThemeState(colorScheme as Theme)
    }
  }, [colorScheme])

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light')
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  // Update document body class for web
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.className = document.body.className.replace(/t_light|t_dark/g, '')
      document.body.classList.add(`t_${theme}`)
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
} 