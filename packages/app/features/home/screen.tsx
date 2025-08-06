import {
  Anchor,
  Button,
  H1,
  H2,
  H3,
  Paragraph,
  Separator,
  Sheet,
  SwitchThemeButton,
  useToastController,
  XStack,
  YStack,
  Text,
  View,
  ScrollView
} from '@my/ui'
import { 
  ChevronDown, 
  ChevronUp, 
  Shield,
  TrendingUp,
  Cloud,
  Zap,
  Star,
  ExternalLink,
  LogOut,
  User
} from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Platform } from 'react-native'
import { useLink } from 'solito/navigation'
import { useAuth } from '../auth/context'

export function HomeScreen({ pagesMode = false }: { pagesMode?: boolean }) {
  const { user, tenant, logout } = useAuth()
  const linkTarget = pagesMode ? '/pages-example-user' : '/user'
  const linkProps = useLink({
    href: `${linkTarget}/nate`,
  })

  const handleLogout = () => {
    logout()
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
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
        $sm={{ position: 'relative', t: 0 }}
      >
        {/* Left side - empty for balance */}
        <View width="$4" height="$4" />
        
        {/* Center - Title */}
        <XStack gap="$4" alignItems="center">
          <H2 color="$color12" fontWeight="bold">Urbint Unified</H2>
        </XStack>
        
        {/* Right side - Actions */}
        <XStack gap="$4" alignItems="center">
          {Platform.OS === 'web' && (
            <>
              <SwitchThemeButton />
            </>
          )}
          
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

      <ScrollView 
        flex={1} 
        pt="$20" 
        pb="$4" 
        px="$4" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <YStack gap="$8" alignItems="center">
          {/* Welcome Section with Tenant Info */}
          <YStack gap="$4" alignItems="center" maxWidth={600}>
            <H1 color="$color12" textAlign="center" fontSize="$12" $sm={{ fontSize: "$10" }}>
              Urbint Operational Resilience Platform
            </H1>
            <Paragraph color="$color10" size="$5" textAlign="center" maxWidth={500}>
              Unified access to all your tools for smarter, safer operations.
            </Paragraph>
            {tenant && (
              <View bg="$color2" px="$3" py="$2" borderRadius="$2">
                <Text fontSize="$2" color="$color10">
                  {tenant.name}
                </Text>
              </View>
            )}
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
                ctaText="Go to Damage Prevention"
                href="/damage-prevention"
                metric="High-Risk Ticket Trend"
                metricValue="+15%"
                metricLabel="This Month"
                insight="Your team is proactively managing a rising trend in high-risk excavations, with +15% more high-risk tickets identified this month."
              />
              <ProductCard 
                title="Worker Safety"
                description="Proactively manage hazards and tasks with digital safety briefs."
                icon={TrendingUp}
                ctaText="Go to Worker Safety"
                href="/worker-safety"
                metric="JSB Completeness Score"
                metricValue="95%"
                metricLabel="Average 7 hazards per brief"
                insight="Your crews are maintaining a 95% JSB completeness score, with an average of 7 critical hazards identified per brief. This indicates a strong, consistent safety culture."
              />
            </XStack>
            
            <XStack gap="$4" flexWrap="wrap" justifyContent="center">
              <ProductCard 
                title="Storm Manager"
                description="Plan, allocate and respond to storms efficiently."
                icon={Cloud}
                ctaText="Go to Storm Manager"
                href="/storm-manager"
                metric="Response Time"
                metricValue="-30%"
                metricLabel="vs Last Year"
                insight="Your storm response time has improved by 30% compared to last year, with faster resource allocation and team deployment."
              />
              <ProductCard 
                title="Storm Impact"
                description="Assess potential grid impacts from weather forecasts."
                icon={Zap}
                ctaText="Go to Storm Impact"
                href="/storm-impact"
                metric="Grid Impact Accuracy"
                metricValue="92%"
                metricLabel="Prediction Rate"
                insight="Your grid impact predictions are 92% accurate, helping prevent outages and enabling proactive maintenance planning."
              />
            </XStack>
          </YStack>

          {/* Footer */}
          <YStack gap="$2" alignItems="center" pt="$8">
            <Text fontSize="$2" color="$color8" textAlign="center">
              © 2025 Urbint Operational Resilience Platform. All rights reserved.
            </Text>
          </YStack>
        </YStack>
      </ScrollView>
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
  ctaText, 
  href,
  insight,
  metric,
  metricValue,
  metricLabel
}: {
  title: string
  description: string
  icon: any
  ctaText: string
  href: string
  insight?: string
  metric?: string
  metricValue?: string
  metricLabel?: string
}) {
  const linkProps = useLink({ href })
  
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
        {/* Header with Icon */}
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
        
        {/* Content */}
        <YStack gap="$2">
          <H3 color="$color12" fontSize="$5" fontWeight="600">
            {title}
          </H3>
          <Paragraph color="$color10" size="$3" lineHeight="$4">
            {description}
          </Paragraph>
        </YStack>

        {/* Metrics and Insights */}
        {(insight || metric) && (
          <YStack gap="$3" p="$4" bg="$color1" borderRadius="$3" borderWidth={1} borderColor="$color6">
            {metric && (
              <XStack gap="$3" alignItems="center">
                <View width="$4" height="$4" borderRadius="$2" bg="$blue2" alignItems="center" justifyContent="center">
                  <TrendingUp size={14} color="$blue10" />
                </View>
                <YStack>
                  <Text fontSize="$4" fontWeight="700" color="$color12">
                    {metricValue}
                  </Text>
                  <Text fontSize="$1" color="$color9" fontWeight="500">
                    {metricLabel}
                  </Text>
                </YStack>
              </XStack>
            )}
            {insight && (
              <Paragraph size="$2" lineHeight="$3" color="$color10">
                {insight}
              </Paragraph>
            )}
          </YStack>
        )}
        
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
