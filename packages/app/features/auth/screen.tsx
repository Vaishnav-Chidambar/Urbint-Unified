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
  Separator,
  Card,
  Select
} from '@my/ui'
import { 
  Cloud,
  TrendingUp,
  Search,
  Plus,
  Map,
  FileText,
  BarChart3,
  Settings,
  ArrowLeft,
  LogOut,
  User,
  AlertTriangle,
  Clock,
  Users,
  ChevronDown,
  Filter,
  Download,
  Edit3,
  Bell,
  Phone,
  MoreHorizontal,
  Eye,
  EyeOff,
  Table,
  Shield,
  Building,
  Lock,
  ArrowRight,
  CheckCircle,
  ExternalLink
} from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Platform } from 'react-native'
import { useAuth } from './context'

// Urbint Logo Component (simplified for React Native)
const UrbintLogo = ({ size = 24, color = "$blue10" }: { size?: number; color?: string }) => (
  <View 
    width={size} 
    height={size} 
    borderRadius={size / 2}
    bg="$blue10"
    alignItems="center" 
    justifyContent="center"
  >
    <Text fontSize={size * 0.4} color="white" fontWeight="bold">U</Text>
  </View>
)

interface Tenant {
  id: string
  name: string
  domain: string
  ssoProvider: 'okta' | 'azure' | 'google' | 'custom'
}

const mockTenants: Tenant[] = [
  {
    id: 'urbint-corp',
    name: 'Urbint Corporation',
    domain: 'urbint.com',
    ssoProvider: 'okta'
  },
  {
    id: 'urbint-utilities',
    name: 'Urbint Utilities',
    domain: 'urbint-utilities.com',
    ssoProvider: 'azure'
  },
  {
    id: 'urbint-energy',
    name: 'Urbint Energy',
    domain: 'urbint-energy.com',
    ssoProvider: 'google'
  }
]

export function AuthScreen() {
  const { login, loginWithSSO } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState<Tenant>(mockTenants[0])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState<'login' | 'sso-redirect'>('login')

  const handleSSOLogin = async (provider: 'okta' | 'azure' | 'google') => {
    setIsLoading(true)
    
    try {
      const success = await loginWithSSO(selectedTenant)
      if (success) {
        setStep('sso-redirect')
        // Redirect to dashboard after successful SSO
        setTimeout(() => {
          // For React Native, we'll just close the auth screen
          // For web, this would redirect to dashboard
        }, 2000)
      }
    } catch (error) {
      console.error('SSO login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDirectLogin = async () => {
    if (!email || !password) return
    
    setIsLoading(true)
    
    try {
      const success = await login(email, password, selectedTenant)
      if (success) {
        // Redirect to dashboard after successful login
        // For React Native, we'll just close the auth screen
        // For web, this would redirect to dashboard
      }
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
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
            <UrbintLogo size={32} color="$blue10" />
          </View>
          
          <YStack gap="$3" alignItems="center">
            <H2 color="$color12" textAlign="center">
              Redirecting to SSO...
            </H2>
            <Paragraph color="$color10" textAlign="center">
              You're being redirected to {selectedTenant?.name} for authentication.
            </Paragraph>
          </YStack>
          
          <Card bg="$color2" p="$4" borderRadius="$3" width="100%">
            <YStack gap="$2">
              <Text fontSize="$3" fontWeight="600" color="$color12">
                {selectedTenant?.name}
              </Text>
              <Text fontSize="$2" color="$color10">
                {selectedTenant?.domain}
              </Text>
            </YStack>
          </Card>
        </YStack>
      </YStack>
    )
  }

  return (
    <YStack flex={1} bg="$background" minHeight="100vh">
      <YStack flex={1} pt="$6" pb="$4" px="$4" gap="$8" alignItems="center" justifyContent="center">
        <YStack gap="$8" alignItems="center" maxWidth={500} width="100%">
          
          {/* Title Section */}
          <YStack gap="$3" alignItems="center">
            <H1 color="$color12" textAlign="center" fontSize="$10" fontWeight="700">
              Welcome to Urbint Unified Platform
            </H1>
            <Paragraph color="$color10" textAlign="center" size="$4">
              Sign in to access your organization's tools
            </Paragraph>
          </YStack>

          {/* Login Form - Floating Card */}
          <Card 
            bg="$color1" 
            p="$6" 
            borderRadius="$4" 
            borderWidth={1}
            borderColor="$color6"
            shadowColor="$color8"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.1}
            shadowRadius={12}
            elevation={8}
            width="100%"
          >
            <YStack gap="$5" width="100%">
              {/* Email Field */}
              <YStack gap="$2">
                <Label htmlFor="email" fontSize="$3" color="$color11" fontWeight="500">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  size="$4"
                  bg="$color2"
                  borderColor="$color6"
                  borderRadius="$3"
                />
              </YStack>

              {/* Password Field */}
              <YStack gap="$2">
                <Label htmlFor="password" fontSize="$3" color="$color11" fontWeight="500">
                  Password
                </Label>
                <XStack gap="$2" alignItems="center">
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    flex={1}
                    size="$4"
                    bg="$color2"
                    borderColor="$color6"
                    borderRadius="$3"
                  />
                  <Button
                    size="$4"
                    circular
                    icon={showPassword ? EyeOff : Eye}
                    onPress={() => setShowPassword(!showPassword)}
                    chromeless
                    color="$color10"
                  />
                </XStack>
              </YStack>

              {/* Forgot Password Link */}
              <Text
                fontSize="$3"
                color="$blue10"
                textDecorationLine="underline"
                alignSelf="flex-start"
                pressStyle={{ opacity: 0.7 }}
              >
                Did you forget your password?
              </Text>

              {/* Login Button */}
              <Button
                size="$4"
                bg="$color12"
                color="$color1"
                fontWeight="600"
                onPress={handleDirectLogin}
                disabled={isLoading || !email || !password}
                borderRadius="$3"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </YStack>
          </Card>

          {/* SSO Options - Floating Card */}
          <Card 
            bg="$color1" 
            p="$6" 
            borderRadius="$4" 
            borderWidth={1}
            borderColor="$color6"
            shadowColor="$color8"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.1}
            shadowRadius={12}
            elevation={8}
            width="100%"
          >
            <YStack gap="$4" width="100%">
              <Text fontSize="$3" color="$color11" textAlign="center" fontWeight="500">
                Or sign in with your organization's SSO provider
              </Text>
              
              {/* Horizontal SSO Buttons */}
              <XStack gap="$3" justifyContent="center" flexWrap="wrap">
                <Button
                  size="$4"
                  bg="$blue10"
                  color="white"
                  icon={ExternalLink}
                  onPress={() => handleSSOLogin('okta')}
                  disabled={isLoading}
                  borderRadius="$3"
                  flex={1}
                  minWidth={120}
                >
                  {isLoading ? '...' : 'Okta'}
                </Button>
                
                <Button
                  size="$4"
                  bg="$blue10"
                  color="white"
                  icon={ExternalLink}
                  onPress={() => handleSSOLogin('azure')}
                  disabled={isLoading}
                  borderRadius="$3"
                  flex={1}
                  minWidth={120}
                >
                  {isLoading ? '...' : 'Microsoft'}
                </Button>
                
                <Button
                  size="$4"
                  bg="$blue10"
                  color="white"
                  icon={ExternalLink}
                  onPress={() => handleSSOLogin('google')}
                  disabled={isLoading}
                  borderRadius="$3"
                  flex={1}
                  minWidth={120}
                >
                  {isLoading ? '...' : 'Google'}
                </Button>
              </XStack>
            </YStack>
          </Card>

          {/* Footer */}
          <YStack gap="$2" alignItems="center">
            <Text fontSize="$2" color="$color8" textAlign="center">
              Secure authentication for your organization
            </Text>
            <Text fontSize="$1" color="$color8" textAlign="center">
              Need help? Contact your IT administrator
            </Text>
          </YStack>
        </YStack>
      </YStack>
    </YStack>
  )
} 