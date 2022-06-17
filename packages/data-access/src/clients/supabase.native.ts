import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kwylnsbvcfjgxsiempor.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3eWxuc2J2Y2ZqZ3hzaWVtcG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ3ODA4OTAsImV4cCI6MTk3MDM1Njg5MH0.htZskdABGGor4v17XyF05rmoGKAVRJxqZ5AgS13tEms'

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});