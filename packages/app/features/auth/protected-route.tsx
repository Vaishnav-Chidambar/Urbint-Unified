import React, { ReactNode } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { useAuth } from './context'
import { AuthScreen } from './screen'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#f5f5f5'
      }}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={{ marginTop: 16, fontSize: 16, color: '#333' }}>Loading...</Text>
      </View>
    )
  }

  if (!isAuthenticated) {
    return <AuthScreen />
  }

  return <>{children}</>
} 