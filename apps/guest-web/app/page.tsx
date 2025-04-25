// apps/guest-web/app/page.tsx     (or pages/index.tsx if you’re still on the pages/ dir)
'use client'

import { useEffect, useState } from 'react'

type MenuItem = { id: string; name: string; priceCents: number }

// 👇 replace ONLY this string with *your* port-3001 URL
const API = 'https://opulent-space-barnacle-4j69rxrjqqpgcq9rw-3001.app.github.dev'

export default function Home() {
  const [menu,  setMenu]  = useState<MenuItem[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${API}/menu`)
      .then(r => r.json())
      .then(setMenu)
      .catch(e => setError(String(e)))
  }, [])

  if (error)        return <p style={{color:'red'}}>Error: {error}</p>
  if (!menu.length) return <p>Loading…</p>

  return (
    <main style={{padding:24,fontFamily:'sans-serif'}}>
      <h1>Five-O-Four Menu</h1>
      <ul>
        {menu.map(m => (
          <li key={m.id}>{`${m.name} — $${(m.priceCents/100).toFixed(2)}`}</li>
        ))}
      </ul>
    </main>
  )
}
