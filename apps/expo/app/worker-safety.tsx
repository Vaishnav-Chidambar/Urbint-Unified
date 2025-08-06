import { WorkerSafetyScreen } from 'app/features/worker-safety/screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Worker Safety',
        }}
      />
      <WorkerSafetyScreen />
    </>
  )
} 