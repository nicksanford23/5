import { useEffect, useState } from 'react';

type MenuItem = { id:string; name:string; priceCents:number };

export default function Home() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/menu')
      .then(r => r.json())
      .then(setMenu)
      .catch(e => setError(String(e)));
  }, []);

  if (error) return <p style={{color:'red'}}>Error: {error}</p>;
  if (menu.length===0) return <p>Loading…</p>;

  return (
    <main style={{padding:24,fontFamily:'sans-serif'}}>
      <h1>Five-O-Four Menu</h1>
      <ul>
        {menu.map(m => (
          <li key={m.id}>
            {m.name} — ${(m.priceCents/100).toFixed(2)}
          </li>
        ))}
      </ul>
    </main>
  );
}
