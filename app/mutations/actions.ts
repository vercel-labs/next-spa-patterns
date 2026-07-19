'use server'

export type Todo = { id: string; text: string; done: boolean }

export type TodoAction =
  | { type: 'add'; id: string; text: string }
  | { type: 'toggle'; id: string }
  | { type: 'edit'; id: string; text: string }
  | { type: 'delete'; id: string }

export async function todosReducer(
  todos: Todo[],
  action: TodoAction
): Promise<Todo[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))

  switch (action.type) {
    case 'add':
      return [...todos, { id: action.id, text: action.text, done: false }]
    case 'toggle':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      )
    case 'edit':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      )
    case 'delete':
      return todos.filter((todo) => todo.id !== action.id)
  }
}
