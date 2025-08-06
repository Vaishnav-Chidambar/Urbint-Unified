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
  SwitchThemeButton,
  Logo,
  Card
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
  Zap
} from '@tamagui/lucide-icons'
import { Platform, ScrollView } from 'react-native'
import { useLink } from 'solito/navigation'
import { useAuth } from '../auth/context'

export function StormImpactScreen() {
  const { user, logout } = useAuth()
  const linkProps = useLink({ href: '/' })

  const handleLogout = () => {
    logout()
  }

  return (
    <YStack flex={1} bg="$color1">
      {/* Header */}
      <XStack
        width="100%"
        gap="$4"
        justify="space-between"
        alignItems="center"
        px="$4"
        py="$3"
        bg="$color1"
        borderBottomWidth={1}
        borderBottomColor="$color6"
        zIndex={100}
      >
        {/* Left side - Logo */}
        <Logo size={28} color="#003F53" />
        
        {/* Center - Title */}
        <XStack gap="$3" alignItems="center">
          <H1 color="$color12" fontSize="$6" fontWeight="800">
            STORM IMPACT
          </H1>
        </XStack>
        
        {/* Right side - Actions */}
        <XStack gap="$3" alignItems="center">
          <SwitchThemeButton />
          
          {/* User Info */}
          <XStack gap="$2" alignItems="center">
            <View width="$3" height="$3" borderRadius="$2" bg="$blue8" alignItems="center" justifyContent="center">
              <User size={12} color="$blue10" />
            </View>
            <Text fontSize="$3" color="$color10" fontWeight="500">
              {user?.name || 'User'}
            </Text>
          </XStack>
          
          {/* Logout Button */}
          <Button 
            size="$3" 
            circular 
            icon={LogOut} 
            onPress={handleLogout}
            chromeless
          />
        </XStack>
      </XStack>

      <ScrollView 
        style={{ flex: 1 }} 
        showsVerticalScrollIndicator={false}
      >
        <YStack pb="$4" px="$4" gap="$6">
          {/* Page Title */}
          <YStack gap="$3">
            <XStack alignItems="center" gap="$3">
              <Button 
                size="$3" 
                circular 
                icon={ArrowLeft} 
                onPress={() => linkProps.onPress?.()}
                chromeless
              />
              <H1 color="$color12" fontSize="$8" fontWeight="800">
                Storm Impact Assessment
              </H1>
            </XStack>
          </YStack>

          {/* Content */}
          <Card bg="$color2" borderColor="$color6" borderWidth={1} p="$4">
            <YStack gap="$4">
              <H3 color="$color12" fontSize="$6" fontWeight="600">
                Weather Forecast Analysis
              </H3>
              <Paragraph color="$color10" size="$4">
                Assess potential grid impacts from weather forecasts and historical storm data.
              </Paragraph>
              
              <XStack gap="$4" alignItems="center" flexWrap="wrap">
                <XStack gap="$2" flex={1} minWidth={250}>
                  <Search size={16} color="$color10" />
                  <Input
                    placeholder="Search locations..."
                    flex={1}
                    size="$3"
                    borderRadius="$3"
                  />
                </XStack>
                <Button
                  size="$3"
                  theme="blue"
                  borderRadius="$3"
                >
                  Analyze Impact
                </Button>
              </XStack>

              {/* Placeholder content */}
              <YStack gap="$4" alignItems="center" py="$8">
                <Zap size={48} color="$color8" />
                <Text fontSize="$4" color="$color10" textAlign="center">
                  Storm Impact Assessment Dashboard
                </Text>
                <Text fontSize="$3" color="$color8" textAlign="center">
                  Weather data and impact analysis will be displayed here
                </Text>
              </YStack>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
    </YStack>
  )
} 