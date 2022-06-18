import type { definitions } from '../../types/supabase';
export type Todo = definitions["todos"];

// create
export const addTodo = (
  todos: Todo[], todo: Todo
): any[] => [
  ...todos,
  todo
]

// update
export const updateTodo = ( 
  todos: Todo[], id: number, task: string
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