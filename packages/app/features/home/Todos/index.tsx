import { useEffect, useState } from 'react';
import { supabaseClient, definitions, getUser } from 'data-access';
import { YStack, XStack, Paragraph, Button } from '@my/ui';

import { useAtom, useSetAtom } from 'jotai'
import { todosAtom, addTodoAtom } from 'data-access';
import NewTodoDialog from './dialog/NewTodo';

import type { Todo } from 'data-access';
import TodoItem from './TodoItem';


export default function Todos({ ssrTodos }: { ssrTodos?: Todo[] }) {
  const user = getUser()

  const [ atomTodos ] = useAtom(todosAtom);
  const todos = user ? (atomTodos || ssrTodos) : []

  useEffect(() => console.log(todos), [todos])

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