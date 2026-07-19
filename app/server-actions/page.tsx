import { MessageForm } from './message-form'

export default function ServerActionsPage() {
  return (
    <main>
      <h1>Server Actions in Client Components</h1>
      <p className="muted">
        The form calls a Server Action directly — no API route to write or fetch.{' '}
        <code>useActionState</code> handles the returned state and the pending
        flag for loading UI.
      </p>
      <MessageForm />
    </main>
  )
}
