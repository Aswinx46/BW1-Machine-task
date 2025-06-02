import type { RootState } from '@/store/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.user.user)
  return user ? children : <Navigate to={'/login'} />
}

export default ProtectedRoute
