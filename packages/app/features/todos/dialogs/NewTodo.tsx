import { X, Plus } from '@tamagui/feather-icons'
import { getUser, Todo } from 'data-access'
import React, { useEffect } from 'react'
import { Button, Dialog, Paragraph, Input, Unspaced, YStack } from 'tamagui'
import { useAtom, useSetAtom } from 'jotai'
import { newTodoAtom, addTodoAtom } from 'data-access'

export default function NewTodoDialog() {
  const user = getUser()
  const [newTodo, setNewTodo] = useAtom(newTodoAtom);
  const addTodo = useSetAtom(addTodoAtom);

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button icon={Plus}>New Todo</Button>
      </Dialog.Trigger>
      <Dialog.Portal px="$4">
        <Dialog.Overlay key="overlay" o={0.5} />
        <Dialog.Content
          bordered
          elevate
          key="content"
          space
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
          w="100%"
          maxWidth={400}
        >
          <Dialog.Title>New Todo</Dialog.Title>

          <YStack h="$6">
            <Input 
              f={1} 
              id="task" 
              placeholder="Write a list of things to look forward to" 
              onChangeText={(text) => setNewTodo(text)}
            />
          </YStack>
            
          <YStack ai="flex-end" mt="$2">
            <Dialog.Close asChild  >
              <Button theme="alt1" aria-label="Close" onPress={(e) =>{
                addTodo({ user_id: user?.id as string })
                setNewTodo("")
              }}>
                Create todo 
              </Button>
            </Dialog.Close>
          </YStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button pos="absolute" t="$4" r="$4" circular icon={X} />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}