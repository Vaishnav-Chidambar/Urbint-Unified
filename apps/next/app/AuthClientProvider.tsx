'use client'

import { AuthProvider } from 'app/features/auth/context'

export function AuthClientProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
} 