import { MessageForm } from './message-form'

export default function ServerActionsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Server Actions in Client Components
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        The form calls a Server Action directly, with no API route to write or
        fetch. <code>useActionState</code> handles the returned state and the
        pending flag for loading UI.
      </p>
      <div className="mt-8">
        <MessageForm />
      </div>
    </>
  )
}
