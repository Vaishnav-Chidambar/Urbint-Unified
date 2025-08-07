'use client'

import React, { useState, useEffect } from 'react'
import { LoadingScreen } from '../../../../packages/app/features/loading/screen'
import { Button, YStack, Text, XStack } from '@my/ui'

export default function LoadingDemoPage() {
  const [showLoading, setShowLoading] = useState(false)
  const [loadingText, setLoadingText] = useState("Loading Urbint Platform...")

  const startLoading = () => {
    setShowLoading(true)
    // Simulate loading for 5 seconds
    setTimeout(() => {
      setShowLoading(false)
    }, 5000)
  }

  if (showLoading) {
    return <LoadingScreen text={loadingText} />
  }

  return (
    <YStack flex={1} bg="$background" p="$4" gap="$6" alignItems="center" justifyContent="center">
      <Text fontSize="$8" fontWeight="bold" color="$color12" textAlign="center">
        Loading Animation Demo
      </Text>
      
      <Text fontSize="$4" color="$color10" textAlign="center" maxWidth={500}>
        Experience the beautiful concentric circles loading animation with Urbint branding.
        Each circle eases into place one by one, creating a mesmerizing effect.
      </Text>

      <YStack gap="$4" alignItems="center">
        <Button
          size="$4"
          bg="$blue10"
          color="white"
          onPress={startLoading}
          fontWeight="600"
        >
          Start Loading Animation
        </Button>

        <XStack gap="$3" alignItems="center">
          <Text fontSize="$3" color="$color10">Custom Text:</Text>
          <input
            type="text"
            value={loadingText}
            onChange={(e) => setLoadingText(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '14px',
              minWidth: '200px'
            }}
          />
        </XStack>
      </YStack>

      <YStack gap="$2" alignItems="center" mt="$8">
        <Text fontSize="$2" color="$color8" textAlign="center">
          Features:
        </Text>
        <Text fontSize="$2" color="$color8" textAlign="center">
          • 5 concentric circles that ease into place sequentially
        </Text>
        <Text fontSize="$2" color="$color8" textAlign="center">
          • Smooth scale and opacity animations with bounce effect
        </Text>
        <Text fontSize="$2" color="$color8" textAlign="center">
          • Continuous rotation of the outermost circle
        </Text>
        <Text fontSize="$2" color="$color8" textAlign="center">
          • Urbint brand colors (#003F53)
        </Text>
        <Text fontSize="$2" color="$color8" textAlign="center">
          • Customizable text, size, and colors
        </Text>
      </YStack>
    </YStack>
  )
} 