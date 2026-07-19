'use client'

import { useActionState, useOptimistic, useState, useTransition } from 'react'
import { todosReducer, type Todo, type TodoAction } from './actions'

const initialTodos: Todo[] = []

const inputClass =
  'rounded border border-zinc-300 bg-transparent px-3 py-1.5 text-sm dark:border-zinc-700'
const buttonClass =
  'rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 disabled:opacity-40 dark:border-zinc-700 dark:hover:bg-zinc-900'
const smallButtonClass =
  'rounded border border-zinc-300 px-2 py-1 text-xs hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900'

function applyOptimistic(todos: Todo[], action: TodoAction): Todo[] {
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

export function TodoApp() {
  const [todos, dispatch] = useActionState(todosReducer, initialTodos)
  const [optimisticTodos, addOptimistic] = useOptimistic(todos, applyOptimistic)
  const [, startTransition] = useTransition()

  function act(action: TodoAction) {
    startTransition(() => {
      addOptimistic(action)
      dispatch(action)
    })
  }

  return (
    <div>
      <AddTodo
        onAdd={(text) => act({ type: 'add', id: crypto.randomUUID(), text })}
      />
      <ul className="mt-4 grid gap-2">
        {optimisticTodos.map((todo) => (
          <TodoRow
            key={todo.id}
            todo={todo}
            onToggle={() => act({ type: 'toggle', id: todo.id })}
            onEdit={(text) => act({ type: 'edit', id: todo.id, text })}
            onDelete={() => act({ type: 'delete', id: todo.id })}
          />
        ))}
      </ul>
    </div>
  )
}

function AddTodo({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState('')

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        const trimmed = text.trim()
        if (!trimmed) return
        onAdd(trimmed)
        setText('')
      }}
      className="flex flex-wrap gap-2"
    >
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Add a to-do"
        aria-label="New to-do"
        className={inputClass}
      />
      <button className={buttonClass}>Add</button>
    </form>
  )
}

function TodoRow({
  todo,
  onToggle,
  onEdit,
  onDelete,
}: {
  todo: Todo
  onToggle: () => void
  onEdit: (text: string) => void
  onDelete: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(todo.text)

  if (editing) {
    return (
      <li className="rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            const trimmed = text.trim()
            if (!trimmed) return
            onEdit(trimmed)
            setEditing(false)
          }}
          className="flex flex-wrap gap-2"
        >
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            aria-label="Edit to-do"
            autoFocus
            className={`flex-1 ${inputClass}`}
          />
          <button className={buttonClass}>Save</button>
          <button
            type="button"
            onClick={() => {
              setText(todo.text)
              setEditing(false)
            }}
            className={buttonClass}
          >
            Cancel
          </button>
        </form>
      </li>
    )
  }

  return (
    <li
      className={`fade-in-up flex items-center gap-3 rounded-lg border border-zinc-200 px-4 py-3 transition-opacity duration-300 dark:border-zinc-800 ${
        todo.done ? 'opacity-60' : ''
      }`}
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={onToggle}
        aria-label={todo.done ? `Mark "${todo.text}" as not done` : `Mark "${todo.text}" as done`}
        className="h-4 w-4 accent-zinc-900 dark:accent-zinc-100"
      />
      <span
        className={`flex-1 transition-colors duration-300 ${
          todo.done ? 'text-zinc-400 line-through dark:text-zinc-600' : ''
        }`}
      >
        {todo.text}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => {
            setText(todo.text)
            setEditing(true)
          }}
          className={smallButtonClass}
        >
          Edit
        </button>
        <button onClick={onDelete} className={smallButtonClass}>
          Delete
        </button>
      </div>
    </li>
  )
}
