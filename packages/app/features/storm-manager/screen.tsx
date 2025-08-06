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
  Card,
  Separator,
  Checkbox,
  ListItem
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
  Table
} from '@tamagui/lucide-icons'
import { Platform, ScrollView as RNScrollView } from 'react-native'
import { useLink } from 'solito/navigation'
import { useAuth } from '../auth/context'
import { useState } from 'react'

interface Company {
  id: string
  name: string
  resourcePool: string
  resourcePoolName: string
  crewSheet: string
  crewSheetName: string
  notes: string[]
  status: number[] // 3 status indicators: 0 = white, 1 = red
  crew: number
  crewSize: number
  bucket: number
  digger: number
}

const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Tyler Line Contracting',
    resourcePool: '1111-TX-AK',
    resourcePoolName: 'Damage Assessment 1',
    crewSheet: '1111-TX-AK-01',
    crewSheetName: 'Damage Assessment 1',
    notes: ['Note RP from Contractor1', 'Note RP from Contractor2'],
    status: [1, 1, 1], // All red
    crew: 0,
    crewSize: 2,
    bucket: 0,
    digger: 0
  },
  {
    id: '2',
    name: 'Storm Line Contractors',
    resourcePool: 'BECD-TX-BF',
    resourcePoolName: 'Houston Crews',
    crewSheet: 'BECD-TX-BF-01',
    crewSheetName: 'Houston Crews',
    notes: ['Note Contractor2'],
    status: [1, 1, 0], // 2 red, 1 white
    crew: 4,
    crewSize: 1,
    bucket: 0,
    digger: 0
  },
  {
    id: '3',
    name: "Best's Line&Company - Original Comp",
    resourcePool: 'BL&C-AL-DA',
    resourcePoolName: 'test101',
    crewSheet: 'BL&C-AL-DA-01',
    crewSheetName: 'test101',
    notes: [],
    status: [1, 0, 0], // 1 red, 2 white
    crew: 1,
    crewSize: 1,
    bucket: 0,
    digger: 0
  },
  {
    id: '4',
    name: 'Dew Contracting',
    resourcePool: 'DEW-TX-HC',
    resourcePoolName: 'Dew Test4',
    crewSheet: 'DEW-TX-HC-01',
    crewSheetName: 'Dew Test4',
    notes: [],
    status: [1, 0, 0],
    crew: 2,
    crewSize: 1,
    bucket: 0,
    digger: 0
  },
  {
    id: '5',
    name: 'Dew Contracting',
    resourcePool: 'DEW-TX-HC2',
    resourcePoolName: 'Dew Test 3',
    crewSheet: 'DEW-TX-HC2-01',
    crewSheetName: 'Dew Test 3',
    notes: [],
    status: [1, 0, 0],
    crew: 3,
    crewSize: 1,
    bucket: 0,
    digger: 0
  }
]

export function StormManagerScreen() {
  const { user, logout } = useAuth()
  const linkProps = useLink({ href: '/' })
  
  const [selectedTab, setSelectedTab] = useState('Damage Assessment')
  const [searchText, setSearchText] = useState('')
  const [showReleasedCrews, setShowReleasedCrews] = useState(false)
  const [customizeTable, setCustomizeTable] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])

  const tabs = ['Damage Assessment', 'Distribution Line', 'Distribution Veg Mgmt', 'Support']
  const filters = ['Supervisor', 'Assigned Location', 'Curr. Location', 'Tag', 'Event', 'Billing Schedule', 'Release', 'Export']

  const handleLogout = () => {
    logout()
  }

  const toggleCompanySelection = (companyId: string) => {
    setSelectedCompanies(prev => 
      prev.includes(companyId) 
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    )
  }

  const toggleAllCompanies = () => {
    if (selectedCompanies.length === mockCompanies.length) {
      setSelectedCompanies([])
    } else {
      setSelectedCompanies(mockCompanies.map(c => c.id))
    }
  }

  const handleCheckboxChange = (checked: boolean, setter: (value: boolean) => void) => {
    setter(checked as boolean)
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
        
        {/* Center - User Info */}
        <XStack gap="$3" alignItems="center">
          <XStack gap="$2" alignItems="center">
            <View width="$3" height="$3" borderRadius="$2" bg="$blue8" alignItems="center" justifyContent="center">
              <User size={12} color="$blue10" />
            </View>
            <Text fontSize="$3" color="$color10" fontWeight="500">
              Manasa Damera (DEMO WRM Utility)
            </Text>
            <ChevronDown size={14} color="$color10" />
          </XStack>
        </XStack>
        
        {/* Right side - Actions */}
        <XStack gap="$3" alignItems="center">
          <Button
            size="$3"
            theme="red"
            fontWeight="600"
          >
            Manage Secured Workforce
          </Button>
          
          <SwitchThemeButton />
          
          <Button 
            size="$3" 
            circular 
            icon={LogOut} 
            onPress={handleLogout}
            chromeless
          />
        </XStack>
      </XStack>

      {/* Navigation Bar */}
      <XStack
        width="100%"
        gap="$6"
        px="$4"
        py="$2"
        bg="$color1"
        borderBottomWidth={1}
        borderBottomColor="$color6"
      >
        {['Home', 'Report', 'Workforce', 'Logistics', 'Financials', 'Mutual Aid'].map((nav) => (
          <XStack key={nav} gap="$1" alignItems="center">
            <Text fontSize="$3" color="$color10" fontWeight="500">
              {nav}
            </Text>
            <ChevronDown size={12} color="$color10" />
          </XStack>
        ))}
      </XStack>

      {/* Operating Company & Event Bar */}
      <XStack
        width="100%"
        gap="$4"
        px="$4"
        py="$2"
        bg="$red2"
        alignItems="center"
      >
        <XStack gap="$2" alignItems="center">
          <Text fontSize="$3" color="$color1" fontWeight="500">
            Operating Company:
          </Text>
          <Button size="$3" bg="$red3" borderColor="$red4" variant="outlined">
            All
            <ChevronDown size={14} />
          </Button>
        </XStack>

        <XStack gap="$2" alignItems="center">
          <Text fontSize="$3" color="$color1" fontWeight="500">
            Event:
          </Text>
          <Button size="$3" bg="$red3" borderColor="$red4" variant="outlined">
            All Active Events
            <ChevronDown size={14} />
          </Button>
        </XStack>

        <XStack flex={1} />

        <XStack gap="$3" alignItems="center">
          <View position="relative">
            <Button size="$3" circular icon={Bell} chromeless color="$color1" />
            <View
              position="absolute"
              top={-5}
              right={-5}
              width={16}
              height={16}
              borderRadius={8}
              bg="$red10"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="$1" color="$color1" fontWeight="600">167</Text>
            </View>
          </View>
          <Button size="$3" circular icon={Phone} chromeless color="$color1" />
        </XStack>
      </XStack>

      <RNScrollView 
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
                Manage Secured Workforce
              </H1>
            </XStack>
          </YStack>

          {/* Tabs */}
          <XStack gap="$2" flexWrap="wrap">
            {tabs.map((tab) => (
              <Button
                key={tab}
                size="$3"
                theme={selectedTab === tab ? "red" : undefined}
                variant={selectedTab === tab ? undefined : 'outlined'}
                borderRadius="$3"
                onPress={() => setSelectedTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </XStack>

          {/* Search and Actions */}
          <XStack gap="$4" alignItems="center" flexWrap="wrap">
            <XStack gap="$2" flex={1} minWidth={250}>
              <Search size={16} color="$color10" />
              <Input
                placeholder="Enter text to search..."
                flex={1}
                size="$3"
                borderRadius="$3"
                value={searchText}
                onChangeText={setSearchText}
              />
              <ChevronDown size={16} color="$color10" />
            </XStack>
            <Button
              size="$3"
              theme="blue"
              borderRadius="$3"
            >
              Q Search
            </Button>
            <Button
              size="$3"
              variant="outlined"
              borderRadius="$3"
            >
              Show Summary
            </Button>
          </XStack>

          {/* Filters */}
          <XStack gap="$2" flexWrap="wrap">
            {filters.map((filter) => (
              <Button key={filter} size="$3" bg="$color2" borderColor="$color6" variant="outlined">
                <Filter size={12} color="$color10" />
                {filter}
                <ChevronDown size={12} />
              </Button>
            ))}
          </XStack>

          {/* Table Controls */}
          <XStack gap="$4" alignItems="center" justifyContent="space-between">
            <XStack gap="$3" alignItems="center">
              <XStack gap="$2" alignItems="center">
                <Checkbox
                  checked={showReleasedCrews}
                  onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, setShowReleasedCrews)}
                />
                <Text fontSize="$3" color="$color10">
                  Show Released Crews
                </Text>
              </XStack>
              <XStack gap="$2" alignItems="center">
                <Checkbox
                  checked={customizeTable}
                  onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, setCustomizeTable)}
                />
                <Table size={14} color="$color10" />
                <Text fontSize="$3" color="$color10">
                  Customize Table
                </Text>
              </XStack>
            </XStack>
          </XStack>

          {/* Data Table */}
          <Card bg="$color2" borderColor="$color6" borderWidth={1}>
            {/* Table Header */}
            <XStack 
              gap="$3" 
              p="$4" 
              bg="$color3" 
              borderBottomWidth={1}
              borderBottomColor="$color6"
              alignItems="center"
            >
              <Checkbox
                checked={selectedCompanies.length === mockCompanies.length}
                onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, toggleAllCompanies)}
              />
              <Text fontSize="$3" fontWeight="600" color="$color11" flex={2}>COMPANY</Text>
              <Text fontSize="$3" fontWeight="600" color="$color11" flex={1.5}>RESOURCE POOL</Text>
              <Text fontSize="$3" fontWeight="600" color="$color11" flex={2}>RESOURCE POOL NAME</Text>
              <Text fontSize="$3" fontWeight="600" color="$color11" flex={1.5}>CREW SHEET</Text>
              <Text fontSize="$3" fontWeight="600" color="$color11" flex={2}>CREW SHEET NAME</Text>
              <Text fontSize="$3" fontWeight="600" color="$color11" flex={1}>NOTE</Text>
              <Text fontSize="$3" fontWeight="600" color="$color11" flex={1}>STATUS</Text>
              <Text fontSize="$3" fontWeight="600" color="$color11" flex={0.5}>CREW</Text>
              <Text fontSize="$3" fontWeight="600" color="$color11" flex={0.5}>SIZE</Text>
              <Text fontSize="$3" fontWeight="600" color="$color11" flex={0.5}>BUCKET</Text>
              <Text fontSize="$3" fontWeight="600" color="$color11" flex={0.5}>DIGGER</Text>
            </XStack>

            {/* Table Rows */}
            {mockCompanies.map((company) => (
              <XStack 
                key={company.id}
                gap="$3" 
                p="$4" 
                borderBottomWidth={1}
                borderBottomColor="$color6"
                alignItems="center"
              >
                <Checkbox
                  checked={selectedCompanies.includes(company.id)}
                  onCheckedChange={() => toggleCompanySelection(company.id)}
                />
                <Text fontSize="$3" color="$color11" flex={2} fontWeight="500">
                  {company.name}
                </Text>
                <Text fontSize="$3" color="$color11" flex={1.5}>
                  {company.resourcePool}
                </Text>
                <XStack gap="$2" alignItems="center" flex={2}>
                  <Text fontSize="$3" color="$color11" flex={1}>
                    {company.resourcePoolName}
                  </Text>
                  <Edit3 size={12} color="$color10" />
                </XStack>
                <XStack gap="$2" alignItems="center" flex={1.5}>
                  <Text fontSize="$3" color="$color11" flex={1}>
                    {company.crewSheet}
                  </Text>
                  {company.crewSheet === 'BL&C-AL-DA-01' && (
                    <View width="$2" height="$2" borderRadius="$1" bg="$red10" alignItems="center" justifyContent="center">
                      <Text fontSize="$1" color="$color1" fontWeight="600">1</Text>
                    </View>
                  )}
                </XStack>
                <XStack gap="$2" alignItems="center" flex={2}>
                  <Text fontSize="$3" color="$color11" flex={1}>
                    {company.crewSheetName}
                  </Text>
                  <Edit3 size={12} color="$color10" />
                </XStack>
                <XStack gap="$1" alignItems="center" flex={1}>
                  {company.notes.length > 0 && (
                    <Edit3 size={12} color="$color10" />
                  )}
                </XStack>
                <XStack gap="$1" alignItems="center" flex={1}>
                  {company.status.map((status, index) => (
                    <View 
                      key={index}
                      width="$2" 
                      height="$2" 
                      borderRadius="$1" 
                      bg={status === 1 ? '$red10' : '$color6'}
                    />
                  ))}
                </XStack>
                <Text fontSize="$3" color="$color11" flex={0.5}>
                  {company.crew}
                </Text>
                <Text fontSize="$3" color="$color11" flex={0.5}>
                  {company.crewSize}
                </Text>
                <Text fontSize="$3" color="$color11" flex={0.5}>
                  {company.bucket}
                </Text>
                <Text fontSize="$3" color="$color11" flex={0.5}>
                  {company.digger}
                </Text>
              </XStack>
            ))}
          </Card>

          {/* Pagination */}
          <XStack gap="$4" alignItems="center" justifyContent="space-between">
            <Text fontSize="$3" color="$color10">
              Page {currentPage} of 2 (26 items)
            </Text>
            <XStack gap="$2" alignItems="center">
              <Button size="$3" variant="outlined" disabled={currentPage === 1}>
                ‹
              </Button>
              <Button size="$3" variant={currentPage === 1 ? undefined : 'outlined'}>
                1
              </Button>
              <Button size="$3" variant={currentPage === 2 ? undefined : 'outlined'}>
                2
              </Button>
              <Button size="$3" variant="outlined" disabled={currentPage === 2}>
                ›
              </Button>
            </XStack>
            <XStack gap="$2" alignItems="center">
              <Text fontSize="$3" color="$color10">
                Page size:
              </Text>
              <Button size="$3" bg="$color2" borderColor="$color6" variant="outlined">
                20
                <ChevronDown size={12} />
              </Button>
            </XStack>
          </XStack>
        </YStack>
      </RNScrollView>

      {/* Footer */}
      <XStack
        width="100%"
        px="$4"
        py="$2"
        bg="$color1"
        borderTopWidth={1}
        borderTopColor="$color6"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="$2" color="$color8">
          Copyright © 2020 WRM Software Inc. All right reserved.
        </Text>
        <Text fontSize="$2" color="$color8">
          version: 2.130-mt.4.0
        </Text>
      </XStack>
    </YStack>
  )
} 