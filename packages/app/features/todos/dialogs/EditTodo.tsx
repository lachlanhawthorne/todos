import { X } from '@tamagui/feather-icons'
import React, { useState } from 'react'
import { Button, Dialog, Fieldset, Input, Label, Unspaced, YStack } from 'tamagui'
import { useSetAtom } from 'jotai'
import { getUser, updateTodoAtom } from 'data-access'

export default function EditTodoDialog({ children, todoId, todoTask }: { children: React.ReactNode, todoId: number, todoTask: string }) {
  const user = getUser()
  const updateTodo = useSetAtom(updateTodoAtom);

  const [task, setTask] = useState('')
  
  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal px="$4"> 
        <Dialog.Overlay key="overlay" o={0.5} />
        <Dialog.Content
          bordered
          elevate
          key="content"
          space
          // not yet working on native
          // animation={[
          //   'quick',
          //   {
          //     opacity: {
          //       overshootClamping: true,
          //     },
          //   },
          // ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
          w="100%"
          maxWidth={400}
        >
          <Dialog.Title>Edit todo</Dialog.Title>

          <YStack h="$6">
            <Input 
              f={1} 
              id="task" 
              defaultValue={todoTask}
              onChangeText={text => setTask(text)} 
            />
          </YStack>

          <YStack ai="flex-end" mt="$2">
            <Dialog.Close asChild>
              <Button theme="alt1" aria-label="Close" onPress={() => updateTodo({
                id: todoId,
                user_id: user?.id as string,
                task,
              })}>
                Update todo
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