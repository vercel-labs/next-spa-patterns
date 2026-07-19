import { MessageForm } from './message-form'

export default function ServerActionsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Server Actions in Client Components
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Call a Server Action from a Client Component. <code>useActionState</code>{' '}
        gives the returned state and a pending flag.
      </p>
      <div className="mt-8">
        <MessageForm />
      </div>
    </>
  )
}
