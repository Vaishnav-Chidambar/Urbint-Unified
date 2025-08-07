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
  ScrollView,
  Input,
  Card
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
  User,
  MessageCircle,
  Send,
  Bot,
  X
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

  // State for widget visibility
  const [visibleWidgets, setVisibleWidgets] = useState({
    damagePrevention: true,
    workerSafety: true,
    stormManager: true,
    stormImpact: false // Initially hidden
  })

  // State for AI chatbot
  const [showChatbot, setShowChatbot] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{
    id: number
    type: 'user' | 'bot'
    message: string
    timestamp: Date
    suggestions?: string[]
  }>>([
    {
      id: 1,
      type: 'bot' as const,
      message: 'Hello! I\'m your AI assistant. I can help you customize your dashboard by adding or removing widgets. Some features like Storm Manager are premium and require a subscription upgrade. What would you like to do?',
      timestamp: new Date(),
      suggestions: ['Add Storm Impact Widget', 'Show Available Widgets', 'Ask About Premium Features']
    }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const handleLogout = () => {
    logout()
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  }

  const addWidget = (widgetName: string) => {
    setVisibleWidgets(prev => ({
      ...prev,
      [widgetName]: true
    }))
  }

  const removeWidget = (widgetName: string) => {
    setVisibleWidgets(prev => ({
      ...prev,
      [widgetName]: false
    }))
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user' as const,
      message: inputMessage,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    setInputMessage('')

    // Simulate AI response
    setTimeout(() => {
      const lowerMessage = inputMessage.toLowerCase()
      let botResponse = ''
      let suggestions: string[] = []

      if (lowerMessage.includes('storm impact') || lowerMessage.includes('add storm impact')) {
        botResponse = 'I\'ll add the Storm Impact widget to your dashboard. This widget helps you assess potential grid impacts from weather forecasts.'
        addWidget('stormImpact')
        suggestions = ['Remove Storm Impact Widget', 'Show Available Widgets']
      } else if (lowerMessage.includes('storm manager') || lowerMessage.includes('add storm manager')) {
        botResponse = 'Storm Manager is currently a premium feature that requires a subscription. The widget is visible but disabled on your dashboard. Contact your account manager to upgrade your subscription and unlock this feature.'
        suggestions = ['Ask About Premium Features', 'Show Available Widgets']
      } else if (lowerMessage.includes('remove') || lowerMessage.includes('hide')) {
        if (lowerMessage.includes('storm impact')) {
          botResponse = 'I\'ll remove the Storm Impact widget from your dashboard.'
          removeWidget('stormImpact')
          suggestions = ['Add Storm Impact Widget', 'Show Available Widgets']
        } else if (lowerMessage.includes('storm manager')) {
          botResponse = 'Storm Manager is a premium feature. You can\'t remove it, but it\'s currently disabled until you upgrade your subscription.'
          suggestions = ['Ask About Premium Features', 'Show Available Widgets']
        } else {
          botResponse = 'I can help you remove widgets. Which widget would you like to remove?'
          suggestions = ['Remove Storm Impact Widget', 'Show Available Widgets']
        }
      } else if (lowerMessage.includes('available') || lowerMessage.includes('widgets') || lowerMessage.includes('show')) {
        botResponse = 'Available widgets: Damage Prevention, Worker Safety, Storm Manager (premium), and Storm Impact. Storm Manager is currently disabled as it requires a subscription upgrade.'
        suggestions = ['Add Storm Impact Widget', 'Ask About Premium Features']
      } else if (lowerMessage.includes('premium') || lowerMessage.includes('subscription') || lowerMessage.includes('upgrade')) {
        botResponse = 'Storm Manager is a premium feature that requires a subscription upgrade. Contact your account manager to unlock this feature and get access to advanced storm planning and response capabilities.'
        suggestions = ['Show Available Widgets', 'Add Storm Impact Widget']
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        botResponse = 'Hello! I\'m here to help you customize your dashboard. You can ask me to add or remove widgets, or ask about available features and subscription options.'
        suggestions = ['Add Storm Impact Widget', 'Show Available Widgets', 'Ask About Premium Features']
      } else {
        botResponse = 'I can help you manage your dashboard widgets. You can ask me to add Storm Impact, remove widgets, show available options, or ask about premium features. What would you like to do?'
        suggestions = ['Add Storm Impact Widget', 'Show Available Widgets', 'Ask About Premium Features']
      }

      const botMessage = {
        id: chatMessages.length + 2,
        type: 'bot' as const,
        message: botResponse,
        timestamp: new Date(),
        suggestions
      }

      setChatMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user' as const,
      message: suggestion,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const lowerMessage = suggestion.toLowerCase()
      let botResponse = ''
      let suggestions: string[] = []

      if (lowerMessage.includes('storm impact') || lowerMessage.includes('add storm impact')) {
        botResponse = 'I\'ll add the Storm Impact widget to your dashboard. This widget helps you assess potential grid impacts from weather forecasts.'
        addWidget('stormImpact')
        suggestions = ['Remove Storm Impact Widget', 'Show Available Widgets']
      } else if (lowerMessage.includes('remove') || lowerMessage.includes('hide')) {
        if (lowerMessage.includes('storm impact')) {
          botResponse = 'I\'ll remove the Storm Impact widget from your dashboard.'
          removeWidget('stormImpact')
          suggestions = ['Add Storm Impact Widget', 'Show Available Widgets']
        } else if (lowerMessage.includes('storm manager')) {
          botResponse = 'Storm Manager is a premium feature. You can\'t remove it, but it\'s currently disabled until you upgrade your subscription.'
          suggestions = ['Ask About Premium Features', 'Show Available Widgets']
        } else {
          botResponse = 'I can help you remove widgets. Which widget would you like to remove?'
          suggestions = ['Remove Storm Impact Widget', 'Show Available Widgets']
        }
      } else if (lowerMessage.includes('storm manager') || lowerMessage.includes('add storm manager')) {
        botResponse = 'Storm Manager is currently a premium feature that requires a subscription. The widget is visible but disabled on your dashboard. Contact your account manager to upgrade your subscription and unlock this feature.'
        suggestions = ['Ask About Premium Features', 'Show Available Widgets']
      } else if (lowerMessage.includes('available') || lowerMessage.includes('widgets') || lowerMessage.includes('show')) {
        botResponse = 'Available widgets: Damage Prevention, Worker Safety, Storm Manager (premium), and Storm Impact. Storm Manager is currently disabled as it requires a subscription upgrade.'
        suggestions = ['Add Storm Impact Widget', 'Ask About Premium Features']
      } else if (lowerMessage.includes('premium') || lowerMessage.includes('subscription') || lowerMessage.includes('upgrade')) {
        botResponse = 'Storm Manager is a premium feature that requires a subscription upgrade. Contact your account manager to unlock this feature and get access to advanced storm planning and response capabilities.'
        suggestions = ['Show Available Widgets', 'Add Storm Impact Widget']
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        botResponse = 'Hello! I\'m here to help you customize your dashboard. You can ask me to add or remove widgets, or ask about available features and subscription options.'
        suggestions = ['Add Storm Impact Widget', 'Show Available Widgets', 'Ask About Premium Features']
      } else {
        botResponse = 'I can help you manage your dashboard widgets. You can ask me to add Storm Impact, remove widgets, show available options, or ask about premium features. What would you like to do?'
        suggestions = ['Add Storm Impact Widget', 'Show Available Widgets', 'Ask About Premium Features']
      }

      const botMessage = {
        id: chatMessages.length + 2,
        type: 'bot' as const,
        message: botResponse,
        timestamp: new Date(),
        suggestions
      }

      setChatMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  return (
    <YStack flex={1} bg="$background" minHeight="100vh" position="relative">
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
        
        {/* Center - empty for balance */}
        <View width="$4" height="$4" />
        
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
              {visibleWidgets.damagePrevention && (
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
                  resilienceScore={25}
                />
              )}
              {visibleWidgets.workerSafety && (
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
                  resilienceScore={30}
                />
              )}
              {visibleWidgets.stormImpact && (
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
                  resilienceScore={32}
                />
              )}
              {visibleWidgets.stormManager && (
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
                  disabled={true}
                />
              )}
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

      {/* AI Chatbot */}
      <AIChatbot 
        showChatbot={showChatbot}
        setShowChatbot={setShowChatbot}
        chatMessages={chatMessages}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
        handleSuggestionClick={handleSuggestionClick}
      />
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
  metricLabel,
  resilienceScore,
  disabled = false
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
  resilienceScore?: number
  disabled?: boolean
}) {
  const linkProps = disabled ? {} : useLink({ href })
  
  return (
    <View 
      p="$6" 
      bg={disabled ? "$color1" : "$color2"}
      borderRadius="$4" 
      borderWidth={1}
      borderColor={disabled ? "$color5" : "$color6"}
      minWidth={280}
      maxWidth={350}
      pressStyle={disabled ? {} : { scale: 0.98, bg: '$color3' }}
      opacity={disabled ? 0.85 : 1}
      {...linkProps}
    >
      <YStack gap="$4" flex={1} justifyContent="space-between">
        <YStack gap="$4">
          {/* Header with Icon and Resilience Score */}
          <XStack alignItems="center" justifyContent="space-between">
            <View 
              width="$5" 
              height="$5" 
              borderRadius="$3" 
              bg={disabled ? "$color4" : "$blue2"}
              alignItems="center" 
              justifyContent="center"
            >
              <Icon size={24} color={disabled ? "$color8" : "$blue10"} />
            </View>
            
            {/* Resilience Score Tag - Only show for non-disabled cards */}
            {!disabled && resilienceScore && (
              <View 
                bg="$green2" 
                px="$2" 
                py="$1" 
                borderRadius="$2" 
                borderWidth={1} 
                borderColor="$green6"
              >
                <XStack alignItems="center" gap="$1">
                  <Star size={12} color="$green10" />
                  <Text fontSize="$1" fontWeight="600" color="$green10">
                    +{resilienceScore}
                  </Text>
                </XStack>
              </View>
            )}
          </XStack>
          
          {/* Content */}
          <YStack gap="$2">
            <H3 color={disabled ? "$color8" : "$color12"} fontSize="$5" fontWeight="600">
              {title}
            </H3>
            <Paragraph color={disabled ? "$color7" : "$color10"} size="$3" lineHeight="$4">
              {description}
            </Paragraph>
          </YStack>

          {/* Metrics and Insights */}
          {(insight || metric) && (
            <YStack gap="$3" p="$4" bg={disabled ? "$color2" : "$color1"} borderRadius="$3" borderWidth={1} borderColor={disabled ? "$color5" : "$color6"}>
              {metric && (
                <XStack gap="$3" alignItems="center">
                  <View width="$4" height="$4" borderRadius="$2" bg={disabled ? "$color4" : "$blue2"} alignItems="center" justifyContent="center">
                    <TrendingUp size={14} color={disabled ? "$color8" : "$blue10"} />
                  </View>
                  <YStack>
                    <Text fontSize="$4" fontWeight="700" color={disabled ? "$color8" : "$color12"}>
                      {metricValue}
                    </Text>
                    <Text fontSize="$1" color={disabled ? "$color7" : "$color9"} fontWeight="500">
                      {metricLabel}
                    </Text>
                  </YStack>
                </XStack>
              )}
              {insight && (
                <Paragraph size="$2" lineHeight="$3" color={disabled ? "$color7" : "$color10"}>
                  {insight}
                </Paragraph>
              )}
            </YStack>
          )}
        </YStack>
        
        {/* Call to Action */}
        <Button 
          size="$3" 
          bg={disabled ? "$color4" : "$blue10"}
          color={disabled ? "$color8" : "white"}
          icon={disabled ? undefined : ExternalLink}
          disabled={disabled}
          chromeless={disabled}
        >
          {disabled ? "Go to storm Manager" : ctaText}
        </Button>
      </YStack>
    </View>
  )
}

function AIChatbot({
  showChatbot,
  setShowChatbot,
  chatMessages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  handleSuggestionClick
}: {
  showChatbot: boolean
  setShowChatbot: (show: boolean) => void
  chatMessages: Array<{
    id: number
    type: 'user' | 'bot'
    message: string
    timestamp: Date
    suggestions?: string[]
  }>
  inputMessage: string
  setInputMessage: (message: string) => void
  handleSendMessage: () => void
  handleSuggestionClick: (suggestion: string) => void
}) {
  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        position="absolute"
        bottom="$6"
        right="$6"
        size="$5"
        circular
        bg="$blue10"
        color="white"
        icon={showChatbot ? X : MessageCircle}
        onPress={() => setShowChatbot(!showChatbot)}
        zIndex={9999}
        shadowColor="$color8"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.3}
        shadowRadius={8}
        elevation={8}
        pressStyle={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
        }}
      />

      {/* Chatbot Interface */}
      {showChatbot && (
        <View
          position="absolute"
          bottom="$20"
          right="$6"
          width={350}
          height={500}
          bg="$color1"
          borderRadius="$4"
          borderWidth={1}
          borderColor="$color6"
          shadowColor="$color8"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.3}
          shadowRadius={8}
          zIndex={9998}
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '24px',
            zIndex: 9998,
          }}
        >
          {/* Chat Header */}
          <XStack
            p="$4"
            borderBottomWidth={1}
            borderBottomColor="$color6"
            alignItems="center"
            gap="$3"
            bg="$color2"
            borderTopLeftRadius="$4"
            borderTopRightRadius="$4"
          >
            <View
              width="$4"
              height="$4"
              borderRadius="$2"
              bg="$blue2"
              alignItems="center"
              justifyContent="center"
            >
              <Bot size={16} color="$blue10" />
            </View>
            <Text fontSize="$4" fontWeight="600" color="$color12">
              AI Assistant
            </Text>
          </XStack>

          {/* Chat Messages */}
          <ScrollView flex={1} p="$4">
            <YStack gap="$3">
              {chatMessages.map((message) => (
                <View
                  key={message.id}
                  alignSelf={message.type === 'user' ? 'flex-end' : 'flex-start'}
                  maxWidth="80%"
                >
                  <Card
                    p="$3"
                    bg={message.type === 'user' ? '$blue2' : '$color2'}
                    borderRadius="$3"
                    borderWidth={1}
                    borderColor={message.type === 'user' ? '$blue6' : '$color6'}
                  >
                    <Text
                      fontSize="$3"
                      color={message.type === 'user' ? '$blue12' : '$color12'}
                      lineHeight="$4"
                    >
                      {message.message}
                    </Text>
                  </Card>
                  <Text
                    fontSize="$1"
                    color="$color8"
                    mt="$1"
                    alignSelf={message.type === 'user' ? 'flex-end' : 'flex-start'}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                  
                  {/* Suggestion Buttons */}
                  {message.type === 'bot' && message.suggestions && message.suggestions.length > 0 && (
                    <YStack gap="$2" mt="$2" alignSelf="flex-start">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          size="$2"
                          bg="$blue2"
                          color="$blue10"
                          borderColor="$blue6"
                          borderWidth={1}
                          borderRadius="$2"
                          onPress={() => handleSuggestionClick(suggestion)}
                          pressStyle={{ bg: '$blue3' }}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </YStack>
                  )}
                </View>
              ))}
            </YStack>
          </ScrollView>

          {/* Chat Input */}
          <XStack
            p="$4"
            borderTopWidth={1}
            borderTopColor="$color6"
            gap="$2"
            bg="$color2"
            borderBottomLeftRadius="$4"
            borderBottomRightRadius="$4"
          >
            <Input
              flex={1}
              placeholder="Type your message..."
              value={inputMessage}
              onChangeText={setInputMessage}
              onKeyPress={(e) => {
                if (e.nativeEvent.key === 'Enter') {
                  handleSendMessage()
                }
              }}
              bg="$color1"
              borderColor="$color6"
              fontSize="$3"
            />
            <Button
              size="$3"
              circular
              bg="$blue10"
              color="white"
              icon={Send}
              onPress={handleSendMessage}
              disabled={!inputMessage.trim()}
            />
          </XStack>
        </View>
      )}
    </>
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
