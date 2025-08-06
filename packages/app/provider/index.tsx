import { useColorScheme } from 'react-native'
import {
  CustomToast,
  TamaguiProvider,
  type TamaguiProviderProps,
  ToastProvider,
  config,
  isWeb,
  ThemeProvider,
  useThemeContext,
} from '@my/ui'
import { ToastViewport } from './ToastViewport'

function TamaguiProviderWithTheme({ children, ...rest }: TamaguiProviderProps) {
  const { theme } = useThemeContext()
  
  return (
    <TamaguiProvider config={config} defaultTheme={theme} {...rest}>
      {children}
    </TamaguiProvider>
  )
}

export function Provider({
  children,
  defaultTheme = 'light',
  ...rest
}: Omit<TamaguiProviderProps, 'config'> & { defaultTheme?: string }) {
  const colorScheme = useColorScheme()
  const theme = defaultTheme || (colorScheme === 'dark' ? 'dark' : 'light')

  return (
    <ThemeProvider>
      <TamaguiProviderWithTheme {...rest}>
        <ToastProvider swipeDirection="horizontal" duration={6000} native={isWeb ? [] : ['mobile']}>
          {children}
          <CustomToast />
          <ToastViewport />
        </ToastProvider>
      </TamaguiProviderWithTheme>
    </ThemeProvider>
  )
}
