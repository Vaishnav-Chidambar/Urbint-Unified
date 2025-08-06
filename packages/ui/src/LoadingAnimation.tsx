import React, { useEffect, useRef } from 'react'
import { View, Text } from '@my/ui'
import { Animated, Easing } from 'react-native'

interface LoadingAnimationProps {
  size?: number
  color?: string
  text?: string
}

export const LoadingAnimation = ({ 
  size = 120, 
  color = "#003F53", 
  text = "Loading..." 
}: LoadingAnimationProps) => {
  const circle1 = useRef(new Animated.Value(0)).current
  const circle2 = useRef(new Animated.Value(0)).current
  const circle3 = useRef(new Animated.Value(0)).current
  const circle4 = useRef(new Animated.Value(0)).current
  const circle5 = useRef(new Animated.Value(0)).current
  const opacity = useRef(new Animated.Value(0)).current
  const scale = useRef(new Animated.Value(0.8)).current

  useEffect(() => {
    // Start with fade in and scale
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start()

    // Animate circles one by one with staggered timing
    const animateCircles = () => {
      Animated.sequence([
        // Circle 1 - innermost
        Animated.timing(circle1, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
        // Circle 2
        Animated.timing(circle2, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
        // Circle 3
        Animated.timing(circle3, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
        // Circle 4
        Animated.timing(circle4, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
        // Circle 5 - outermost
        Animated.timing(circle5, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
      ]).start()
    }

    // Start circle animation after initial fade
    setTimeout(animateCircles, 400)

    // Continuous rotation animation
    const rotateAnimation = Animated.loop(
      Animated.timing(circle5, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    )

    // Start rotation after all circles are in place
    setTimeout(() => {
      rotateAnimation.start()
    }, 3400)

  }, [])

  const circleSize = size / 5

  return (
    <View
      flex={1}
      alignItems="center"
      justifyContent="center"
      bg="$background"
    >
      <Animated.View
        style={{
          opacity,
          transform: [{ scale }],
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Concentric Circles */}
        <View position="relative" alignItems="center" justifyContent="center">
          {/* Circle 5 - Outermost (rotating) */}
          <Animated.View
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: 2,
              borderColor: color,
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              opacity: circle5,
              transform: [
                {
                  rotate: circle5.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            }}
          />

          {/* Circle 4 */}
          <Animated.View
            style={{
              position: 'absolute',
              width: size * 0.8,
              height: size * 0.8,
              borderRadius: (size * 0.8) / 2,
              borderWidth: 2,
              borderColor: color,
              borderBottomColor: 'transparent',
              borderLeftColor: 'transparent',
              opacity: circle4,
              transform: [
                {
                  scale: circle4.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },
              ],
            }}
          />

          {/* Circle 3 */}
          <Animated.View
            style={{
              position: 'absolute',
              width: size * 0.6,
              height: size * 0.6,
              borderRadius: (size * 0.6) / 2,
              borderWidth: 2,
              borderColor: color,
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              opacity: circle3,
              transform: [
                {
                  scale: circle3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },
              ],
            }}
          />

          {/* Circle 2 */}
          <Animated.View
            style={{
              position: 'absolute',
              width: size * 0.4,
              height: size * 0.4,
              borderRadius: (size * 0.4) / 2,
              borderWidth: 2,
              borderColor: color,
              borderBottomColor: 'transparent',
              borderLeftColor: 'transparent',
              opacity: circle2,
              transform: [
                {
                  scale: circle2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },
              ],
            }}
          />

          {/* Circle 1 - Innermost */}
          <Animated.View
            style={{
              position: 'absolute',
              width: size * 0.2,
              height: size * 0.2,
              borderRadius: (size * 0.2) / 2,
              borderWidth: 2,
              borderColor: color,
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              opacity: circle1,
              transform: [
                {
                  scale: circle1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },
              ],
            }}
          />

          {/* Center Dot */}
          <Animated.View
            style={{
              width: circleSize * 0.6,
              height: circleSize * 0.6,
              borderRadius: (circleSize * 0.6) / 2,
              backgroundColor: color,
              opacity: circle1,
              transform: [
                {
                  scale: circle1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
            }}
          />
        </View>

        {/* Loading Text */}
        <Animated.View
          style={{
            opacity: circle5,
            marginTop: 24,
          }}
        >
          <Text
            fontSize="$4"
            fontWeight="600"
            color="$color12"
            textAlign="center"
          >
            {text}
          </Text>
        </Animated.View>
      </Animated.View>
    </View>
  )
} 