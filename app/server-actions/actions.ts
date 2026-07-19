'use server'

export type State = { messages: string[]; error?: string }

// In-memory store for the demo. In a real app this would be a database.
const messages: string[] = []

export async function addMessage(
  _prevState: State,
  formData: FormData
): Promise<State> {
  const text = String(formData.get('message') ?? '').trim()

  // Simulate a round-trip so the pending state is visible.
  await new Promise((resolve) => setTimeout(resolve, 700))

  if (!text) {
    return { messages: [...messages], error: 'Message cannot be empty.' }
  }

  messages.push(text)
  return { messages: [...messages] }
}
