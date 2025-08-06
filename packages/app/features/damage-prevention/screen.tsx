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
  Select,
  ScrollView
} from '@my/ui'
import { 
  Search,
  Bell,
  Map,
  FileText,
  AlertTriangle,
  Clock,
  ChevronDown,
  Filter,
  MoreHorizontal,
  Eye,
  EyeOff,
  Table,
  Shield,
  Building,
  Lock,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  User,
  Settings,
  ToggleLeft,
  ToggleRight,
  MapPin,
  ZoomIn,
  ZoomOut,
  Layers,
  Ruler,
  Pin
} from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Platform, Dimensions } from 'react-native'

// Urbint Logo Component
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

// Simple Map Component for showcase
const SimpleMap = () => {
  const { width, height } = Dimensions.get('window')
  
  return (
    <View 
      width="100%" 
      height="100%" 
      bg="$blue2"
      borderRadius="$4"
      overflow="hidden"
      position="relative"
    >
      {/* Ocean Background with Gradient */}
      <View 
        position="absolute" 
        top={0} 
        left={0} 
        right={0} 
        bottom={0}
        bg="$blue1"
        style={{
          backgroundImage: Platform.OS === 'web' ? 
            'linear-gradient(135deg, #e6f3ff 0%, #f0f8ff 50%, #e6f3ff 100%)' : 
            undefined
        }}
      />
      
      {/* North America - More Realistic Shape */}
      <View 
        position="absolute"
        top="12%"
        left="8%"
        width="40%"
        height="65%"
        bg="$green2"
        borderRadius="$4"
        borderWidth={2}
        borderColor="$green8"
        style={{
          clipPath: Platform.OS === 'web' ? 
            'polygon(0% 0%, 100% 0%, 95% 20%, 90% 40%, 85% 60%, 80% 80%, 75% 90%, 70% 95%, 60% 100%, 40% 95%, 20% 90%, 10% 80%, 5% 60%, 0% 40%, 0% 20%)' :
            undefined
        }}
      />
      
      {/* United States - Detailed Outline */}
      <View 
        position="absolute"
        top="18%"
        left="12%"
        width="32%"
        height="52%"
        bg="$green3"
        borderRadius="$3"
        borderWidth={1}
        borderColor="$green9"
        style={{
          clipPath: Platform.OS === 'web' ? 
            'polygon(0% 0%, 100% 0%, 95% 15%, 90% 30%, 85% 45%, 80% 60%, 75% 75%, 70% 85%, 65% 90%, 55% 95%, 45% 90%, 35% 85%, 25% 80%, 15% 75%, 10% 60%, 5% 45%, 0% 30%, 0% 15%)' :
            undefined
        }}
      />
      
      {/* Canada - Northern Region */}
      <View 
        position="absolute"
        top="12%"
        left="12%"
        width="32%"
        height="28%"
        bg="$green4"
        borderRadius="$2"
        borderWidth={1}
        borderColor="$green10"
        style={{
          clipPath: Platform.OS === 'web' ? 
            'polygon(0% 0%, 100% 0%, 95% 25%, 90% 50%, 85% 75%, 80% 100%, 60% 95%, 40% 90%, 20% 85%, 10% 80%, 5% 60%, 0% 40%, 0% 20%)' :
            undefined
        }}
      />
      
      {/* Mexico - Southern Region */}
      <View 
        position="absolute"
        top="62%"
        left="18%"
        width="28%"
        height="18%"
        bg="$green3"
        borderRadius="$2"
        borderWidth={1}
        borderColor="$green9"
        style={{
          clipPath: Platform.OS === 'web' ? 
            'polygon(0% 0%, 100% 0%, 95% 30%, 90% 60%, 85% 100%, 60% 95%, 40% 90%, 20% 85%, 10% 80%, 5% 60%, 0% 40%, 0% 20%)' :
            undefined
        }}
      />
      
      {/* Europe - More Realistic Shape */}
      <View 
        position="absolute"
        top="22%"
        left="58%"
        width="28%"
        height="45%"
        bg="$green2"
        borderRadius="$4"
        borderWidth={2}
        borderColor="$green8"
        style={{
          clipPath: Platform.OS === 'web' ? 
            'polygon(0% 0%, 100% 0%, 95% 20%, 90% 40%, 85% 60%, 80% 80%, 75% 90%, 70% 95%, 60% 100%, 40% 95%, 20% 90%, 10% 80%, 5% 60%, 0% 40%, 0% 20%)' :
            undefined
        }}
      />
      
      {/* UK - Island Nation */}
      <View 
        position="absolute"
        top="28%"
        left="52%"
        width="10%"
        height="15%"
        bg="$green3"
        borderRadius="$2"
        borderWidth={1}
        borderColor="$green9"
        style={{
          clipPath: Platform.OS === 'web' ? 
            'polygon(0% 0%, 100% 0%, 95% 25%, 90% 50%, 85% 75%, 80% 100%, 60% 95%, 40% 90%, 20% 85%, 10% 80%, 5% 60%, 0% 40%, 0% 20%)' :
            undefined
        }}
      />
      
      {/* France */}
      <View 
        position="absolute"
        top="32%"
        left="62%"
        width="15%"
        height="18%"
        bg="$green3"
        borderRadius="$2"
        borderWidth={1}
        borderColor="$green9"
        style={{
          clipPath: Platform.OS === 'web' ? 
            'polygon(0% 0%, 100% 0%, 95% 25%, 90% 50%, 85% 75%, 80% 100%, 60% 95%, 40% 90%, 20% 85%, 10% 80%, 5% 60%, 0% 40%, 0% 20%)' :
            undefined
        }}
      />
      
      {/* Spain */}
      <View 
        position="absolute"
        top="42%"
        left="58%"
        width="18%"
        height="15%"
        bg="$green3"
        borderRadius="$2"
        borderWidth={1}
        borderColor="$green9"
        style={{
          clipPath: Platform.OS === 'web' ? 
            'polygon(0% 0%, 100% 0%, 95% 25%, 90% 50%, 85% 75%, 80% 100%, 60% 95%, 40% 90%, 20% 85%, 10% 80%, 5% 60%, 0% 40%, 0% 20%)' :
            undefined
        }}
      />
      
      {/* Central America - Land Bridge */}
      <View 
        position="absolute"
        top="72%"
        left="22%"
        width="18%"
        height="22%"
        bg="$green2"
        borderRadius="$3"
        borderWidth={1}
        borderColor="$green8"
        style={{
          clipPath: Platform.OS === 'web' ? 
            'polygon(0% 0%, 100% 0%, 95% 20%, 90% 40%, 85% 60%, 80% 80%, 75% 90%, 70% 95%, 60% 100%, 40% 95%, 20% 90%, 10% 80%, 5% 60%, 0% 40%, 0% 20%)' :
            undefined
        }}
      />
      
      {/* South America */}
      <View 
        position="absolute"
        top="82%"
        left="28%"
        width="22%"
        height="28%"
        bg="$green2"
        borderRadius="$4"
        borderWidth={2}
        borderColor="$green8"
        style={{
          clipPath: Platform.OS === 'web' ? 
            'polygon(0% 0%, 100% 0%, 95% 20%, 90% 40%, 85% 60%, 80% 80%, 75% 90%, 70% 95%, 60% 100%, 40% 95%, 20% 90%, 10% 80%, 5% 60%, 0% 40%, 0% 20%)' :
            undefined
        }}
      />
      
      {/* Brazil */}
      <View 
        position="absolute"
        top="88%"
        left="32%"
        width="18%"
        height="22%"
        bg="$green3"
        borderRadius="$3"
        borderWidth={1}
        borderColor="$green9"
        style={{
          clipPath: Platform.OS === 'web' ? 
            'polygon(0% 0%, 100% 0%, 95% 25%, 90% 50%, 85% 75%, 80% 100%, 60% 95%, 40% 90%, 20% 85%, 10% 80%, 5% 60%, 0% 40%, 0% 20%)' :
            undefined
        }}
      />
      
      {/* Major Rivers - More Realistic */}
      <View 
        position="absolute"
        top="28%"
        left="22%"
        width="1.5%"
        height="28%"
        bg="$blue8"
        borderRadius={1}
        style={{
          transform: [{ rotate: '5deg' }]
        }}
      />
      <View 
        position="absolute"
        top="38%"
        left="26%"
        width="1.5%"
        height="22%"
        bg="$blue8"
        borderRadius={1}
        style={{
          transform: [{ rotate: '-3deg' }]
        }}
      />
      <View 
        position="absolute"
        top="32%"
        left="30%"
        width="1%"
        height="18%"
        bg="$blue8"
        borderRadius={1}
        style={{
          transform: [{ rotate: '8deg' }]
        }}
      />
      
      {/* Great Lakes - More Realistic */}
      <View 
        position="absolute"
        top="22%"
        left="20%"
        width="10%"
        height="10%"
        bg="$blue7"
        borderRadius="$3"
        style={{
          clipPath: Platform.OS === 'web' ? 
            'polygon(0% 20%, 20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%)' :
            undefined
        }}
      />
      <View 
        position="absolute"
        top="26%"
        left="24%"
        width="8%"
        height="8%"
        bg="$blue7"
        borderRadius="$2"
        style={{
          clipPath: Platform.OS === 'web' ? 
            'polygon(0% 20%, 20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%)' :
            undefined
        }}
      />
      <View 
        position="absolute"
        top="30%"
        left="28%"
        width="6%"
        height="6%"
        bg="$blue7"
        borderRadius="$2"
        style={{
          clipPath: Platform.OS === 'web' ? 
            'polygon(0% 20%, 20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%)' :
            undefined
        }}
      />
      
      {/* Mountain Ranges - Terrain Features */}
      <View 
        position="absolute"
        top="35%"
        left="18%"
        width="25%"
        height="2%"
        bg="$gray4"
        borderRadius={1}
        style={{
          transform: [{ rotate: '15deg' }]
        }}
      />
      <View 
        position="absolute"
        top="38%"
        left="20%"
        width="20%"
        height="1.5%"
        bg="$gray4"
        borderRadius={1}
        style={{
          transform: [{ rotate: '-10deg' }]
        }}
      />
      
      {/* Geographic Labels */}
      <View position="absolute" top="20%" left="20%">
        <Text fontSize="$2" color="$blue10" fontWeight="500">Chicago</Text>
      </View>
      <View position="absolute" top="16%" left="22%">
        <Text fontSize="$2" color="$blue10" fontWeight="500">Toronto</Text>
      </View>
      <View position="absolute" top="26%" left="27%">
        <Text fontSize="$2" color="$blue10" fontWeight="500">New York</Text>
      </View>
      <View position="absolute" top="28%" left="24%">
        <Text fontSize="$2" color="$blue10" fontWeight="500">Boston</Text>
      </View>
      <View position="absolute" top="43%" left="20%">
        <Text fontSize="$2" color="$blue10" fontWeight="500">Houston</Text>
      </View>
      <View position="absolute" top="68%" left="20%">
        <Text fontSize="$2" color="$blue10" fontWeight="500">Mexico City</Text>
      </View>
      <View position="absolute" top="30%" left="54%">
        <Text fontSize="$2" color="$blue10" fontWeight="500">London</Text>
      </View>
      <View position="absolute" top="36%" left="64%">
        <Text fontSize="$2" color="$blue10" fontWeight="500">Paris</Text>
      </View>
      <View position="absolute" top="46%" left="62%">
        <Text fontSize="$2" color="$blue10" fontWeight="500">Madrid</Text>
      </View>
      <View position="absolute" top="78%" left="24%">
        <Text fontSize="$2" color="$blue10" fontWeight="500">Guatemala</Text>
      </View>
      <View position="absolute" top="88%" left="30%">
        <Text fontSize="$2" color="$blue10" fontWeight="500">Brazil</Text>
      </View>
      
      {/* Ocean Labels */}
      <View position="absolute" top="42%" left="48%">
        <Text fontSize="$1" color="$blue8" fontWeight="400" textAlign="center">
          North Atlantic{'\n'}Ocean
        </Text>
      </View>
      <View position="absolute" top="58%" left="42%">
        <Text fontSize="$1" color="$blue8" fontWeight="400" textAlign="center">
          Caribbean{'\n'}Sea
        </Text>
      </View>
      
      {/* Data Aggregation Circles */}
      <View 
        position="absolute" 
        top="33%" 
        left="27%"
        width={80}
        height={80}
        borderRadius={40}
        bg="$green10"
        alignItems="center"
        justifyContent="center"
        borderWidth={3}
        borderColor="$green8"
        shadowColor="$color8"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.3}
        shadowRadius={4}
      >
        <Text fontSize="$3" fontWeight="600" color="white">847,889</Text>
        <Text fontSize="$1" color="white" fontWeight="400">Mid-USA</Text>
      </View>
      
      <View 
        position="absolute" 
        top="26%" 
        left="32%"
        width={60}
        height={60}
        borderRadius={30}
        bg="$yellow10"
        alignItems="center"
        justifyContent="center"
        borderWidth={3}
        borderColor="$yellow8"
        shadowColor="$color8"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.3}
        shadowRadius={4}
      >
        <Text fontSize="$2" fontWeight="600" color="white">280,524</Text>
        <Text fontSize="$1" color="white" fontWeight="400">Northeast</Text>
      </View>
      
      {/* Map Controls */}
      <View position="absolute" top="$3" right="$3">
        <YStack gap="$2">
          <Button
            size="$3"
            circular
            bg="$color1"
            borderWidth={1}
            borderColor="$color6"
            icon={ZoomIn}
            chromeless
            color="$color10"
          />
          <Button
            size="$3"
            circular
            bg="$color1"
            borderWidth={1}
            borderColor="$color6"
            icon={ZoomOut}
            chromeless
            color="$color10"
          />
          <Button
            size="$3"
            circular
            bg="$color1"
            borderWidth={1}
            borderColor="$color6"
            icon={Layers}
            chromeless
            color="$color10"
          />
          <Button
            size="$3"
            circular
            bg="$color1"
            borderWidth={1}
            borderColor="$color6"
            icon={Ruler}
            chromeless
            color="$color10"
          />
          <Button
            size="$3"
            circular
            bg="$color1"
            borderWidth={1}
            borderColor="$color6"
            icon={Pin}
            chromeless
            color="$color10"
          />
        </YStack>
      </View>
      
      {/* Map Attribution */}
      <View position="absolute" bottom="$2" right="$2">
        <Text fontSize="$1" color="$color8">Mapbox © OpenStreetMap</Text>
      </View>
    </View>
  )
}

interface Ticket {
  id: string
  risk: string
  status: string
  address: string
  state: string
  description: string
  priority: 'high' | 'medium' | 'low'
}

const mockTickets: Ticket[] = [
  {
    id: 'A325800239',
    risk: 'UNKNOWN RISK',
    status: 'NEW EMERGENCY',
    address: '8523 Jenner Ct',
    state: 'VA',
    description: 'Ground Rod - Install by Vp Services',
    priority: 'high'
  },
  {
    id: 'A325800309',
    risk: 'UNKNOWN RISK',
    status: 'NEW EMERGENCY',
    address: '1635 Montmorency Dr',
    state: 'VA',
    description: 'Sewer Line - Repair by Cardinal Multi Services Llc',
    priority: 'high'
  },
  {
    id: 'B325800477',
    risk: 'UNKNOWN RISK',
    status: 'NEW EMERGENCY',
    address: '5515 Brixton Rd',
    state: 'VA',
    description: 'Sewer Main - Repair Or Replace by Ziegler Plumbing And Sewer Inc',
    priority: 'medium'
  },
  {
    id: 'B325800483',
    risk: 'UNKNOWN RISK',
    status: 'NEW EMERGENCY',
    address: '5135 Pumphrey Dr',
    state: 'VA',
    description: 'Sewer Main - Repair Or Replace by Spiniello Company',
    priority: 'medium'
  },
  {
    id: 'B325800581',
    risk: 'UNKNOWN RISK',
    status: 'NEW EMERGENCY',
    address: '9105 Mill Creek Lndg',
    state: 'VA',
    description: 'Electric Primary - Repair Or Replace by Dominion Virginia Power',
    priority: 'low'
  }
]

export function DamagePreventionScreen() {
  const [selectedTab, setSelectedTab] = useState<'tickets' | 'events'>('tickets')
  const [showTasks, setShowTasks] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '$red10'
      case 'medium': return '$yellow10'
      case 'low': return '$green10'
      default: return '$gray10'
    }
  }

  return (
    <YStack flex={1} bg="$background">
      {/* Header */}
      <XStack
        bg="$color1"
        p="$4"
        borderBottomWidth={1}
        borderBottomColor="$color6"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Left: Logo and Brand */}
        <XStack gap="$3" alignItems="center">
          <UrbintLogo size={32} color="$blue10" />
          <YStack>
            <Text fontSize="$4" fontWeight="bold" color="$color12">Urbint Lens</Text>
            <Text fontSize="$2" color="$color10">Duder Mifflin</Text>
          </YStack>
        </XStack>

        {/* Center: Navigation Tabs */}
        <XStack gap="$6" alignItems="center">
          <Button
            size="$3"
            chromeless
            color={selectedTab === 'tickets' ? '$blue10' : '$color10'}
            fontWeight={selectedTab === 'tickets' ? '600' : '400'}
            onPress={() => setSelectedTab('tickets')}
            borderBottomWidth={selectedTab === 'tickets' ? 2 : 0}
            borderBottomColor="$blue10"
            borderRadius={0}
          >
            Tickets
          </Button>
          <Button
            size="$3"
            chromeless
            color={selectedTab === 'events' ? '$blue10' : '$color10'}
            fontWeight={selectedTab === 'events' ? '600' : '400'}
            onPress={() => setSelectedTab('events')}
            borderBottomWidth={selectedTab === 'events' ? 2 : 0}
            borderBottomColor="$blue10"
            borderRadius={0}
          >
            Events
          </Button>
        </XStack>

        {/* Right: Controls */}
        <XStack gap="$3" alignItems="center">
          <Button
            size="$3"
            circular
            bg="$blue10"
            color="white"
            icon={Search}
            chromeless
          />
          <Button
            size="$3"
            circular
            icon={Bell}
            chromeless
            color="$color10"
          />
          <View
            width="$6"
            height="$6"
            borderRadius="$3"
            bg="$green10"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="$2" color="white" fontWeight="600">GR</Text>
          </View>
        </XStack>
      </XStack>

      {/* Controls Bar */}
      <XStack
        bg="$color1"
        p="$3"
        borderBottomWidth={1}
        borderBottomColor="$color6"
        alignItems="center"
        justifyContent="space-between"
      >
        <XStack gap="$3" alignItems="center">
          <XStack gap="$2" alignItems="center">
            <Text fontSize="$2" color="$color10">Show tasks</Text>
            <Button
              size="$2"
              circular
              bg={showTasks ? '$blue10' : '$color6'}
              onPress={() => setShowTasks(!showTasks)}
              icon={showTasks ? ToggleRight : ToggleLeft}
              chromeless
            />
          </XStack>
          <Select>
            <Select.Trigger size="$3" bg="$color2" borderColor="$color6">
              <Select.Value placeholder="Select..." />
              <ChevronDown size={14} />
            </Select.Trigger>
            <Select.Content>
              <Select.Item index={0} value="all">All Tickets</Select.Item>
              <Select.Item index={1} value="high">High Priority</Select.Item>
              <Select.Item index={2} value="medium">Medium Priority</Select.Item>
              <Select.Item index={3} value="low">Low Priority</Select.Item>
            </Select.Content>
          </Select>
        </XStack>
      </XStack>

      {/* Main Content */}
      <XStack flex={1}>
        {/* Left Panel: Tickets List */}
        <YStack flex={1} bg="$color1" borderRightWidth={1} borderRightColor="$color6">
          {/* Tickets Header */}
          <XStack
            p="$4"
            borderBottomWidth={1}
            borderBottomColor="$color6"
            alignItems="center"
            justifyContent="space-between"
          >
            <XStack gap="$2" alignItems="center">
              <Text fontSize="$4" fontWeight="600" color="$color12">All Live Tickets</Text>
              <ChevronDown size={16} color="$color8" />
            </XStack>
            <XStack gap="$2" alignItems="center">
              <Text fontSize="$3" color="$color10">1,171,202 tickets</Text>
              <Button
                size="$3"
                circular
                icon={Search}
                chromeless
                color="$color10"
              />
            </XStack>
          </XStack>

          {/* Tickets List */}
          <ScrollView flex={1}>
            <YStack p="$2">
              {mockTickets.map((ticket, index) => (
                <Card
                  key={ticket.id}
                  bg="$color2"
                  p="$3"
                  m="$1"
                  borderRadius="$2"
                  borderLeftWidth={3}
                  borderLeftColor={getPriorityColor(ticket.priority)}
                >
                  <YStack gap="$2">
                    <XStack alignItems="center" justifyContent="space-between">
                      <Text fontSize="$2" color="$color10" fontWeight="500">
                        {ticket.risk} #{ticket.id}
                      </Text>
                      <Button
                        size="$2"
                        circular
                        icon={MoreHorizontal}
                        chromeless
                        color="$color8"
                      />
                    </XStack>
                    
                    <Text fontSize="$3" fontWeight="600" color="$color12">
                      {ticket.status}
                    </Text>
                    
                    <Text fontSize="$2" color="$color11">
                      {ticket.address}, {ticket.state}
                    </Text>
                    
                    <Text fontSize="$2" color="$color10">
                      {ticket.description}
                    </Text>
                  </YStack>
                </Card>
              ))}
            </YStack>
          </ScrollView>
        </YStack>

        {/* Right Panel: Map */}
        <YStack flex={1} bg="$color1">
          {/* Map Header */}
          <XStack
            p="$4"
            borderBottomWidth={1}
            borderBottomColor="$color6"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="$4" fontWeight="600" color="$color12">Geographic View</Text>
            <XStack gap="$2">
              <Button
                size="$3"
                circular
                icon={Map}
                chromeless
                color="$color10"
              />
              <Button
                size="$3"
                circular
                icon={Table}
                chromeless
                color="$color10"
              />
            </XStack>
          </XStack>

          {/* Map Content */}
          <View flex={1} p="$4">
            <SimpleMap />
          </View>

          {/* Legend Panel */}
          <View 
            position="absolute" 
            bottom="$4" 
            right="$4"
            bg="$color1"
            p="$3"
            borderRadius="$3"
            borderWidth={1}
            borderColor="$color6"
            shadowColor="$color8"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.1}
            shadowRadius={4}
            elevation={2}
          >
            <Text fontSize="$3" fontWeight="600" color="$color12" mb="$2">Damage Threat</Text>
            <YStack gap="$2">
              <XStack gap="$2" alignItems="center">
                <View width={12} height={12} borderRadius={6} bg="$red10" />
                <Text fontSize="$2" color="$color10">Very High</Text>
              </XStack>
              <XStack gap="$2" alignItems="center">
                <View width={12} height={12} borderRadius={6} bg="$yellow10" />
                <Text fontSize="$2" color="$color10">High</Text>
              </XStack>
              <XStack gap="$2" alignItems="center">
                <View width={12} height={12} borderRadius={6} bg="$blue10" />
                <Text fontSize="$2" color="$color10">Medium</Text>
              </XStack>
              <XStack gap="$2" alignItems="center">
                <View width={12} height={12} borderRadius={6} bg="$green10" />
                <Text fontSize="$2" color="$color10">Low</Text>
              </XStack>
            </YStack>
          </View>
        </YStack>
      </XStack>
    </YStack>
  )
} 