'use client'

import { useActionState } from 'react'
import { addMessage, type State } from './actions'

const initialState: State = { messages: [] }

export function MessageForm() {
  // Calls the Server Action directly, with no API route. useActionState gives
  // the returned state and a pending flag for loading UI.
  const [state, formAction, pending] = useActionState(addMessage, initialState)

  return (
    <div>
      <form action={formAction} className="flex flex-wrap gap-2">
        <input
          name="message"
          placeholder="Add a message"
          aria-label="Message"
          className="rounded border border-zinc-300 bg-transparent px-3 py-1.5 text-sm dark:border-zinc-700"
        />
        <button
          disabled={pending}
          className="rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 disabled:opacity-40 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          {pending ? 'Adding…' : 'Add'}
        </button>
      </form>
      {state.error ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      ) : null}
      <ul className="mt-4 grid gap-2">
        {state.messages.map((message, index) => (
          <li
            key={index}
            className="rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-800"
          >
            {message}
          </li>
        ))}
      </ul>
    </div>
  )
}
