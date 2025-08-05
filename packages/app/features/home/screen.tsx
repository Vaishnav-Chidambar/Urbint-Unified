import {
  Anchor,
  Button,
  H1,
  H2,
  H3,
  Paragraph,
  Separator,
  Sheet,
  SwitchRouterButton,
  SwitchThemeButton,
  useToastController,
  XStack,
  YStack,
  Text,
  View
} from '@my/ui'
import { 
  ChevronDown, 
  ChevronUp, 
  Shield,
  TrendingUp,
  Cloud,
  Zap,
  Star,
  ExternalLink
} from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Platform } from 'react-native'
import { useLink } from 'solito/navigation'

export function HomeScreen({ pagesMode = false }: { pagesMode?: boolean }) {
  const linkTarget = pagesMode ? '/pages-example-user' : '/user'
  const linkProps = useLink({
    href: `${linkTarget}/nate`,
  })

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
        $sm={{ position: 'relative', t: 0 }}
      >
        {/* Left side - empty for balance */}
        <View width="$4" height="$4" />
        
        {/* Center - Title */}
        <XStack gap="$4" alignItems="center">
          <H2 color="$color12" fontWeight="bold">Urbint Unified</H2>
          <View bg="$blue8" px="$2" py="$1" borderRadius="$2">
            <Text fontSize="$1" color="$blue12" fontWeight="600">Beta</Text>
          </View>
        </XStack>
        
        {/* Right side - Actions */}
        <XStack gap="$4" alignItems="center">
          {Platform.OS === 'web' && (
            <>
              <SwitchRouterButton pagesMode={pagesMode} />
              <SwitchThemeButton />
            </>
          )}
        </XStack>
      </XStack>

      <YStack flex={1} pt="$20" pb="$4" px="$4" gap="$8" alignItems="center">
        {/* Welcome Section */}
        <YStack gap="$4" alignItems="center" maxWidth={600}>
          <H1 color="$color12" textAlign="center" fontSize="$12" $sm={{ fontSize: "$10" }}>
            Utility Intelligence Suite
          </H1>
          <Paragraph color="$color10" size="$5" textAlign="center" maxWidth={500}>
            Unified access to all your tools for smarter, safer operations.
          </Paragraph>
        </YStack>

        {/* Resilience Score Banner */}
        <ResilienceScoreBanner />

        {/* Product Grid */}
        <YStack gap="$6" maxWidth={800} width="100%">
          <XStack gap="$4" flexWrap="wrap" justifyContent="center">
            <ProductCard 
              title="Damage Prevention"
              description="Prevent underground utility damages with smart 811 ticket insights."
              icon={Shield}
              status="Live"
              ctaText="Go to Damage Prevention"
              href="/damage-prevention"
            />
            <ProductCard 
              title="Worker Safety"
              description="Proactively manage hazards and tasks with digital safety briefs."
              icon={TrendingUp}
              status="Live"
              ctaText="Go to Worker Safety"
              href="/worker-safety"
            />
          </XStack>
          
          <XStack gap="$4" flexWrap="wrap" justifyContent="center">
            <ProductCard 
              title="Storm Manager"
              description="Plan, allocate and respond to storms efficiently."
              icon={Cloud}
              status="Beta"
              ctaText="Go to Storm Manager"
              href="/storm-manager"
            />
            <ProductCard 
              title="Storm Impact"
              description="Assess potential grid impacts from weather forecasts."
              icon={Zap}
              status="Launching Soon"
              ctaText="Go to Storm Impact"
              href="/storm-impact"
            />
          </XStack>
        </YStack>

        {/* Footer */}
        <YStack gap="$2" alignItems="center" pt="$8">
          <Text fontSize="$2" color="$color8" textAlign="center">
            © 2025 Utility Intelligence Platform. All rights reserved.
          </Text>
        </YStack>
      </YStack>
    </YStack>
  )
}

function ResilienceScoreBanner() {
  return (
    <View 
      bg="$blue2" 
      px="$6" 
      py="$4" 
      borderRadius="$4" 
      borderWidth={1} 
      borderColor="$blue6"
      maxWidth={400}
      width="100%"
    >
      <XStack alignItems="center" justifyContent="center" gap="$3">
        <Star size={20} color="$blue10" />
        <Text fontSize="$4" fontWeight="600" color="$blue12">
          Customer Resilience Score: 87
        </Text>
      </XStack>
    </View>
  )
}

function ProductCard({ 
  title, 
  description, 
  icon: Icon, 
  status, 
  ctaText, 
  href 
}: {
  title: string
  description: string
  icon: any
  status: 'Live' | 'Beta' | 'Launching Soon'
  ctaText: string
  href: string
}) {
  const linkProps = useLink({ href })
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return '$green10'
      case 'Beta': return '$blue10'
      case 'Launching Soon': return '$yellow10'
      default: return '$color10'
    }
  }
  
  const getStatusBg = (status: string) => {
    switch (status) {
      case 'Live': return '$green2'
      case 'Beta': return '$blue2'
      case 'Launching Soon': return '$yellow2'
      default: return '$color2'
    }
  }
  
  return (
    <View 
      p="$6" 
      bg="$color2" 
      borderRadius="$4" 
      borderWidth={1}
      borderColor="$color6"
      minWidth={280}
      maxWidth={350}
      pressStyle={{ scale: 0.98, bg: '$color3' }}
      {...linkProps}
    >
      <YStack gap="$4">
        {/* Header with Icon and Status */}
        <XStack justifyContent="space-between" alignItems="flex-start">
          <View 
            width="$5" 
            height="$5" 
            borderRadius="$3" 
            bg="$blue2" 
            alignItems="center" 
            justifyContent="center"
          >
            <Icon size={24} color="$blue10" />
          </View>
          <View 
            bg={getStatusBg(status)} 
            px="$2" 
            py="$1" 
            borderRadius="$2"
            borderWidth={1}
            borderColor={getStatusColor(status)}
          >
            <Text fontSize="$1" color={getStatusColor(status)} fontWeight="600">
              {status}
            </Text>
          </View>
        </XStack>
        
        {/* Content */}
        <YStack gap="$2">
          <H3 color="$color12" fontSize="$5" fontWeight="600">
            {title}
          </H3>
          <Paragraph color="$color10" size="$3" lineHeight="$4">
            {description}
          </Paragraph>
        </YStack>
        
        {/* Call to Action */}
        <Button 
          size="$3" 
          theme="blue"
          icon={ExternalLink}
          mt="$2"
        >
          {ctaText}
        </Button>
      </YStack>
    </View>
  )
}

function SheetDemo() {
  const toast = useToastController()

  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)

  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        animation="medium"
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay
          bg="$shadow4"
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle bg="$color8" />
        <Sheet.Frame items="center" justify="center" gap="$10" bg="$color2">
          <XStack gap="$2">
            <Paragraph text="center">Made by</Paragraph>
            <Anchor color="$blue10" href="https://twitter.com/natebirdman" target="_blank">
              @natebirdman,
            </Anchor>
            <Anchor
              color="$blue10"
              href="https://github.com/tamagui/tamagui"
              target="_blank"
              rel="noreferrer"
            >
              give it a ⭐️
            </Anchor>
          </XStack>

          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
              toast.show('Sheet closed!', {
                message: 'Just showing how toast works...',
              })
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
