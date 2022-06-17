import { useContext } from 'react'
import { UserContext } from './contexts/user'

export function getUser() {
  const { user } = useContext(UserContext) || {}
  return user
}

export * from './clients/supabase'
export * from './types/supabase'
export * from './store'