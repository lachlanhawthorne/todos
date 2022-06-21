import React from 'react'
import { Button, H1, Paragraph, Separator, XStack, YStack } from '@my/ui'
import { definitions, getUser, getServerUser, supabaseServerClient } from 'data-access'
import { useLink } from 'solito/link'
import { User, LogIn } from '@tamagui/feather-icons'

import type { GetServerSidePropsContext } from 'next'

import TodoList from './TodoList'

export function TodosScreen({ ssrTodos }: { ssrTodos: definitions["todos"][] }) {
  const user = getUser()
  
  const linkProps = useLink({
    href: '/user',
  })
  
  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600} w="100%">
        <H1 ta="center">Todos App</H1>
        <Paragraph ta="center">
          Tamagui, Next.js, Expo, Solito &amp; Supabase
        </Paragraph>
        <Separator />
        <YStack minHeight={200} jc="center">
          {
            user
              ? (
                <TodoList ssrTodos={ssrTodos} />
              )
              : (
                <Paragraph ta="center" color="$gray9Dark">
                  Sign in or register to create todos.
                </Paragraph>
              )
          }
        </YStack>
        <Separator />
      </YStack>

      <XStack>
        <Button
          icon={user ? User : LogIn}
          {...linkProps}
        >
          {user ? 'Account Settings' : 'Sign in'}
        </Button>
      </XStack>
    </YStack>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { accessToken } = await getServerUser(context)

  accessToken && supabaseServerClient(context).auth.setAuth(accessToken)
  supabaseServerClient(context).auth.refreshSession()

  const todos = await supabaseServerClient(context)
    .from<definitions['todos']>('todos')
    .select()
  
  return { props: { ssrTodos: todos?.data ?? null } }
}
