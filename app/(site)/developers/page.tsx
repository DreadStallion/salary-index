'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

const ENDPOINTS = [
  { method: 'POST', path: '/v1/keys', auth: false, desc: 'Create a free API key', body: '{ "email": "you@company.com" }' },
  { method: 'GET',  path: '/v1/salary?role=software-engineer&city=san-francisco', auth: true,  desc: 'Get salary for a role + city' },
  { method: 'GET',  path: '/v1/salary?role=software-engineer', auth: true, desc: 'Get salary across all 30 cities' },
  { method: 'GET',  path: '/v1/roles', auth: true, desc: 'List all 113 roles' },
  { method: 'GET',  path: '/v1/cities', auth: true, desc: 'List all 30 cities' },
  { method: 'GET',  path: '/v1/category?category=tech', auth: true, desc: 'Roles by category' },
  { method: 'GET',  path: '/v1/usage', auth: true, desc: 'Check your usage and plan' },
]

const PLANS = [
  { name: 'Free', price: '$0', limit: '100 req / month', color: 'var(--border)', highlight: false },
  { name: 'Starter', price: '$29/mo', limit: '5,000 req / month', color: 'var(--gold)', highlight: false },
  { name: 'Pro', price: '$99/mo', limit: '50,000 req / month', color: 'var(--navy)', highlight: true },
  { name: 'Enterprise', price: '$499/mo', limit: 'Unlimited', color: '#1a6640', highlight: false },
]

const EXAMPLE_RESPONSE = `{
  "role": "Software Engineer",
  "role_slug": "software-engineer",
  "city": "San Francisco",
  "city_slug": "san-francisco",
  "state": "CA",
  "median": 188500,
  "p25": 142100,
  "p75": 239250,
  "p90": 304500,
  "yoy_change": 3.2,
  "category": "tech",
  "source": "BLS OES 2025",
  "updated": "May 2026"
}`

export default function DevelopersPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [apiKey, setApiKey] = useState('')
  const [copied, setCopied] = useState(false)
  const [copiedSnippet, setCopiedSnippet] = useState('')

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('https://api.ussalaryindex.com/v1/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.api_key) {
        setApiKey(data.api_key)
        setStatus('done')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  function copyKey() {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function copySnippet(id: string, text: string) {
    navigator.clipboard.writeText(text)
    setCopiedSnippet(id)
    setTimeout(() => setCopiedSnippet(''), 2000)
  }

  const curlExample = `curl "https://api.ussalaryindex.com/v1/salary?role=software-engineer&city=san-francisco" \\
  -H "X-API-Key: YOUR_KEY"`

  const jsExample = `const res = await fetch(
  'https://api.ussalaryindex.com/v1/salary?role=software-engineer&city=san-francisco',
  { headers: { 'X-API-Key': 'YOUR_KEY' } }
)
const data = await res.json()
console.log(data.median) // 188500`

  const pyExample = `import requests

r = requests.get(
    'https://api.ussalaryindex.com/v1/salary',
    params={'role': 'software-engineer', 'city': 'san-francisco'},
    headers={'X-API-Key': 'YOUR_KEY'}
)
print(r.json()['median'])  # 188500`

  const box: React.CSSProperties = {
    background: 'white', border: '1px solid var(--border)', padding: 24,
  }
  const label10: React.CSSProperties = {
    fontSize: 10, fontWeight: 600, letterSpacing: '0.12em',
    textTransform: 'uppercase', color: 'var(--ink-muted)',
  }

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 20 }}>
        <a href="/" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Home</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: 'var(--navy)' }}>Developers</span>
      </div>

      {/* Header */}
      <div style={{ borderBottom: '2px solid var(--navy)', paddingBottom: 20, marginBottom: 40 }}>
        <h1 style={{ fontSize: 28, margin: '0 0 8px', color: 'var(--navy)' }}>Salary Data API</h1>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--ink-muted)' }}>
          113 roles · 30 cities · BLS OES 2025 data · JSON · Free tier available
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>

        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Free key signup */}
          <div style={box}>
            <div style={{ ...label10, color: 'var(--gold)', marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
              Get Your Free API Key
            </div>

            {status === 'done' ? (
              <div>
                <p style={{ fontSize: 13, color: '#1a6640', marginBottom: 12, fontWeight: 600 }}>
                  Key created. Copy it now — it won't be shown again.
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <code style={{ flex: 1, padding: '10px 12px', background: '#f7f6f2', border: '1px solid var(--border)', fontSize: 12, fontFamily: 'Courier New, monospace', wordBreak: 'break-all' }}>
                    {apiKey}
                  </code>
                  <button onClick={copyKey} style={{ padding: '10px 16px', background: copied ? '#1a6640' : 'var(--navy)', color: '#f0ead8', border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: 'Georgia, serif', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 8 }}>
                  Free plan: 100 requests/month. Resets monthly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSignup}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <input
                    type="email" required placeholder="you@company.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    style={{ padding: '10px 12px', fontSize: 14, border: '1px solid var(--border)', fontFamily: 'Georgia, serif', color: 'var(--ink)' }}
                  />
                  <button type="submit" disabled={status === 'loading'} style={{ padding: '11px', background: 'var(--navy)', color: '#f0ead8', border: 'none', fontFamily: 'Georgia, serif', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', opacity: status === 'loading' ? 0.7 : 1 }}>
                    {status === 'loading' ? 'Creating...' : 'Get Free API Key'}
                  </button>
                  {status === 'error' && <p style={{ fontSize: 12, color: '#c0392b', margin: 0 }}>Something went wrong. Try again.</p>}
                </div>
              </form>
            )}
          </div>

          {/* Pricing */}
          <div style={box}>
            <div style={{ ...label10, color: 'var(--gold)', marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
              Plans
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {PLANS.map(p => (
                <div key={p.name} style={{ padding: '14px 16px', border: `1px solid ${p.highlight ? 'var(--navy)' : 'var(--border)'}`, background: p.highlight ? 'var(--navy)' : 'white' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: p.highlight ? '#f0ead8' : 'var(--navy)', marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: p.highlight ? 'var(--gold-lt)' : 'var(--navy)', fontFamily: 'Courier New, monospace', marginBottom: 4 }}>{p.price}</div>
                  <div style={{ fontSize: 11, color: p.highlight ? '#8a9bb5' : 'var(--ink-muted)' }}>{p.limit}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: 'var(--ink-muted)', margin: '12px 0 0' }}>
              Starter, Pro and Enterprise plans — contact <a href="mailto:worldmineralassosiation@gmail.com" style={{ color: 'var(--navy)' }}>worldmineralassosiation@gmail.com</a>
            </p>
          </div>

          {/* Endpoints */}
          <div style={box}>
            <div style={{ ...label10, color: 'var(--gold)', marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
              Endpoints
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ENDPOINTS.map(ep => (
                <div key={ep.path} style={{ padding: '10px 12px', background: '#f7f6f2', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', background: ep.method === 'POST' ? '#b8962e' : 'var(--navy)', color: '#f0ead8', fontFamily: 'Courier New, monospace' }}>{ep.method}</span>
                    {!ep.auth && <span style={{ fontSize: 10, color: '#1a6640', fontWeight: 600 }}>NO AUTH</span>}
                  </div>
                  <code style={{ fontSize: 11, fontFamily: 'Courier New, monospace', color: 'var(--navy)', wordBreak: 'break-all' }}>{ep.path}</code>
                  <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 3 }}>{ep.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Example response */}
          <div style={box}>
            <div style={{ ...label10, color: 'var(--gold)', marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
              Example Response
            </div>
            <pre style={{ margin: 0, padding: '14px', background: '#0b1f3a', color: '#8af5b0', fontSize: 12, fontFamily: 'Courier New, monospace', lineHeight: 1.7, overflowX: 'auto' }}>
              {EXAMPLE_RESPONSE}
            </pre>
          </div>

          {/* Code examples */}
          {[
            { id: 'curl', lang: 'cURL', code: curlExample },
            { id: 'js', lang: 'JavaScript', code: jsExample },
            { id: 'py', lang: 'Python', code: pyExample },
          ].map(({ id, lang, code }) => (
            <div key={id} style={box}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
                <span style={{ ...label10, color: 'var(--gold)' }}>{lang}</span>
                <button onClick={() => copySnippet(id, code)} style={{ fontSize: 11, padding: '4px 10px', background: copiedSnippet === id ? '#1a6640' : 'transparent', color: copiedSnippet === id ? '#fff' : 'var(--ink-muted)', border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'Georgia, serif' }}>
                  {copiedSnippet === id ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre style={{ margin: 0, padding: '12px', background: '#f7f6f2', fontSize: 12, fontFamily: 'Courier New, monospace', lineHeight: 1.6, overflowX: 'auto', color: 'var(--ink)' }}>
                {code}
              </pre>
            </div>
          ))}

          {/* Auth info */}
          <div style={{ ...box, borderLeft: '4px solid var(--gold)' }}>
            <div style={{ ...label10, marginBottom: 10 }}>Authentication</div>
            <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--ink-muted)', lineHeight: 1.7 }}>
              Pass your API key using any of these methods:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                '?key=YOUR_KEY (query param)',
                'X-API-Key: YOUR_KEY (header)',
                'Authorization: Bearer YOUR_KEY (header)',
              ].map(m => (
                <code key={m} style={{ fontSize: 11, padding: '6px 10px', background: '#f7f6f2', border: '1px solid var(--border)', fontFamily: 'Courier New, monospace', color: 'var(--navy)' }}>
                  {m}
                </code>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
