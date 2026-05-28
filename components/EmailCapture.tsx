'use client'

import { useState } from 'react'

const SUBSCRIBE_URL = 'https://api.ussalaryindex.com/v1/subscribe'
const SAMPLE_URL = 'https://dreadstallion.gumroad.com/l/jqrbti'

export default function EmailCapture({ role, city }: { role?: string; city?: string } = {}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const context = role && city
    ? `${role} data in ${city}`
    : role
    ? `${role} salary data`
    : city
    ? `${city} salary data`
    : 'U.S. salary data'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch(SUBSCRIBE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, context }),
      })
      if (res.ok) {
        setStatus('done')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div style={{
        background: 'white',
        border: '1px solid var(--border)',
        borderLeft: '4px solid var(--green)',
        padding: '16px 20px',
        marginBottom: 32,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <span style={{ fontSize: 16, color: 'var(--green)' }}>✓</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--green)', marginBottom: 2 }}>
            Sample sent — check your inbox
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>
            Or{' '}
            <a href={SAMPLE_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>
              preview it on Gumroad →
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      background: 'white',
      border: '1px solid var(--border)',
      borderTop: '3px solid var(--gold)',
      padding: '20px 24px',
      marginBottom: 32,
    }}>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: 5 }}>
            Free Sample Dataset
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', fontFamily: 'Georgia, serif', marginBottom: 4 }}>
            Download free salary dataset sample
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-muted)', lineHeight: 1.5 }}>
            Preview the Excel/CSV structure before buying the full dataset.
            {role || city ? ` Includes ${context}.` : ''}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, flex: 1, minWidth: 260 }}>
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              flex: 1,
              padding: '9px 12px',
              fontSize: 13,
              border: '1px solid var(--border)',
              fontFamily: 'Georgia, serif',
              color: 'var(--ink)',
              background: 'var(--paper)',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '9px 18px',
              background: 'var(--navy)',
              color: '#f0ead8',
              border: 'none',
              fontFamily: 'Georgia, serif',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: status === 'loading' ? 'wait' : 'pointer',
              opacity: status === 'loading' ? 0.7 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {status === 'loading' ? '...' : 'Get Sample'}
          </button>
        </form>
      </div>

      {status === 'error' && (
        <div style={{ marginTop: 10, fontSize: 12, color: '#c0392b' }}>
          Something went wrong.{' '}
          <a href={SAMPLE_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>
            Download directly on Gumroad →
          </a>
        </div>
      )}
    </div>
  )
}
