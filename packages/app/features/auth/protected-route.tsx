import React, { ReactNode } from 'react'
import { useAuth } from './context'
import { AuthScreen } from './screen'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#f5f5f5',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div>Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AuthScreen />
  }

  return <>{children}</>
} 