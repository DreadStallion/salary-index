'use client'

import { useState } from 'react'
import { ROLES, CITIES } from '@/data/salaries'

export default function EmbedPage() {
  const [role, setRole] = useState('software-engineer')
  const [city, setCity] = useState('san-francisco')

  const widgetUrl = `https://ussalaryindex.com/widget/${role}/${city}`
  const embedCode = `<iframe\n  src="${widgetUrl}"\n  width="360"\n  height="220"\n  frameborder="0"\n  style="border:none;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,0.12);"\n  title="Salary data powered by SalaryIndex"\n></iframe>`

  const selectStyle: React.CSSProperties = {
    width: '100%', padding: '9px 12px', fontSize: 14,
    border: '1px solid var(--border)', background: 'white',
    color: 'var(--ink)', fontFamily: 'Georgia, serif',
  }

  return (
    <>
      <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 20 }}>
        <a href="/" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Home</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: 'var(--navy)' }}>Embed Widget</span>
      </div>

      <div style={{ borderBottom: '2px solid var(--navy)', paddingBottom: 20, marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, margin: '0 0 8px', color: 'var(--navy)' }}>Embed Salary Widget</h1>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-muted)' }}>
          Add live salary data to your blog, job board, or career site. Free to use — just keep the SalaryIndex attribution.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>

        {/* Controls */}
        <div>
          <div style={{ background: 'white', border: '1px solid var(--border)', padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 18, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
              Configure Widget
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>
                  Role
                </label>
                <select value={role} onChange={e => setRole(e.target.value)} style={selectStyle}>
                  {ROLES.map(r => <option key={r.slug} value={r.slug}>{r.label}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>
                  City / Market
                </label>
                <select value={city} onChange={e => setCity(e.target.value)} style={selectStyle}>
                  {CITIES.map(c => <option key={c.slug} value={c.slug}>{c.label}, {c.state}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Embed code */}
          <div style={{ background: 'white', border: '1px solid var(--border)', padding: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
              Embed Code
            </div>
            <textarea
              readOnly
              value={embedCode}
              onClick={e => (e.target as HTMLTextAreaElement).select()}
              style={{
                width: '100%', padding: '12px', fontSize: 11,
                fontFamily: 'Courier New, monospace', lineHeight: 1.6,
                background: '#f7f6f2', border: '1px solid var(--border)',
                color: 'var(--ink)', resize: 'none', height: 140,
                cursor: 'text',
              }}
            />
            <button
              onClick={() => navigator.clipboard.writeText(embedCode)}
              style={{
                marginTop: 10, width: '100%', padding: '10px',
                background: 'var(--navy)', color: '#f0ead8',
                border: 'none', fontFamily: 'Georgia, serif',
                fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase', cursor: 'pointer',
              }}
            >
              Copy Embed Code
            </button>
          </div>
        </div>

        {/* Preview */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 12 }}>
            Live Preview
          </div>
          <iframe
            key={`${role}-${city}`}
            src={`/widget/${role}/${city}`}
            width="360"
            height="220"
            style={{ border: 'none', borderRadius: 4, boxShadow: '0 2px 12px rgba(0,0,0,0.12)', display: 'block' }}
            title="Widget preview"
          />
          <div style={{ marginTop: 16, padding: '12px 16px', background: 'white', border: '1px solid var(--border)', borderLeft: '4px solid var(--gold)', borderLeftWidth: 4 }}>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--ink-muted)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--navy)' }}>Free to use.</strong> Embed on any site — blog, job board, HR portal, career guide.
              The only requirement is keeping the "Powered by SalaryIndex" link.
              Data updates automatically every month from BLS OES.
            </p>
          </div>
        </div>
      </div>

      {/* Use cases */}
      <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {[
          { title: 'Job Boards', desc: 'Show expected salary ranges next to job listings to increase applications.' },
          { title: 'Career Blogs', desc: 'Embed salary benchmarks in articles about career paths and compensation negotiation.' },
          { title: 'HR & Recruiting', desc: 'Add market data to job descriptions to set transparent salary expectations.' },
        ].map(({ title, desc }) => (
          <div key={title} style={{ background: 'white', border: '1px solid var(--border)', padding: '18px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>{title}</div>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--ink-muted)', lineHeight: 1.6 }}>{desc}</p>
          </div>
        ))}
      </div>
    </>
  )
}
