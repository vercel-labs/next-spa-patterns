'use client'

import { lazy } from 'react'

const editorModule = import('./browser-only-editor')
const editorModuleForDemo =
  typeof window === 'undefined'
    ? editorModule
    : Promise.all([
        editorModule,
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]).then(([module]) => module)

const BrowserOnlyEditor = lazy(() => editorModuleForDemo)

export default function BrowserOnlyEditorDemo() {
  return <BrowserOnlyEditor />
}
