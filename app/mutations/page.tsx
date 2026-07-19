import { TodoApp } from "./todo-app";

export default function MutationsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Mutations</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        A to-do list with add, toggle, edit, and delete. A Server Action runs as
        an async reducer via <code>useActionState</code>, and{" "}
        <code>useOptimistic</code> applies each change immediately, so the UI
        never blocks. Each change still round-trips to a real Server Action
        (simulated latency, no database), shown by the subtle{" "}
        <code>Syncing to server…</code> indicator from{" "}
        <code>useActionState</code>&rsquo;s pending flag.
      </p>
      <div className="mt-8">
        <TodoApp />
      </div>
    </>
  );
}
