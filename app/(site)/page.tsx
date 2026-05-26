import { ROLES, CITIES } from '@/data/salaries'

export default function HomePage() {
  return (
    <div>
      {/* Header section */}
      <div style={{ borderBottom: '2px solid var(--navy)', paddingBottom: 28, marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 10 }}>
          <h1 style={{ fontSize: 28, margin: 0, color: 'var(--navy)', lineHeight: 1.2 }}>
            U.S. Compensation Intelligence
          </h1>
          <span className="tag" style={{ marginBottom: 4 }}>2026 Edition</span>
        </div>
        <p style={{ color: 'var(--ink-muted)', fontSize: 14, margin: 0, maxWidth: 680 }}>
          Institutional-grade salary benchmarks derived from Bureau of Labor Statistics OES surveys,
          cross-referenced with Glassdoor and Indeed market data. Select a role or market to view
          the full compensation distribution.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        {/* Roles */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <h2 style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0, color: 'var(--ink-muted)' }}>
              Browse by Role
            </h2>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {ROLES.map((role, i) => (
              <a
                key={role.slug}
                href={`/role/${role.slug}`}
                className="nav-row"
                style={{ background: i % 2 === 0 ? 'white' : 'var(--paper-alt)' }}
              >
                <span>{role.label}</span>
                <span style={{ color: 'var(--ink-muted)', fontSize: 11 }}>→</span>
              </a>
            ))}
          </div>
        </div>

        {/* Cities */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <h2 style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0, color: 'var(--ink-muted)' }}>
              Browse by Market
            </h2>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {CITIES.map((city, i) => (
              <a
                key={city.slug}
                href={`/city/${city.slug}`}
                className="nav-row"
                style={{ background: i % 2 === 0 ? 'white' : 'var(--paper-alt)' }}
              >
                <span>{city.label}</span>
                <span style={{ color: 'var(--ink-muted)', fontSize: 12 }}>{city.state}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Calculator CTA */}
      <div style={{ marginTop: 40, background: 'var(--navy)', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
        <div>
          <div style={{ color: 'var(--gold-lt)', fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
            How much will you actually take home?
          </div>
          <p style={{ color: '#8a9bb5', fontSize: 13, margin: 0 }}>
            Calculate your net salary after federal taxes, state taxes, and FICA — across all 50 states.
          </p>
        </div>
        <a href="/calculator" style={{
          display: 'inline-block', padding: '10px 24px',
          background: 'var(--gold)', color: 'var(--navy-dark)',
          fontWeight: 700, fontSize: 13, letterSpacing: '0.06em',
          textDecoration: 'none', fontFamily: 'Georgia, serif',
          textTransform: 'uppercase', whiteSpace: 'nowrap',
        }}>
          Open Calculator →
        </a>
      </div>

      {/* Data note */}
      <div style={{
        marginTop: 48,
        padding: '16px 20px',
        background: 'white',
        borderLeft: '4px solid var(--gold)',
        borderTop: '1px solid var(--border)',
        borderRight: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}>
        <p style={{ margin: 0, fontSize: 12.5, color: 'var(--ink-muted)', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--navy)' }}>Data Methodology:</strong> Salary figures represent
          annual base compensation in USD. Percentiles are derived from BLS Occupational Employment
          and Wage Statistics (OES) surveys, adjusted for metropolitan cost-of-labor indices.
          Data is refreshed monthly. Figures reflect May 2026 market conditions.
        </p>
      </div>
    </div>
  )
}
