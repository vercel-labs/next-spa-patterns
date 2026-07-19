import { TodoApp } from "./todo-app";

export default function MutationsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Mutations</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        A to-do list backed by a Server Action running as an async reducer via{" "}
        <code>useActionState</code>. <code>useOptimistic</code> applies each
        change instantly, with a subtle <code>Syncing to server…</code>{" "}
        indicator while the request is in flight.
      </p>
      <div className="mt-8">
        <TodoApp />
      </div>
    </>
  );
}
