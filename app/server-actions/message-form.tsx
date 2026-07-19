'use client'

import { useActionState } from 'react'
import { addMessage, type State } from './actions'

const initialState: State = { messages: [] }

export function MessageForm() {
  // Calls the Server Action directly — no API route. useActionState gives the
  // returned state and a pending flag for loading UI.
  const [state, formAction, pending] = useActionState(addMessage, initialState)

  return (
    <div>
      <form action={formAction} className="row">
        <input
          name="message"
          placeholder="Add a message"
          aria-label="Message"
        />
        <button disabled={pending}>{pending ? 'Adding…' : 'Add'}</button>
      </form>
      {state.error ? <p className="muted">{state.error}</p> : null}
      <ul className="pattern-list">
        {state.messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  )
}
