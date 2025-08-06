import React from 'react'
import { LoadingAnimation } from '@my/ui'

interface LoadingScreenProps {
  text?: string
  size?: number
  color?: string
}

export function LoadingScreen({ 
  text = "Loading Urbint Platform...", 
  size = 140,
  color = "#003F53"
}: LoadingScreenProps) {
  return (
    <LoadingAnimation 
      text={text}
      size={size}
      color={color}
    />
  )
} 