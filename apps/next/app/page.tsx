'use client'

import { HomeScreen } from 'app/features/home/screen'
import { ProtectedRoute } from 'app/features/auth/protected-route'

export default function Page() {
  return (
    <ProtectedRoute>
      <HomeScreen />
    </ProtectedRoute>
  )
}
