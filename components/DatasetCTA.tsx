const GUMROAD_URL = 'https://dreadstallion.gumroad.com/l/tvhsz'
const SAMPLE_URL = 'https://dreadstallion.gumroad.com/l/jqrbti'

const PREVIEW_ROWS = [
  { role: 'Software Engineer',    city: 'San Francisco', median: '$190,000', p25: '$140,000', p75: '$240,000', p90: '$305,000' },
  { role: 'Data Scientist',       city: 'New York',      median: '$145,000', p25: '$110,000', p75: '$185,000', p90: '$235,000' },
  { role: 'Product Manager',      city: 'Seattle',       median: '$155,000', p25: '$120,000', p75: '$195,000', p90: '$245,000' },
  { role: 'Financial Analyst',    city: 'Chicago',       median: '$85,000',  p25: '$65,000',  p75: '$110,000', p90: '$140,000' },
  { role: 'Registered Nurse',     city: 'Austin',        median: '$80,000',  p25: '$68,000',  p75: '$95,000',  p90: '$115,000' },
]

const USE_CASES = [
  { label: 'HR benchmarking',         desc: 'Set competitive comp bands for 113 roles across 30 markets' },
  { label: 'Recruiting research',     desc: 'Quote accurate salary ranges to candidates during screening' },
  { label: 'Startup hiring budgets',  desc: 'Plan engineering/ops headcount costs before raising or hiring' },
  { label: 'Career content',          desc: 'Back salary articles with authoritative BLS-sourced figures' },
  { label: 'Job market analysis',     desc: 'Compare compensation across cities and seniority levels' },
]

export default function DatasetCTA({ role, city }: { role?: string; city?: string } = {}) {
  const headline = role && city
    ? `Need full salary data for ${role}s across all 30 markets?`
    : role
    ? `Need ${role} salary data across all 30 US markets?`
    : city
    ? `Need full compensation data for all 113 roles in ${city}?`
    : 'The complete U.S. salary dataset — 3,360 records, instant download'

  return (
    <div style={{
      background: '#0a1628',
      border: '1px solid #1e3a5f',
      borderTop: '3px solid #c9a227',
      borderRadius: 6,
      padding: '28px 24px',
      marginBottom: 40,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a227', fontWeight: 700, marginBottom: 6 }}>
            Full Dataset — $19
          </div>
          <h3 style={{ margin: '0 0 6px', fontSize: 18, color: '#f0ead8', fontFamily: 'Georgia, serif' }}>
            {headline}
          </h3>
          <p style={{ margin: 0, fontSize: 13, color: '#7a90a8', lineHeight: 1.5 }}>
            3,360 salary records · 113 roles · 30 US cities · Median, P25, P75, P90 · Excel + CSV · BLS OES 2024
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 200 }}>
          <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" style={{
            background: '#c9a227',
            color: '#060e1c',
            fontWeight: 700,
            fontSize: 13,
            padding: '11px 20px',
            textDecoration: 'none',
            textAlign: 'center',
            letterSpacing: '0.05em',
            borderRadius: 3,
            display: 'block',
          }}>
            GET FULL DATASET — $19 →
          </a>
          <a href={SAMPLE_URL} target="_blank" rel="noopener noreferrer" style={{
            background: 'transparent',
            color: '#8a9bb5',
            fontWeight: 600,
            fontSize: 12,
            padding: '8px 20px',
            textDecoration: 'none',
            textAlign: 'center',
            border: '1px solid #1e3a5f',
            borderRadius: 3,
            display: 'block',
          }}>
            Download free sample (25 rows) →
          </a>
        </div>
      </div>

      {/* Preview table */}
      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e3a5f' }}>
              {['Role', 'City', 'Median', 'P25', 'P75', 'P90'].map(h => (
                <th key={h} style={{ padding: '6px 10px', textAlign: 'left', color: '#4a6a8a', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: 10 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PREVIEW_ROWS.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #0d1f3c' }}>
                <td style={{ padding: '7px 10px', color: '#c8d4e0', fontWeight: 500 }}>{row.role}</td>
                <td style={{ padding: '7px 10px', color: '#7a90a8' }}>{row.city}</td>
                <td style={{ padding: '7px 10px', color: '#f0ead8', fontFamily: 'Courier New, monospace', fontWeight: 700 }}>{row.median}</td>
                <td style={{ padding: '7px 10px', color: '#8a9bb5', fontFamily: 'Courier New, monospace' }}>{row.p25}</td>
                <td style={{ padding: '7px 10px', color: '#8a9bb5', fontFamily: 'Courier New, monospace' }}>{row.p75}</td>
                <td style={{ padding: '7px 10px', color: '#8a9bb5', fontFamily: 'Courier New, monospace' }}>{row.p90}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={6} style={{ padding: '8px 10px', color: '#4a5a6a', fontSize: 11, fontStyle: 'italic' }}>
                + 3,355 more rows across 113 roles and 30 US cities in the full dataset
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Use cases */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {USE_CASES.map(uc => (
          <div key={uc.label} style={{ background: '#0d1f3c', border: '1px solid #1e3a5f', borderRadius: 4, padding: '6px 12px' }}>
            <span style={{ fontSize: 11, color: '#c9a227', fontWeight: 600 }}>{uc.label}</span>
            <span style={{ fontSize: 11, color: '#4a6a8a', marginLeft: 6 }}>{uc.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
