import { Stack } from 'expo-router'
import { LoadingScreen } from '../../../packages/app/features/loading/screen'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Loading Demo',
        }}
      />
      <LoadingScreen text="Loading Urbint Platform..." />
    </>
  )
} 