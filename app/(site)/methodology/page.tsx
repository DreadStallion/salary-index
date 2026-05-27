import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Methodology — How SalaryIndex Calculates Salaries',
  description: 'SalaryIndex salary data is derived from Bureau of Labor Statistics Occupational Employment and Wage Statistics (OES) surveys, adjusted for metropolitan cost-of-labor indices.',
  alternates: { canonical: 'https://ussalaryindex.com/methodology' },
}

export default function MethodologyPage() {
  return (
    <>
      <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 20 }}>
        <a href="/" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Home</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: 'var(--navy)' }}>Methodology</span>
      </div>

      <div style={{ borderBottom: '2px solid var(--navy)', paddingBottom: 20, marginBottom: 36 }}>
        <h1 style={{ fontSize: 26, margin: '0 0 8px', color: 'var(--navy)' }}>Data Methodology</h1>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--ink-muted)' }}>
          How SalaryIndex collects, processes, and presents U.S. compensation data.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 760 }}>

        <section>
          <h2 style={{ fontSize: 16, color: 'var(--navy)', marginBottom: 12 }}>Primary Data Source</h2>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.8, margin: 0 }}>
            All base salary figures are derived from the <strong>Bureau of Labor Statistics (BLS) Occupational Employment and Wage Statistics (OES)</strong> program. The OES survey is the most comprehensive U.S. government survey of occupational wages, covering approximately 1.2 million business establishments annually.
          </p>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.8, margin: '12px 0 0' }}>
            The BLS OES program provides wage estimates at the national, state, and metropolitan area levels for over 800 occupations. SalaryIndex maps these occupations to the 113 roles tracked on this site.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 16, color: 'var(--navy)', marginBottom: 12 }}>Percentile Calculations</h2>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.8, margin: 0 }}>
            SalaryIndex reports four compensation percentiles for each role and market:
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#e8e2d4' }}>
                {['Percentile', 'Label', 'Meaning'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['25th', 'Entry-level', '25% of workers in this role/market earn less than this amount'],
                ['50th (Median)', 'Mid-level', 'Half of workers earn less, half earn more — the market reference point'],
                ['75th', 'Senior', '75% of workers earn less; reflects 6–10 years of experience'],
                ['90th', 'Top earner', 'Top 10% of earners; reflects principal/lead/staff-level roles'],
              ].map(([pct, label, desc], i) => (
                <tr key={pct} style={{ background: i % 2 === 0 ? 'white' : 'var(--paper-alt)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontSize: 13, fontFamily: 'Courier New, monospace', fontWeight: 700, color: 'var(--navy)' }}>{pct}</td>
                  <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 600 }}>{label}</td>
                  <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--ink-muted)' }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2 style={{ fontSize: 16, color: 'var(--navy)', marginBottom: 12 }}>Geographic Adjustment</h2>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.8, margin: 0 }}>
            National salary figures are adjusted to reflect local labor market conditions using <strong>metropolitan area cost-of-labor indices</strong>. These indices account for differences in employer costs, local demand, and competitive compensation pressures across U.S. metropolitan areas.
          </p>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.8, margin: '12px 0 0' }}>
            This is different from cost-of-living adjustments. Labor cost indices reflect what employers actually pay in a given market, not what goods and services cost. A Software Engineer in San Francisco earns more because San Francisco employers compete at a higher wage level, not only because the city is expensive.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 16, color: 'var(--navy)', marginBottom: 12 }}>Update Frequency</h2>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.8, margin: 0 }}>
            SalaryIndex data is refreshed <strong>monthly</strong>. The current dataset reflects <strong>May 2026</strong> market conditions, incorporating the most recent BLS OES release. Year-over-year change figures compare current data to the equivalent period in 2025.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 16, color: 'var(--navy)', marginBottom: 12 }}>What Is and Is Not Included</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'white', border: '1px solid var(--border)', borderLeft: '4px solid var(--green)', padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 10 }}>Included</div>
              {['Annual base salary', 'Geographic premium/discount', 'Percentile distribution (p25–p90)', 'Year-over-year change'].map(item => (
                <div key={item} style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 4 }}>✓ {item}</div>
              ))}
            </div>
            <div style={{ background: 'white', border: '1px solid var(--border)', borderLeft: '4px solid var(--red)', padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: 10 }}>Not included</div>
              {['Equity / stock options', 'Signing bonuses', 'Benefits (health, 401k)', 'Overtime or commission'].map(item => (
                <div key={item} style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 4 }}>✗ {item}</div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'white', border: '1px solid var(--border)', borderLeft: '4px solid var(--gold)', padding: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Disclaimer</div>
          <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.7, margin: 0 }}>
            SalaryIndex data is intended for informational purposes only and should not be used as the sole basis for salary negotiations, hiring decisions, or financial planning. Individual compensation varies based on experience, education, company size, and negotiation. Always verify data with multiple sources before making employment decisions.
          </p>
        </section>

      </div>
    </>
  )
}
