import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { useMemo } from 'react'

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NavigationContainer
      theme={DarkTheme}
      linking={useMemo(
        () => ({
          prefixes: [Linking.createURL('/')],
          config: {
            initialRouteName: 'todos',
            screens: {
              todos: '',
              'user': 'user',
            },
          },
        }),
        []
      )}
    >
      {children}
    </NavigationContainer>
  )
}
