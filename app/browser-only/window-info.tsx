'use client'

import { useEffect, useState } from 'react'

// Reads `window` directly. Safe because this module is only loaded in the
// browser (see loader.tsx, which imports it with ssr: false).
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
    <div className="card">
      <div>
        Viewport: <strong>{size.width}</strong> ×{' '}
        <strong>{size.height}</strong>
      </div>
      <div className="muted">Resize the window — this updates live.</div>
    </div>
  )
}
