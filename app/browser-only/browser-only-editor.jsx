'use client'

import { use, useState } from 'react'
import { browser } from 'react-dom'

const storageKey = 'next-spa-patterns-draft'

export default function BrowserOnlyEditor() {
  use(browser('The saved draft is stored in localStorage.'))

  const [draft, setDraft] = useState(
    () => localStorage.getItem(storageKey) ?? '',
  )

  function handleChange(event) {
    const nextDraft = event.target.value
    setDraft(nextDraft)
    localStorage.setItem(storageKey, nextDraft)
  }

  return (
    <label className="block rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
      <span className="font-semibold">Saved draft</span>
      <textarea
        className="mt-3 block min-h-32 w-full resize-y rounded-md border border-zinc-300 bg-transparent p-3 dark:border-zinc-700"
        value={draft}
        onChange={handleChange}
        placeholder="Write something, then reload the page."
      />
      <span className="mt-2 block text-sm text-zinc-500 dark:text-zinc-400">
        This draft is stored in your browser.
      </span>
    </label>
  )
}
