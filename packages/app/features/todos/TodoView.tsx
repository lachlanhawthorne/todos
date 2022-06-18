import { XStack, Button, Paragraph, Separator } from '@my/ui';
import { Todo, removeTodoAtom, toggleTodoAtom, getUser } from 'data-access';

import { Check, Trash } from '@tamagui/feather-icons'
import { useSetAtom } from 'jotai';

import EditTodoDialog from './dialogs/EditTodo';

export default function TodoView({ data } : { data: Todo }) {
  const user = getUser()
  
  const removeTodo = useSetAtom(removeTodoAtom);
  const toggleTodo = useSetAtom(toggleTodoAtom);

  return (
    <>
      <XStack
        ai="flex-start"
        jc="flex-start"
        my="$4"
      >
        <Button
          h="$2" w="$2" mr="$4" mt="$2" p={0} 
          borderRadius="$2" borderWidth={2} borderColor={'#ccc'}
          backgroundColor={'transparent'} color={data.is_complete ? '#000' : '#ccc'} 
          onPress={() => toggleTodo({ id: data?.id, user_id: user?.id as string })}
        >
          {data.is_complete 
            ? <Check 
              color={data.is_complete ? '#fff' : 'transparent'} 
              size={23}
            /> 
            : <></>
          }
        </Button>

        <EditTodoDialog todoId={data?.id} todoTask={data?.task || ''}>
          <Paragraph size="$8" mr="$4" mb="$4" flex={1}>
            {data.task}
          </Paragraph>
        </EditTodoDialog>

        <Button 
          h="$4" w="$4" p={0} backgroundColor="transparent"
          onPress={() => removeTodo({ id: data?.id, user_id: user?.id as string })}
        >
          <Trash size={22} color="gray" />
        </Button> 
      </XStack>

      <Separator />
    </>
  )
}
