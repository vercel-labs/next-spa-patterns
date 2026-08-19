'use server'

import { todosReducer, type Todo, type TodoAction } from './todos-reducer'

export async function saveTodos(
  todos: Todo[],
  action: TodoAction,
): Promise<Todo[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return todosReducer(todos, action)
}
