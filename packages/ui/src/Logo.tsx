import React from 'react'
import { View } from 'tamagui'
import { Platform } from 'react-native'

export const Logo: React.FC<{ size?: number; color?: string }> = ({ 
  size = 26, 
  color = 'white' 
}) => {
  // Map color string to Tamagui color token
  const getColorToken = (colorStr: string) => {
    if (colorStr === '#003F53') return '#003F53'
    if (colorStr === 'white') return '$color1'
    return '$color10'
  }
  // For React Native, we'll use 3 concentric circles: 2 rings + 1 solid center
  if (Platform.OS !== 'web') {
    const borderWidth = Math.max(2, size * 0.08) // Proportional border width
    
    return (
      <View 
        width={size} 
        height={size} 
        borderRadius={size / 2}
        bg={getColorToken(color)}
        alignItems="center"
        justifyContent="center"
      >
        <View 
          width={size * 0.8} 
          height={size * 0.8} 
          borderRadius={(size * 0.8) / 2}
          borderWidth={borderWidth}
          borderColor="$color1"
          alignItems="center"
          justifyContent="center"
        >
          <View 
            width={size * 0.6} 
            height={size * 0.6} 
            borderRadius={(size * 0.6) / 2}
            borderWidth={borderWidth}
            borderColor="$color1"
            alignItems="center"
            justifyContent="center"
          >
            <View 
              width={size * 0.4} 
              height={size * 0.4} 
              borderRadius={(size * 0.4) / 2}
              bg="$color1"
            />
          </View>
        </View>
      </View>
    )
  }

  // For web, we can use the SVG
  return (
    <View width={size} height={size}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 26 26" 
        fill="none"
      >
        <path 
          d="M12.9766 0C20.4975 0.000216628 26.001 5.46723 26.001 13C26.001 20.5328 20.5236 25.9998 12.9766 26C5.45542 26 4.926e-08 20.5329 0 13C0 5.46708 5.45542 0 12.9766 0ZM12.9766 1.82617C6.42312 1.82617 1.8457 6.41884 1.8457 13C1.8457 19.4742 6.52774 24.1738 12.9766 24.1738C19.5561 24.1738 24.1553 19.5811 24.1553 13C24.1553 6.41889 19.5561 1.82624 12.9766 1.82617ZM12.9756 4.70312C17.7767 4.70312 21.3008 8.20431 21.3008 13C21.3008 17.7957 17.8032 21.2969 12.9834 21.2969H12.9756C8.17461 21.2967 4.68848 17.8067 4.68848 13C4.68848 8.19335 8.17461 4.70327 12.9756 4.70312ZM12.9766 6.54102C9.18427 6.54102 6.53521 9.20398 6.53516 13.0146C6.53516 16.8254 9.18423 19.4893 12.9766 19.4893C16.7687 19.4891 19.4736 16.8106 19.4736 13C19.4736 9.18927 16.7944 6.52539 12.9834 6.52539L12.9766 6.54102ZM11.1865 9.91992C12.3008 9.28479 13.6738 9.28489 14.7881 9.91992C15.9025 10.5552 16.5889 11.7295 16.5889 13C16.6144 13.9527 16.2457 14.8746 15.5674 15.5527C14.8891 16.2307 13.9602 16.6061 12.9951 16.5928L12.9766 16.6074C12.0088 16.6221 11.0769 16.2451 10.3984 15.5635C9.72 14.8818 9.35394 13.9552 9.38574 13C9.38574 11.7295 10.0721 10.5552 11.1865 9.91992ZM12.9766 11.2441C12.2484 11.2307 11.5842 11.6532 11.2959 12.3135C11.0077 12.9739 11.152 13.7416 11.6621 14.2549C12.1723 14.7682 12.9468 14.9253 13.6211 14.6533C14.2952 14.3812 14.7362 13.7337 14.7363 13.0146C14.7741 12.5424 14.6052 12.0766 14.2725 11.7354C13.9397 11.3941 13.4745 11.2102 12.9951 11.2295L12.9766 11.2441Z" 
          fill={color}
        />
      </svg>
    </View>
  )
} 