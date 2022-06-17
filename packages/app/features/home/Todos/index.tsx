import { useEffect, useState } from 'react';
import { supabaseClient, definitions, getUser } from 'data-access';
import { YStack, XStack, Paragraph, Button } from '@my/ui';

import { useAtom, useSetAtom } from 'jotai'
import { todosAtom, addTodoAtom } from 'data-access';
import NewTodoDialog from './dialog/NewTodo';

import type { Todo } from 'data-access';
import TodoItem from './TodoItem';


export default function Todos({ ssrTodos }: { ssrTodos?: Todo[] }) {
  const [ ssrTodosData, setSsrTodosData ] = useState<Todo[] | null>(ssrTodos || []);
  const [ atomTodos ] = useAtom(todosAtom);

  useEffect(() => {
    // reset ssrTodos once we have atomTodos
    if(ssrTodosData && atomTodos.length) setSsrTodosData(null)
  }, [atomTodos]);

  const todos = ssrTodosData || atomTodos;

  return (
    <>
      <YStack mb="$6">
        {todos && todos.map(todo => 
          <TodoItem
            data={todo} 
            key={todo.id} 
          />
        )}
        <NewTodoDialog />
      </YStack>
    </>
  )
} 