import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
// @ts-ignore
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env'

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});