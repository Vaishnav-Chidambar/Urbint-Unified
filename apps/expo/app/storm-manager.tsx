import { Stack } from 'expo-router'
import { StormManagerScreen } from '../../../packages/app/features/storm-manager/screen'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Storm Manager',
        }}
      />
      <StormManagerScreen />
    </>
  )
} 