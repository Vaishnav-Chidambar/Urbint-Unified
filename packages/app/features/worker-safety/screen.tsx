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
  Separator,
  SwitchThemeButton,
  Logo
} from '@my/ui'
import { 
  Search,
  Plus,
  TrendingUp,
  Map,
  FileText,
  BarChart3,
  Settings,
  User,
  LogOut
} from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Platform } from 'react-native'
import { useLink } from 'solito/navigation'
import { useAuth } from '../auth/context'

interface WorkOrder {
  id: string
  project: string
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN'
  supervisor: string
  region: string
  workPackageType: string
  division: string
}

const mockWorkOrders: WorkOrder[] = [
  {
    id: '1',
    project: 'Electric Dist Work package',
    riskLevel: 'HIGH',
    supervisor: 'Supervisor User',
    region: 'Albany / Broadway - Overhead Lines NY',
    workPackageType: 'Distribution',
    division: 'Electric'
  },
  {
    id: '2',
    project: 'Alex Test 1',
    riskLevel: 'MEDIUM',
    supervisor: 'Akash Supervisor',
    region: 'Alexandria - Arlington',
    workPackageType: 'LNG/CNG',
    division: 'Gas'
  },
  {
    id: '3',
    project: 'Alex Test 2',
    riskLevel: 'MEDIUM',
    supervisor: 'Supervisor 7633d0c4-ba6b-4009-9c5c-6513fee98e73',
    region: 'DNY (Downstate New York)',
    workPackageType: 'Facilities',
    division: 'Zone 1 - Southern'
  },
  {
    id: '4',
    project: 'Automation dummy project API 88134',
    riskLevel: 'LOW',
    supervisor: 'Supervisor User',
    region: 'Batavia - Overhead Lines NY',
    workPackageType: 'Lining',
    division: 'Electric'
  },
  {
    id: '5',
    project: '123 Test SC',
    riskLevel: 'UNKNOWN',
    supervisor: 'Akash Supervisor',
    region: 'Avon - Overhead Lines NY',
    workPackageType: 'Distribution',
    division: 'Gas'
  },
  {
    id: '6',
    project: '135 Test WP',
    riskLevel: 'UNKNOWN',
    supervisor: 'Supervisor User',
    region: 'Watertown - Overhead Lines NY',
    workPackageType: 'LNG/CNG',
    division: 'Zone 1 - Southern'
  },
  {
    id: '7',
    project: '2468 AUTO',
    riskLevel: 'UNKNOWN',
    supervisor: 'Akash Supervisor',
    region: 'Albany / Broadway - Overhead Lines NY',
    workPackageType: 'Facilities',
    division: 'Electric'
  },
  {
    id: '8',
    project: '63049394',
    riskLevel: 'UNKNOWN',
    supervisor: 'Supervisor User',
    region: 'Alexandria - Arlington',
    workPackageType: 'Lining',
    division: 'Gas'
  }
]

export function WorkerSafetyScreen() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'completed'>('active')
  const [searchQuery, setSearchQuery] = useState('')
  const linkProps = useLink({ href: '/' })

  const handleLogout = () => {
    logout()
    // For React Native, we'll just close the screen
    // For web, this would redirect
  }



  const filteredWorkOrders = mockWorkOrders.filter(order =>
    order.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.supervisor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.region.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
        style={{
          paddingTop: '20px',
          paddingBottom: '20px',
        }}
      >
        {/* Left side - Logo and Title */}
        <XStack alignItems="center" gap="$3">
          <Logo size={32} color="#003F53" />
          <H2 color="$color12" fontWeight="800" fontSize="$7">
            Urbint
          </H2>
        </XStack>

        {/* Center - Navigation */}
        <XStack gap="$6" alignItems="center">
          <Text 
            color="$color12" 
            fontSize="$3" 
            fontWeight="600"
            hoverStyle={{ color: '#003F53' }}
          >
            Solutions
          </Text>
          <Text 
            color="$color12" 
            fontSize="$3" 
            fontWeight="600"
            hoverStyle={{ color: '#003F53' }}
          >
            Platform
          </Text>
          <Text 
            color="$color12" 
            fontSize="$3" 
            fontWeight="600"
            hoverStyle={{ color: '#003F53' }}
          >
            Industries
          </Text>
          <Text 
            color="$color12" 
            fontSize="$3" 
            fontWeight="600"
            hoverStyle={{ color: '#003F53' }}
          >
            Resources
          </Text>
          <Text 
            color="$color12" 
            fontSize="$3" 
            fontWeight="600"
            hoverStyle={{ color: '#003F53' }}
          >
            About
          </Text>
        </XStack>

        {/* Right side - Actions */}
        <XStack gap="$4" alignItems="center">
          <Button 
            size="$3" 
            fontWeight="600"
            borderRadius="$4"
            bg="#003F53"
          >
            GET IN TOUCH
          </Button>
          
          {/* Theme Toggle */}
          <SwitchThemeButton />
          
          {/* User Info */}
          <XStack gap="$2" alignItems="center">
            <View width="$3" height="$3" borderRadius="$2" bg="$blue8" alignItems="center" justifyContent="center">
              <User size={12} color="$blue10" />
            </View>
            <Text fontSize="$2" color="$color10">
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

      <YStack flex={1} pt="$20" pb="$4" px="$6" gap="$8" style={{ paddingTop: '140px' }}>
        {/* Page Header */}
        <XStack justifyContent="space-between" alignItems="center">
          <H1 color="$color12" fontSize="$10" fontWeight="800">
            WORKER SAFETY
          </H1>
          <View width="$4" height="$4" borderRadius="$2" bg="$color8" alignItems="center" justifyContent="center">
            <Text fontSize="$1" color="$color10" fontWeight="600">NA</Text>
          </View>
        </XStack>

        {/* Navigation Tabs */}
        <XStack gap="$6" borderBottomWidth={1} borderBottomColor="$color6">
          <Text 
            color="$color12" 
            fontSize="$4" 
            fontWeight="600"
            pb="$2"
            borderBottomWidth={2}
            borderBottomColor="$color12"
          >
            Work Orders
          </Text>
          <Text 
            color="$color10" 
            fontSize="$4" 
            fontWeight="500"
            pb="$2"
            hoverStyle={{ color: '$color12' }}
          >
            Map
          </Text>
          <Text 
            color="$color10" 
            fontSize="$4" 
            fontWeight="500"
            pb="$2"
            hoverStyle={{ color: '$color12' }}
          >
            V1 Forms
          </Text>
          <Text 
            color="$color10" 
            fontSize="$4" 
            fontWeight="500"
            pb="$2"
            hoverStyle={{ color: '$color12' }}
          >
            CWF Forms
          </Text>
          <Text 
            color="$color10" 
            fontSize="$4" 
            fontWeight="500"
            pb="$2"
            hoverStyle={{ color: '$color12' }}
          >
            Insights
          </Text>
          <Text 
            color="$color10" 
            fontSize="$4" 
            fontWeight="500"
            pb="$2"
            hoverStyle={{ color: '$color12' }}
          >
            Templates
          </Text>
          <Text 
            color="$color10" 
            fontSize="$4" 
            fontWeight="500"
            pb="$2"
            hoverStyle={{ color: '$color12' }}
          >
            Admin
          </Text>
        </XStack>

        {/* Search and Add Section */}
        <XStack justifyContent="space-between" alignItems="center">
          <H2 color="$color12" fontSize="$8" fontWeight="700">
            Work Orders
          </H2>
          <XStack gap="$4" alignItems="center">
            <XStack alignItems="center" gap="$2" bg="$color2" px="$4" py="$2" borderRadius="$4" borderWidth={1} borderColor="$color6">
              <Search size={16} color="$color10" />
              <Input
                placeholder="Search work orders"
                value={searchQuery}
                onChangeText={setSearchQuery}
                borderWidth={0}
                bg="transparent"
                fontSize="$3"
                color="$color12"
                flex={1}
                minWidth={200}
              />
            </XStack>
            <Button 
              size="$4" 
              fontWeight="600"
              borderRadius="$4"
              bg="#003F53"
              icon={Plus}
            >
              Add Work Orders
            </Button>
          </XStack>
        </XStack>

        {/* Status Tabs */}
        <XStack gap="$6" borderBottomWidth={1} borderBottomColor="$color6">
          <Text 
            color="$color12" 
            fontSize="$4" 
            fontWeight="600"
            pb="$2"
            borderBottomWidth={2}
            borderBottomColor="$color12"
          >
            Active
          </Text>
          <Text 
            color="$color10" 
            fontSize="$4" 
            fontWeight="500"
            pb="$2"
            hoverStyle={{ color: '$color12' }}
          >
            Pending
          </Text>
          <Text 
            color="$color10" 
            fontSize="$4" 
            fontWeight="500"
            pb="$2"
            hoverStyle={{ color: '$color12' }}
          >
            Completed
          </Text>
        </XStack>

        {/* Work Orders Table */}
        <YStack gap="$2">
          {/* Table Header */}
          <XStack 
            bg="$color2" 
            p="$4" 
            borderRadius="$4" 
            borderWidth={1} 
            borderColor="$color6"
            gap="$4"
          >
            <Text fontSize="$3" fontWeight="700" color="$color12" flex={2}>PROJECT</Text>
            <Text fontSize="$3" fontWeight="700" color="$color12" flex={1}>TODAYS RISK</Text>
            <Text fontSize="$3" fontWeight="700" color="$color12" flex={1.5}>SUPERVISOR</Text>
            <Text fontSize="$3" fontWeight="700" color="$color12" flex={2}>REGION</Text>
            <Text fontSize="$3" fontWeight="700" color="$color12" flex={1}>WORK PACKAGE TYPE</Text>
            <Text fontSize="$3" fontWeight="700" color="$color12" flex={1}>DIVISION</Text>
          </XStack>

          {/* Table Rows */}
          {filteredWorkOrders.map((order, index) => {
            return (
              <XStack 
                key={order.id}
                bg="$color1" 
                p="$4" 
                borderRadius="$4" 
                borderWidth={1} 
                borderColor="$color5"
                gap="$4"
                hoverStyle={{ bg: '$color2' }}
              >
                <Text fontSize="$3" color="$color12" fontWeight="600" flex={2}>
                  {order.project}
                </Text>
                <View flex={1}>
                  {order.riskLevel === 'HIGH' && (
                    <View 
                      bg="$red2" 
                      px="$2" 
                      py="$1" 
                      borderRadius="$2"
                      borderWidth={1}
                      borderColor="$red10"
                      alignSelf="flex-start"
                    >
                      <Text fontSize="$2" color="$red10" fontWeight="600">
                        ↗ {order.riskLevel}
                      </Text>
                    </View>
                  )}
                  {order.riskLevel === 'MEDIUM' && (
                    <View 
                      bg="$yellow2" 
                      px="$2" 
                      py="$1" 
                      borderRadius="$2"
                      borderWidth={1}
                      borderColor="$yellow10"
                      alignSelf="flex-start"
                    >
                      <Text fontSize="$2" color="$yellow10" fontWeight="600">
                        ~ {order.riskLevel}
                      </Text>
                    </View>
                  )}
                  {order.riskLevel === 'LOW' && (
                    <View 
                      bg="$green2" 
                      px="$2" 
                      py="$1" 
                      borderRadius="$2"
                      borderWidth={1}
                      borderColor="$green10"
                      alignSelf="flex-start"
                    >
                      <Text fontSize="$2" color="$green10" fontWeight="600">
                        ✓ {order.riskLevel}
                      </Text>
                    </View>
                  )}
                  {order.riskLevel === 'UNKNOWN' && (
                    <View 
                      bg="$color2" 
                      px="$2" 
                      py="$1" 
                      borderRadius="$2"
                      borderWidth={1}
                      borderColor="$color10"
                      alignSelf="flex-start"
                    >
                      <Text fontSize="$2" color="$color10" fontWeight="600">
                        ? {order.riskLevel}
                      </Text>
                    </View>
                  )}
                </View>
                <Text fontSize="$3" color="$color10" flex={1.5}>
                  {order.supervisor}
                </Text>
                <Text fontSize="$3" color="$color10" flex={2}>
                  {order.region}
                </Text>
                <Text fontSize="$3" color="$color10" flex={1}>
                  {order.workPackageType}
                </Text>
                <Text fontSize="$3" color="$color10" flex={1}>
                  {order.division}
                </Text>
              </XStack>
            )
          })}
        </YStack>

        {/* Back to Dashboard Button */}
        <XStack justifyContent="center" pt="$6">
          <Button 
            size="$4" 
            fontWeight="600"
            borderRadius="$4"
            bg="$color8"
            color="$color12"
            {...linkProps}
          >
            ← Back to Dashboard
          </Button>
        </XStack>
      </YStack>
    </YStack>
  )
} 