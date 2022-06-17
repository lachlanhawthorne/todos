import type { definitions } from '../../types/supabase';
export type Todo = definitions["todos"];

// create
// needs to be the full object to create
export const addTodo = (
  todos: Todo[], user_id: string, task: string
): any[] => [
  ...todos, {
    user_id,
    task,
    is_complete: false,
  }
]

// update
export const updateTodo = ( 
  todos: Todo[], id: number, task: string, is_complete?: boolean
): Todo[] => 
  todos.map(todo => ({
    ...todo,
    task: todo.id === id ? task : todo.task
  }));

export const toggleTodo = (
  todos: Todo[], id: number
): Todo[] => 
  todos.map(todo => ({
    ...todo,
    is_complete: todo.id === id ? !todo.is_complete : todo.is_complete
  }));

// delete
export const removeTodo = (
  todos: Todo[], id: number
): Todo[] =>
  todos.filter((todo) => todo.id !== id);

