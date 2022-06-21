import { atom } from 'jotai';
import { supabaseClient } from '../../clients/supabase';
import { addTodo, updateTodo, toggleTodo, removeTodo } from './crud';

import type { definitions } from '../../types/supabase';
export type Todo = definitions["todos"];

export const newTodoAtom = atom<string>("")
export const todosAtom = atom<Todo[]>([])

export const addTodoAtom = atom(
  () => "",  (
    get, set, 
    { user_id }: { user_id: string }
  ) => {

    const created = supabaseClient
      .from<Todo>("todos")
      .insert({ user_id, task: get(newTodoAtom) })
      .then((res) => {
        if(res?.data) {
          const resTodo = res.data[0]
          set(todosAtom, addTodo(get(todosAtom), resTodo))
          set(newTodoAtom, "")
        }
      })
  }
)

export const updateTodoAtom = atom(
  () => "", (
    get, set, 
    { user_id, id, task } : { user_id: string, id: number, task: string }
  ) => {

    const updated = supabaseClient
      .from<Todo>("todos")
      .update({ task })
      .match({ user_id, id })
      .then(res => {
        if(res?.data) {
          const { task } = res.data[0]
          set(todosAtom, updateTodo(get(todosAtom), id, task as string))
        }
      })
  }
)

export const toggleTodoAtom = atom(
  () => "", (
    get, set, 
    { user_id, id } : { user_id: string, id: number }
  ) => {

    const isCompleteVal = !get(todosAtom).find(todo => todo.id === id)?.is_complete
    
    const toggled = supabaseClient
      .from<Todo>("todos")
      .update({ is_complete: isCompleteVal })
      .match({ user_id, id })
      .then(res => {
        if(res?.data) {
          set(todosAtom, toggleTodo(get(todosAtom), id ))
        }
      })
  }
)

export const removeTodoAtom = atom(
  () => "", (
    get, set, 
    { user_id, id } : { user_id: string, id: number }
  ) => {
    const delted = supabaseClient
      .from<Todo>("todos")
      .delete()
      .match({ user_id, id })
      .then((res) => {
        if(res?.data) {
          set(todosAtom, removeTodo(get(todosAtom), id))
        }
      })
  }
)

// Supabase Realtime
todosAtom.onMount = setTodos => {
  // initial data for native
  supabaseClient
    .from<Todo>("todos")
    .select()
    .then((res) => {
      res?.data && setTodos(prevTodos => 
        prevTodos.length == 0 
          ? [...prevTodos, ...res.data] 
          : prevTodos
      )
    })
    
  // subscribe to realtime db changes
  const realtimeSubscription = supabaseClient
    .from<Todo>("todos")
    .on('*', payload => {
      switch(payload.eventType) {
        case 'INSERT':
        case 'UPDATE':
          const newTodo = payload.new;
          let newTodos;

          setTodos(prevTodos => {
            const exists = prevTodos.find((todo) => todo.id === newTodo.id);

            if (exists) {
              // update
              const oldTodoIndex = prevTodos.findIndex(
                (obj) => obj.id === newTodo.id
              );

              newTodos = [
                ...prevTodos.slice(0, oldTodoIndex),
                newTodo,
                ...prevTodos.slice(oldTodoIndex + 1),
              ];

            } else {
              // create
              newTodos = [...prevTodos, newTodo];
            }
            
            return newTodos;
          })
          
          break;
        case 'DELETE':
          setTodos(prevTodos => 
            prevTodos.filter(todo => todo.id !== payload.old.id)
          );
          break;
        default:
          break;
      } 
    })
    .subscribe()

    return () => realtimeSubscription.unsubscribe()
}