'use server'

export type Todo = { id: string; text: string }

export type TodoAction =
  | { type: 'add'; id: string; text: string }
  | { type: 'edit'; id: string; text: string }
  | { type: 'delete'; id: string }

export async function todosReducer(
  todos: Todo[],
  action: TodoAction
): Promise<Todo[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))

  switch (action.type) {
    case 'add':
      return [...todos, { id: action.id, text: action.text }]
    case 'edit':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      )
    case 'delete':
      return todos.filter((todo) => todo.id !== action.id)
  }
}
