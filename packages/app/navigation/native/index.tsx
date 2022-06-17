import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '../../features/home/screen'
import { UserScreen } from '../../features/user/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'

const Stack = createNativeStackNavigator<{
  home: undefined
  'user-detail': { id: string }
  'user': undefined
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="user"
        component={UserScreen}
        options={{
          title: 'User',
        }}
      />
      <Stack.Screen
        name="user-detail"
        component={UserDetailScreen}
        options={{
          title: 'User',
        }}
      />
    </Stack.Navigator>
  )
}
