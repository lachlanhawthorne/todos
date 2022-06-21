import { useEffect, useState } from 'react';
import { YStack } from '@my/ui';
import { useAtom } from 'jotai'
import { todosAtom } from 'data-access';

import NewTodoDialog from './dialogs/NewTodo';
import TodoView from './TodoView';

import type { Todo } from 'data-access';

export default function TodoList({ ssrTodos }: { ssrTodos?: Todo[] }) {
  const [ ssrTodosData, setSsrTodosData ] = useState<Todo[] | null>(ssrTodos || null);
  const [ atomTodos, setAtomTodos ] = useAtom(todosAtom);

  useEffect(() => { 
    if(ssrTodosData 
      && ssrTodosData?.length >= 1
    ) setAtomTodos(ssrTodosData) 
  }, []);

  useEffect(() => {
    if(ssrTodosData 
      && ssrTodosData.length >= 1 
      && atomTodos.length >= 1 
    ) setSsrTodosData([])
  }, [atomTodos]);

  const todos = (
    ssrTodosData && ssrTodosData.length >=1 
      ? ssrTodosData 
      : null
  ) || (
    atomTodos.length >= 1 
      ? atomTodos 
      : null
  );

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