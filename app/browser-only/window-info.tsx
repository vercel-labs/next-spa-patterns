'use client'

import { useEffect, useState } from 'react'

// Safe to read window: this module only loads in the browser (ssr: false).
export default function WindowInfo() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const onResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
      <div>
        Viewport: <span className="font-semibold">{size.width}</span> ×{' '}
        <span className="font-semibold">{size.height}</span>
      </div>
      <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Resize the window to see this update live.
      </div>
    </div>
  )
}
