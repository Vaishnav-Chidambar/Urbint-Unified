import {
  Button,
  H1,
  H2,
  H3,
  Paragraph,
  XStack,
  YStack,
  Text,
  View,
  Input,
  Label,
  Separator
} from '@my/ui'
import { 
  Shield,
  Building,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle
} from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Platform } from 'react-native'
import { useAuth } from './context'

interface Tenant {
  id: string
  name: string
  domain: string
  logo?: string
  ssoProvider: 'okta' | 'azure' | 'google' | 'custom'
}

const mockTenants: Tenant[] = [
  {
    id: 'urbint-main',
    name: 'Urbint Corporation',
    domain: 'urbint.com',
    ssoProvider: 'okta'
  },
  {
    id: 'utility-east',
    name: 'Eastern Utility Co.',
    domain: 'eastutility.com',
    ssoProvider: 'azure'
  },
  {
    id: 'power-west',
    name: 'Western Power Grid',
    domain: 'westpower.com',
    ssoProvider: 'google'
  }
]

export function AuthScreen() {
  const { login, loginWithSSO } = useAuth()
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<'tenant-select' | 'login' | 'sso-redirect'>('tenant-select')

  const handleTenantSelect = (tenant: Tenant) => {
    setSelectedTenant(tenant)
    setStep('login')
  }

  const handleSSOLogin = async () => {
    if (!selectedTenant) return
    
    setIsLoading(true)
    
    try {
      const success = await loginWithSSO(selectedTenant)
      if (success) {
        setStep('sso-redirect')
        // Redirect to dashboard after successful SSO
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window.location.href = '/dashboard'
          }
        }, 2000)
      }
    } catch (error) {
      console.error('SSO login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDirectLogin = async () => {
    if (!email || !password || !selectedTenant) return
    
    setIsLoading(true)
    
    try {
      const success = await login(email, password, selectedTenant)
      if (success) {
        // Redirect to dashboard after successful login
        if (typeof window !== 'undefined') {
          window.location.href = '/dashboard'
        }
      }
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getSSOProviderName = (provider: string) => {
    switch (provider) {
      case 'okta': return 'Okta'
      case 'azure': return 'Microsoft Azure AD'
      case 'google': return 'Google Workspace'
      case 'custom': return 'Custom SSO'
      default: return 'SSO'
    }
  }

  const getSSOProviderColor = (provider: string) => {
    switch (provider) {
      case 'okta': return '$blue10'
      case 'azure': return '$blue10'
      case 'google': return '$red10'
      case 'custom': return '$green10'
      default: return '$color10'
    }
  }

  if (step === 'sso-redirect') {
    return (
      <YStack flex={1} bg="$background" justifyContent="center" alignItems="center" px="$4">
        <YStack gap="$6" alignItems="center" maxWidth={400}>
          <View 
            width="$8" 
            height="$8" 
            borderRadius="$4" 
            bg="$blue2" 
            alignItems="center" 
            justifyContent="center"
          >
            <Shield size={32} color="$blue10" />
          </View>
          
          <YStack gap="$3" alignItems="center">
            <H2 color="$color12" textAlign="center">
              Redirecting to SSO...
            </H2>
            <Paragraph color="$color10" textAlign="center">
              You're being redirected to {selectedTenant?.name}'s authentication provider.
            </Paragraph>
          </YStack>
          
          <View bg="$color2" p="$4" borderRadius="$3" width="100%">
            <YStack gap="$2">
              <Text fontSize="$3" fontWeight="600" color="$color12">
                {selectedTenant?.name}
              </Text>
              <Text fontSize="$2" color="$color10">
                {getSSOProviderName(selectedTenant?.ssoProvider || 'custom')}
              </Text>
            </YStack>
          </View>
        </YStack>
      </YStack>
    )
  }

  return (
    <YStack flex={1} bg="$background" minHeight="100vh">
      {/* Header */}
      <XStack
        position="absolute"
        width="100%"
        t="$6"
        gap="$6"
        justify="space-between"
        alignItems="center"
        px="$4"
        zIndex={100}
      >
        <View width="$4" height="$4" />
        
        <XStack gap="$4" alignItems="center">
          <H2 color="$color12" fontWeight="bold">Urbint Unified</H2>
          <View bg="$blue8" px="$2" py="$1" borderRadius="$2">
            <Text fontSize="$1" color="$blue12" fontWeight="600">Beta</Text>
          </View>
        </XStack>
        
        <View width="$4" height="$4" />
      </XStack>

      <YStack flex={1} pt="$20" pb="$4" px="$4" gap="$8" alignItems="center" justifyContent="center">
        <YStack gap="$6" alignItems="center" maxWidth={500} width="100%">
          {/* Logo and Title */}
          <YStack gap="$4" alignItems="center">
            <View 
              width="$10" 
              height="$10" 
              borderRadius="$5" 
              bg="$blue2" 
              alignItems="center" 
              justifyContent="center"
            >
              <Shield size={40} color="$blue10" />
            </View>
            
            <YStack gap="$2" alignItems="center">
              <H1 color="$color12" textAlign="center" fontSize="$10">
                Welcome to Urbint
              </H1>
              <Paragraph color="$color10" textAlign="center" size="$4">
                Sign in to access your organization's tools
              </Paragraph>
            </YStack>
          </YStack>

          {step === 'tenant-select' ? (
            /* Tenant Selection */
            <YStack gap="$4" width="100%">
              <H3 color="$color11" textAlign="center">Select Your Organization</H3>
              
              <YStack gap="$3">
                {mockTenants.map((tenant) => (
                  <View
                    key={tenant.id}
                    p="$4"
                    bg="$color2"
                    borderRadius="$3"
                    borderWidth={1}
                    borderColor="$color6"
                    pressStyle={{ scale: 0.98, bg: '$color3' }}
                    onPress={() => handleTenantSelect(tenant)}
                  >
                    <XStack gap="$3" alignItems="center">
                      <View 
                        width="$3" 
                        height="$3" 
                        borderRadius="$2" 
                        bg="$blue2" 
                        alignItems="center" 
                        justifyContent="center"
                      >
                        <Building size={16} color="$blue10" />
                      </View>
                      
                      <YStack flex={1} gap="$1">
                        <Text fontSize="$4" fontWeight="600" color="$color12">
                          {tenant.name}
                        </Text>
                        <Text fontSize="$2" color="$color10">
                          {tenant.domain}
                        </Text>
                      </YStack>
                      
                      <View 
                        bg="$color2" 
                        px="$2" 
                        py="$1" 
                        borderRadius="$2"
                      >
                        <Text fontSize="$1" color={getSSOProviderColor(tenant.ssoProvider)} fontWeight="600">
                          {getSSOProviderName(tenant.ssoProvider)}
                        </Text>
                      </View>
                    </XStack>
                  </View>
                ))}
              </YStack>
            </YStack>
          ) : (
            /* Login Form */
            <YStack gap="$4" width="100%">
              <YStack gap="$2" alignItems="center">
                <H3 color="$color11" textAlign="center">
                  Sign in to {selectedTenant?.name}
                </H3>
                <Text fontSize="$2" color="$color10" textAlign="center">
                  {getSSOProviderName(selectedTenant?.ssoProvider || 'custom')}
                </Text>
              </YStack>

              <Separator />

              {/* SSO Button */}
              <Button
                size="$4"
                bg="$blue10"
                color="white"
                icon={Shield}
                onPress={handleSSOLogin}
                disabled={isLoading}
              >
                {isLoading ? 'Redirecting...' : `Sign in with ${getSSOProviderName(selectedTenant?.ssoProvider || 'custom')}`}
              </Button>

              <XStack alignItems="center" gap="$3">
                <Separator flex={1} />
                <Text fontSize="$2" color="$color8">or</Text>
                <Separator flex={1} />
              </XStack>

              {/* Direct Login Form */}
              <YStack gap="$3">
                <YStack gap="$2">
                  <Label htmlFor="email" fontSize="$3" color="$color11">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                  />
                </YStack>

                <YStack gap="$2">
                  <Label htmlFor="password" fontSize="$3" color="$color11">
                    Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                </YStack>

                <Button
                  size="$4"
                  theme="blue"
                  icon={ArrowRight}
                  onPress={handleDirectLogin}
                  disabled={isLoading || !email || !password}
                  mt="$2"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </YStack>
            </YStack>
          )}

          {/* Back Button */}
          {step === 'login' && (
            <Button
              size="$3"
              chromeless
              onPress={() => setStep('tenant-select')}
            >
              ← Back to organization selection
            </Button>
          )}
        </YStack>
      </YStack>
    </YStack>
  )
} 