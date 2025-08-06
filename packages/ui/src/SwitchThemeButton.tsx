import { Button } from 'tamagui'
import { Moon, Sun } from '@tamagui/lucide-icons'
import { useThemeContext } from './ThemeProvider'

export const SwitchThemeButton = () => {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <Button
      size="$3"
      circular
      icon={theme === 'light' ? Moon : Sun}
      onPress={toggleTheme}
      chromeless
      color="$color10"
    />
  )
}
