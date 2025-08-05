import {
  H1,
  H2,
  H3,
  Paragraph,
  XStack,
  YStack,
  Card,
  ScrollView,
  Avatar,
  Badge,
  Text,
  Input,
  Button,
  Separator,
  Circle,
  Grid,
  ListItem
} from '@my/ui'
import { 
  Search, 
  Filter, 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Building,
  Star,
  MoreHorizontal
} from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Platform } from 'react-native'

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Product Manager',
    department: 'Product',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'online',
    skills: ['Product Strategy', 'User Research', 'Agile']
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Senior Developer',
    department: 'Engineering',
    email: 'michael.chen@company.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY',
    avatar: 'https://i.pravatar.cc/150?img=2',
    status: 'away',
    skills: ['React', 'TypeScript', 'Node.js']
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    department: 'Design',
    email: 'emily.rodriguez@company.com',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    avatar: 'https://i.pravatar.cc/150?img=3',
    status: 'online',
    skills: ['UI/UX', 'Figma', 'Prototyping']
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Data Scientist',
    department: 'Analytics',
    email: 'david.kim@company.com',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    avatar: 'https://i.pravatar.cc/150?img=4',
    status: 'offline',
    skills: ['Python', 'Machine Learning', 'SQL']
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Marketing Manager',
    department: 'Marketing',
    email: 'lisa.thompson@company.com',
    phone: '+1 (555) 567-8901',
    location: 'Chicago, IL',
    avatar: 'https://i.pravatar.cc/150?img=5',
    status: 'online',
    skills: ['Digital Marketing', 'Content Strategy', 'Analytics']
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'DevOps Engineer',
    department: 'Engineering',
    email: 'james.wilson@company.com',
    phone: '+1 (555) 678-9012',
    location: 'Remote',
    avatar: 'https://i.pravatar.cc/150?img=6',
    status: 'online',
    skills: ['AWS', 'Docker', 'Kubernetes']
  }
]

const departments = ['All', 'Product', 'Engineering', 'Design', 'Analytics', 'Marketing']

export function TeamScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesDepartment = selectedDepartment === 'All' || member.department === selectedDepartment
    
    return matchesSearch && matchesDepartment
  })

  return (
    <YStack flex={1} bg="$background">
      <ScrollView flex={1} p="$4">
        {/* Header */}
        <YStack gap="$4" mb="$6">
          <H1 color="$color12">Team Directory</H1>
          <Paragraph color="$color10" size="$4">
            Find and connect with your colleagues across the organization.
          </Paragraph>
        </YStack>

        {/* Search and Filter */}
        <YStack gap="$4" mb="$6">
          <XStack gap="$3" alignItems="center">
            <Input
              flex={1}
              placeholder="Search by name, role, or skills..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              icon={Search}
            />
            <Button size="$3" icon={Filter} theme="gray">
              Filter
            </Button>
          </XStack>

          {/* Department Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <XStack gap="$2">
              {departments.map(dept => (
                <Button
                  key={dept}
                  size="$2"
                  theme={selectedDepartment === dept ? 'blue' : 'gray'}
                  onPress={() => setSelectedDepartment(dept)}
                >
                  {dept}
                </Button>
              ))}
            </XStack>
          </ScrollView>
        </YStack>

        {/* Stats */}
        <YStack gap="$4" mb="$6">
          <H3 color="$color11">Overview</H3>
          <Grid columns={3} gap="$3">
            <StatCard 
              title="Total Members" 
              value={teamMembers.length.toString()} 
              icon={Users}
              color="$blue10"
            />
            <StatCard 
              title="Departments" 
              value={(departments.length - 1).toString()} 
              icon={Building}
              color="$green10"
            />
            <StatCard 
              title="Online Now" 
              value={teamMembers.filter(m => m.status === 'online').length.toString()} 
              icon={Star}
              color="$orange10"
            />
          </Grid>
        </YStack>

        {/* Team Members */}
        <YStack gap="$4">
          <H3 color="$color11">Team Members ({filteredMembers.length})</H3>
          <YStack gap="$3">
            {filteredMembers.map(member => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  )
}

function StatCard({ title, value, icon: Icon, color }: {
  title: string
  value: string
  icon: any
  color: string
}) {
  return (
    <Card p="$3" bg="$color2">
      <YStack gap="$2" alignItems="center">
        <Circle size="$3" bg={color} opacity={0.2}>
          <Icon size="$1.5" color={color} />
        </Circle>
        <Text size="$4" fontWeight="bold" color="$color12">
          {value}
        </Text>
        <Text size="$2" color="$color10" textAlign="center">
          {title}
        </Text>
      </YStack>
    </Card>
  )
}

function TeamMemberCard({ member }: { member: typeof teamMembers[0] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '$green10'
      case 'away': return '$orange10'
      case 'offline': return '$gray10'
      default: return '$gray10'
    }
  }

  return (
    <Card p="$4" bg="$color2">
      <XStack gap="$4" alignItems="center">
        <YStack alignItems="center" gap="$2">
          <Avatar circular size="$6">
            <Avatar.Image src={member.avatar} />
            <Avatar.Fallback bg="$blue8" />
          </Avatar>
          <Circle size="$2" bg={getStatusColor(member.status)} />
        </YStack>

        <YStack flex={1} gap="$2">
          <XStack justifyContent="space-between" alignItems="center">
            <YStack>
              <Text size="$4" fontWeight="600" color="$color12">
                {member.name}
              </Text>
              <Text size="$3" color="$color10">
                {member.role}
              </Text>
            </YStack>
            <Button size="$2" circular icon={MoreHorizontal} theme="gray" />
          </XStack>

          <XStack gap="$4" alignItems="center">
            <XStack gap="$1" alignItems="center">
              <Building size="$1" color="$color8" />
              <Text size="$2" color="$color8">
                {member.department}
              </Text>
            </XStack>
            <XStack gap="$1" alignItems="center">
              <MapPin size="$1" color="$color8" />
              <Text size="$2" color="$color8">
                {member.location}
              </Text>
            </XStack>
          </XStack>

          <YStack gap="$1">
            <XStack gap="$2" alignItems="center">
              <Mail size="$1" color="$color8" />
              <Text size="$2" color="$color8">
                {member.email}
              </Text>
            </XStack>
            <XStack gap="$2" alignItems="center">
              <Phone size="$1" color="$color8" />
              <Text size="$2" color="$color8">
                {member.phone}
              </Text>
            </XStack>
          </YStack>

          <XStack gap="$2" flexWrap="wrap">
            {member.skills.slice(0, 3).map(skill => (
              <Badge key={skill} size="$1" theme="blue">
                {skill}
              </Badge>
            ))}
            {member.skills.length > 3 && (
              <Badge size="$1" theme="gray">
                +{member.skills.length - 3} more
              </Badge>
            )}
          </XStack>
        </YStack>
      </XStack>
    </Card>
  )
} 