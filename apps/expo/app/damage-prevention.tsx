import { Stack } from 'expo-router'
import { DamagePreventionScreen } from '../../../packages/app/features/damage-prevention/screen'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Damage Prevention',
        }}
      />
      <DamagePreventionScreen />
    </>
  )
} 