import { HomeScreen } from 'app/features/home/screen'
import { ProtectedRoute } from 'app/features/auth/protected-route'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
        }}
      />
      <ProtectedRoute>
        <HomeScreen />
      </ProtectedRoute>
    </>
  )
}
