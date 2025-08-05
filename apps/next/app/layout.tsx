import type { Metadata } from 'next'
import { NextTamaguiProvider } from 'app/provider/NextTamaguiProvider'
import { AuthClientProvider } from './AuthClientProvider'

export const metadata: Metadata = {
  title: 'Urbint Unified - Utility Intelligence Suite',
  description: 'Unified access to all your tools for smarter, safer operations',
  icons: '/favicon.ico',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // You can use `suppressHydrationWarning` to avoid the warning about mismatched content during hydration in dev mode
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextTamaguiProvider>
          <AuthClientProvider>
            {children}
          </AuthClientProvider>
        </NextTamaguiProvider>
      </body>
    </html>
  )
}
