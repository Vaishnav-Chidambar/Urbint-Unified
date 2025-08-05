import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: string
  tenantId: string
  permissions: string[]
}

interface Tenant {
  id: string
  name: string
  domain: string
  ssoProvider: 'okta' | 'azure' | 'google' | 'custom'
  logo?: string
}

interface AuthContextType {
  user: User | null
  tenant: Tenant | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string, tenant: Tenant) => Promise<boolean>
  loginWithSSO: (tenant: Tenant) => Promise<boolean>
  logout: () => void
  setTenant: (tenant: Tenant) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check localStorage for existing session (only on client side)
        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem('urbint_user')
          const storedTenant = localStorage.getItem('urbint_tenant')
          
          if (storedUser && storedTenant) {
            try {
              const userData = JSON.parse(storedUser)
              const tenantData = JSON.parse(storedTenant)
              
              // Validate session (in real app, you'd verify with your backend)
              if (userData && tenantData) {
                setUser(userData)
                setTenant(tenantData)
              }
            } catch (parseError) {
              console.error('Failed to parse stored auth data:', parseError)
              // Clear invalid data
              localStorage.removeItem('urbint_user')
              localStorage.removeItem('urbint_tenant')
            }
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string, selectedTenant: Tenant): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock user data (in real app, this would come from your backend)
      const mockUser: User = {
        id: 'user-123',
        email,
        name: email.split('@')[0],
        role: 'user',
        tenantId: selectedTenant.id,
        permissions: ['read', 'write']
      }
      
      // Store in localStorage (only on client side)
      if (typeof window !== 'undefined') {
        localStorage.setItem('urbint_user', JSON.stringify(mockUser))
        localStorage.setItem('urbint_tenant', JSON.stringify(selectedTenant))
      }
      
      setUser(mockUser)
      setTenant(selectedTenant)
      
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithSSO = async (selectedTenant: Tenant): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Simulate SSO redirect
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock SSO user data
      const mockUser: User = {
        id: 'sso-user-456',
        email: 'user@sso.com',
        name: 'SSO User',
        role: 'user',
        tenantId: selectedTenant.id,
        permissions: ['read', 'write', 'admin']
      }
      
      // Store in localStorage (only on client side)
      if (typeof window !== 'undefined') {
        localStorage.setItem('urbint_user', JSON.stringify(mockUser))
        localStorage.setItem('urbint_tenant', JSON.stringify(selectedTenant))
      }
      
      setUser(mockUser)
      setTenant(selectedTenant)
      
      return true
    } catch (error) {
      console.error('SSO login failed:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('urbint_user')
      localStorage.removeItem('urbint_tenant')
    }
    setUser(null)
    setTenant(null)
  }

  const value: AuthContextType = {
    user,
    tenant,
    isAuthenticated: !!user,
    isLoading,
    login,
    loginWithSSO,
    logout,
    setTenant
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 