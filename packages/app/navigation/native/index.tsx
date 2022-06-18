import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { TodosScreen } from '../../features/todos/screen'
import { UserScreen } from '../../features/user/screen'

const Stack = createNativeStackNavigator<{
  todos: undefined
  'user': undefined
}>()

export function NativeNavigation() {
  return (
    // @ts-ignore
    <Stack.Navigator>
      <Stack.Screen
        name="todos"
        component={TodosScreen}
        options={{
          title: 'Todos',
        }}
      />
      <Stack.Screen
        name="user"
        component={UserScreen}
        options={{
          title: 'User',
        }}
      />
    </Stack.Navigator>
  )
}
