import React from 'react'
import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'

// Supabase ==

// Fix URLSearchParms not implemented error
// https://github.com/facebook/react-native/issues/23922#issuecomment-648096619
import 'react-native-url-polyfill/auto';

import { UserProvider } from 'data-access/src/contexts/user'

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/ttf/Inter.ttf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <Provider>
      <UserProvider>
        <NativeNavigation />
      </UserProvider>
    </Provider>
  )
}
