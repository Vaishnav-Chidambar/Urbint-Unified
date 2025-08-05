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
  FileText, 
  Folder, 
  Download, 
  Share, 
  MoreHorizontal,
  Calendar,
  User,
  File,
  Image,
  Video,
  Music,
  Archive,
  Star,
  Clock,
  Eye
} from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Platform } from 'react-native'

const documents = [
  {
    id: 1,
    name: 'Q4 Business Plan',
    type: 'pdf',
    size: '2.4 MB',
    lastModified: '2024-01-15',
    modifiedBy: 'Sarah Johnson',
    category: 'Business',
    isStarred: true,
    views: 45,
    icon: FileText
  },
  {
    id: 2,
    name: 'Product Roadmap 2024',
    type: 'docx',
    size: '1.8 MB',
    lastModified: '2024-01-14',
    modifiedBy: 'Michael Chen',
    category: 'Product',
    isStarred: false,
    views: 23,
    icon: FileText
  },
  {
    id: 3,
    name: 'Team Photo',
    type: 'jpg',
    size: '3.2 MB',
    lastModified: '2024-01-13',
    modifiedBy: 'Emily Rodriguez',
    category: 'Media',
    isStarred: true,
    views: 67,
    icon: Image
  },
  {
    id: 4,
    name: 'Marketing Strategy',
    type: 'pptx',
    size: '5.1 MB',
    lastModified: '2024-01-12',
    modifiedBy: 'Lisa Thompson',
    category: 'Marketing',
    isStarred: false,
    views: 34,
    icon: FileText
  },
  {
    id: 5,
    name: 'API Documentation',
    type: 'md',
    size: '0.8 MB',
    lastModified: '2024-01-11',
    modifiedBy: 'James Wilson',
    category: 'Technical',
    isStarred: true,
    views: 89,
    icon: File
  },
  {
    id: 6,
    name: 'Company Logo',
    type: 'svg',
    size: '0.2 MB',
    lastModified: '2024-01-10',
    modifiedBy: 'Emily Rodriguez',
    category: 'Design',
    isStarred: false,
    views: 156,
    icon: Image
  },
  {
    id: 7,
    name: 'Meeting Recording',
    type: 'mp4',
    size: '45.2 MB',
    lastModified: '2024-01-09',
    modifiedBy: 'David Kim',
    category: 'Media',
    isStarred: false,
    views: 12,
    icon: Video
  },
  {
    id: 8,
    name: 'Data Analysis Report',
    type: 'xlsx',
    size: '1.5 MB',
    lastModified: '2024-01-08',
    modifiedBy: 'David Kim',
    category: 'Analytics',
    isStarred: true,
    views: 28,
    icon: FileText
  }
]

const categories = ['All', 'Business', 'Product', 'Marketing', 'Technical', 'Design', 'Analytics', 'Media']

const getFileTypeColor = (type: string) => {
  switch (type) {
    case 'pdf': return '$red10'
    case 'docx': return '$blue10'
    case 'pptx': return '$orange10'
    case 'xlsx': return '$green10'
    case 'jpg':
    case 'png':
    case 'svg': return '$pink10'
    case 'mp4': return '$purple10'
    case 'md': return '$gray10'
    default: return '$gray10'
  }
}

export function DocumentsScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.modifiedBy.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const totalSize = documents.reduce((acc, doc) => {
    const size = parseFloat(doc.size.split(' ')[0])
    return acc + size
  }, 0)

  return (
    <YStack flex={1} bg="$background">
      <ScrollView flex={1} p="$4">
        {/* Header */}
        <YStack gap="$4" mb="$6">
          <H1 color="$color12">Documents</H1>
          <Paragraph color="$color10" size="$4">
            Access and manage all your organization's files and resources.
          </Paragraph>
        </YStack>

        {/* Search and Actions */}
        <YStack gap="$4" mb="$6">
          <XStack gap="$3" alignItems="center">
            <Input
              flex={1}
              placeholder="Search documents..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              icon={Search}
            />
            <Button size="$3" icon={Filter} theme="gray">
              Filter
            </Button>
            <Button size="$3" icon={Folder} theme="blue">
              New Folder
            </Button>
          </XStack>

          {/* Category Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <XStack gap="$2">
              {categories.map(category => (
                <Button
                  key={category}
                  size="$2"
                  theme={selectedCategory === category ? 'blue' : 'gray'}
                  onPress={() => setSelectedCategory(category)}
                >
                  {category}
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
              title="Total Files" 
              value={documents.length.toString()} 
              icon={FileText}
              color="$blue10"
            />
            <StatCard 
              title="Total Size" 
              value={`${totalSize.toFixed(1)} MB`} 
              icon={Folder}
              color="$green10"
            />
            <StatCard 
              title="Starred" 
              value={documents.filter(d => d.isStarred).length.toString()} 
              icon={Star}
              color="$orange10"
            />
          </Grid>
        </YStack>

        {/* View Mode Toggle */}
        <XStack justifyContent="space-between" alignItems="center" mb="$4">
          <H3 color="$color11">Documents ({filteredDocuments.length})</H3>
          <XStack gap="$2">
            <Button
              size="$2"
              theme={viewMode === 'grid' ? 'blue' : 'gray'}
              onPress={() => setViewMode('grid')}
            >
              Grid
            </Button>
            <Button
              size="$2"
              theme={viewMode === 'list' ? 'blue' : 'gray'}
              onPress={() => setViewMode('list')}
            >
              List
            </Button>
          </XStack>
        </XStack>

        {/* Documents */}
        {viewMode === 'grid' ? (
          <Grid columns={2} gap="$3" $gtSm={{ columns: 3 }}>
            {filteredDocuments.map(doc => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </Grid>
        ) : (
          <YStack gap="$3">
            {filteredDocuments.map(doc => (
              <DocumentListItem key={doc.id} document={doc} />
            ))}
          </YStack>
        )}
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

function DocumentCard({ document }: { document: typeof documents[0] }) {
  const Icon = document.icon
  
  return (
    <Card p="$4" bg="$color2" pressStyle={{ scale: 0.98 }}>
      <YStack gap="$3">
        <XStack justifyContent="space-between" alignItems="center">
          <Circle size="$4" bg={getFileTypeColor(document.type)} opacity={0.2}>
            <Icon size="$2" color={getFileTypeColor(document.type)} />
          </Circle>
          <XStack gap="$1">
            {document.isStarred && <Star size="$1" color="$orange10" fill="$orange10" />}
            <Button size="$2" circular icon={MoreHorizontal} theme="gray" />
          </XStack>
        </XStack>

        <YStack gap="$1">
          <Text size="$3" fontWeight="600" color="$color12" numberOfLines={2}>
            {document.name}
          </Text>
          <Text size="$2" color="$color10">
            {document.size}
          </Text>
        </YStack>

        <XStack gap="$2" alignItems="center">
          <Badge size="$1" theme="blue">
            {document.category}
          </Badge>
          <XStack gap="$1" alignItems="center">
            <Eye size="$1" color="$color8" />
            <Text size="$1" color="$color8">
              {document.views}
            </Text>
          </XStack>
        </XStack>

        <XStack gap="$2">
          <Button size="$2" icon={Download} theme="gray" flex={1}>
            Download
          </Button>
          <Button size="$2" icon={Share} theme="blue" flex={1}>
            Share
          </Button>
        </XStack>
      </YStack>
    </Card>
  )
}

function DocumentListItem({ document }: { document: typeof documents[0] }) {
  const Icon = document.icon
  
  return (
    <Card p="$4" bg="$color2">
      <XStack gap="$4" alignItems="center">
        <Circle size="$4" bg={getFileTypeColor(document.type)} opacity={0.2}>
          <Icon size="$2" color={getFileTypeColor(document.type)} />
        </Circle>

        <YStack flex={1} gap="$1">
          <XStack justifyContent="space-between" alignItems="center">
            <Text size="$4" fontWeight="600" color="$color12">
              {document.name}
            </Text>
            <XStack gap="$1" alignItems="center">
              {document.isStarred && <Star size="$1" color="$orange10" fill="$orange10" />}
              <Button size="$2" circular icon={MoreHorizontal} theme="gray" />
            </XStack>
          </XStack>

          <XStack gap="$4" alignItems="center">
            <XStack gap="$1" alignItems="center">
              <User size="$1" color="$color8" />
              <Text size="$2" color="$color8">
                {document.modifiedBy}
              </Text>
            </XStack>
            <XStack gap="$1" alignItems="center">
              <Calendar size="$1" color="$color8" />
              <Text size="$2" color="$color8">
                {document.lastModified}
              </Text>
            </XStack>
            <XStack gap="$1" alignItems="center">
              <Eye size="$1" color="$color8" />
              <Text size="$2" color="$color8">
                {document.views} views
              </Text>
            </XStack>
          </XStack>

          <XStack gap="$2" alignItems="center">
            <Badge size="$1" theme="blue">
              {document.category}
            </Badge>
            <Text size="$2" color="$color10">
              {document.size}
            </Text>
          </XStack>
        </YStack>

        <XStack gap="$2">
          <Button size="$2" icon={Download} theme="gray" />
          <Button size="$2" icon={Share} theme="blue" />
        </XStack>
      </XStack>
    </Card>
  )
} 