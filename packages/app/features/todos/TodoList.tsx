import { useEffect, useState } from 'react';
import { YStack } from '@my/ui';
import { useAtom } from 'jotai'
import { todosAtom } from 'data-access';

import NewTodoDialog from './dialogs/NewTodo';
import TodoView from './TodoView';

import type { Todo } from 'data-access';

export default function TodoList({ ssrTodos }: { ssrTodos?: Todo[] }) {
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
          <TodoView
            data={todo} 
            key={todo.id} 
          />
        )}
        <NewTodoDialog />
      </YStack>
    </>
  )
} 