import { Stack } from 'expo-router'
import { StormImpactScreen } from '../../../packages/app/features/storm-impact/screen'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Storm Impact',
        }}
      />
      <StormImpactScreen />
    </>
  )
} 