"use server";

import { applyAction, type Todo, type TodoAction } from "./reducer";

export async function todosReducer(
  todos: Todo[],
  action: TodoAction,
): Promise<Todo[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return applyAction(todos, action);
}
