// on Web, we don't use React Navigation, so we avoid the provider altogether
// instead, we just have a no-op here
// for more, see: https://solito.dev/recipes/tree-shaking

import { UserProvider } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from 'data-access'


export const NavigationProvider = ({ children }: { children: React.ReactNode }) => (
  <UserProvider supabaseClient={supabaseClient}>
    {children}
  </UserProvider>
)
