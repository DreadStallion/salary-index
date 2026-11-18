import { getBenchmark, BLS_METRO_WORKBOOK } from '@/data/benchmarks'
import type { Metadata } from 'next'
import {
  getSalaryData, getAllRoleSlugs, getAllCitySlugs,
  formatSalary, ROLES, CITIES,
} from '@/data/salaries'

type Props = { params: Promise<{ role: string; city: string }> }

// Preserve existing URLs in the original eight markets alongside verified detail pages.
const TOP_CITIES = ['san-francisco', 'new-york', 'seattle', 'los-angeles', 'chicago', 'austin', 'washington-dc', 'boston']

export async function generateStaticParams() {
  const pairs: { role: string; city: string }[] = []
  for (const role of getAllRoleSlugs()) {
    for (const city of getAllCitySlugs()) {
      if (TOP_CITIES.includes(city) || getSalaryData(role, city)) pairs.push({ role, city })
    }
  }
  return pairs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role, city } = await params
  const data = getSalaryData(role, city)
  if (!data) return { robots: { index: false, follow: true } }
  return {
    alternates: { canonical: `https://ussalaryindex.com/salary/${role}/${city}` },
    title: `${data.role} Salary in ${data.city}, ${data.state} (${data.updatedAt})`,
    description: `The median ${data.role} salary in ${data.city} is ${formatSalary(data.median)}/year. Full compensation distribution: 25th percentile ${formatSalary(data.p25)}, 75th ${formatSalary(data.p75)}, 90th ${formatSalary(data.p90)}.`,
  }
}

export default async function SalaryPage({ params }: Props) {
  const { role, city } = await params
  const data = getSalaryData(role, city)
  if (!data) {
    const details = getBenchmark(role)
    return <section className="benchmark"><h1>{ROLES.find(item => item.slug === role)?.label ?? role} salaries</h1><p>A complete wage distribution is unavailable for this occupation and market.</p><a href={details ? `/benchmarks/${role}` : '/benchmarks'}>See available BLS benchmarks</a></section>
  }
  const occupation = getBenchmark(role)
  const metro = occupation?.markets.find(item => item.slug === city)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the average ${data.role} salary in ${data.city}?`,
            acceptedAnswer: { '@type': 'Answer', text: `The median ${data.role} salary in ${data.city}, ${data.state} is ${formatSalary(data.median)} per year (${data.source}, ${data.updatedAt}). The middle 50% earn between ${formatSalary(data.p25)} and ${formatSalary(data.p75)}.` },
          },
          {
            '@type': 'Question',
            name: `What is the entry-level ${data.role} salary in ${data.city}?`,
            acceptedAnswer: { '@type': 'Answer', text: `Entry-level ${data.role} positions in ${data.city} typically pay around ${formatSalary(data.p25)} per year (25th percentile). With 2–4 years of experience, salaries climb toward the median of ${formatSalary(data.median)}.` },
          },
          {
            '@type': 'Question',
            name: `What do senior ${data.role}s earn in ${data.city}?`,
            acceptedAnswer: { '@type': 'Answer', text: `Senior ${data.role}s in ${data.city} earn ${formatSalary(data.p75)} at the 75th percentile and up to ${formatSalary(data.p90)} at the 90th percentile.` },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ussalaryindex.com' },
          { '@type': 'ListItem', position: 2, name: `${data.role} Salary`, item: `https://ussalaryindex.com/role/${role}` },
          { '@type': 'ListItem', position: 3, name: `${data.role} Salary in ${data.city}`, item: `https://ussalaryindex.com/salary/${role}/${city}` },
        ],
      },
    ],
  }

  const otherCities = CITIES.filter(c => c.slug !== city).slice(0, 8)
  const otherRoles = ROLES.filter(r => r.slug !== role).slice(0, 6)

  const percentiles = [
    { label: '25th Pct.', value: data.p25, sub: 'Lower quartile' },
    { label: '50th Pct.', value: data.median, sub: 'Median', highlight: true },
    { label: '75th Pct.', value: data.p75, sub: 'Upper quartile' },
    { label: '90th Pct.', value: data.p90, sub: 'Top earner' },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 20, letterSpacing: '0.02em' }}>
        <a href="/" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Roles</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <a href={`/role/${role}`} style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>{data.role}</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: 'var(--navy)' }}>{data.city}</span>
      </div>

      {/* Title block */}
      <div style={{ borderBottom: '2px solid var(--navy)', paddingBottom: 20, marginBottom: 24 }}>
        <div className="salary-title-block" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 26, margin: '0 0 6px', color: 'var(--navy)' }}>
              {data.role} Salary in {data.city}, {data.state}
            </h1>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-muted)' }}>
              Annual wages · {data.updatedAt} · {data.source}
            </p>
          </div>
          <div className="salary-amount" style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 34, fontWeight: 700, color: 'var(--navy)', fontFamily: 'Courier New, monospace', letterSpacing: '-0.02em' }}>
              {formatSalary(data.median)}
            </div>
          </div>
        </div>
      </div>

      {/* Factual answer block — helps AI systems extract the core answer */}
      <div style={{
        padding: '16px 20px',
        background: 'white',
        border: '1px solid var(--border)',
        borderLeft: '4px solid var(--gold)',
        marginBottom: 32,
      }}>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--ink)', lineHeight: 1.8 }}>
          The median salary for <strong>{data.role}</strong> in <strong>{metro?.market ?? data.city}</strong> is{' '}
          <strong style={{ fontFamily: 'Courier New, monospace', color: 'var(--navy)' }}>{formatSalary(data.median)}</strong> per year ({data.source}, {data.updatedAt}).
          {occupation && metro && <> Published for {occupation.occupation} (SOC {occupation.code}) in area {metro.area}.{' '}<a href={BLS_METRO_WORKBOOK}>BLS metropolitan source</a>.</>}
          {' '}The middle half of wages fall between{' '}
          <strong style={{ fontFamily: 'Courier New, monospace' }}>{formatSalary(data.p25)}</strong> and{' '}
          <strong style={{ fontFamily: 'Courier New, monospace' }}>{formatSalary(data.p75)}</strong>.
        </p>
      </div>


      {/* Compensation distribution */}
      <div style={{ marginBottom: 36 }}>
        <h2 style={{
          fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--ink-muted)', marginBottom: 12, fontWeight: 600,
          fontFamily: 'Georgia, serif', margin: '0 0 12px',
        }}>
          Salary Percentiles
        </h2>
        <div className="percentile-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
          {percentiles.map(p => (
            <div key={p.label} style={{
              padding: '14px 12px',
              background: p.highlight ? 'var(--navy)' : 'white',
              border: p.highlight ? '2px solid var(--gold)' : '1px solid var(--border)',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: 17,
                fontWeight: 700,
                fontFamily: 'Courier New, monospace',
                color: p.highlight ? '#f0ead8' : 'var(--navy)',
                letterSpacing: '-0.01em',
              }}>
                {formatSalary(p.value)}
              </div>
              <div style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: p.highlight ? 'var(--gold-lt)' : 'var(--ink-muted)', marginTop: 4, fontWeight: 600 }}>
                {p.label}
              </div>
              <div style={{ fontSize: 10, color: p.highlight ? '#8a9bb5' : '#a0a8b5', marginTop: 2 }}>
                {p.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{
          fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--ink-muted)', fontWeight: 600, margin: '0 0 16px',
          fontFamily: 'Georgia, serif', display: 'flex', alignItems: 'center', gap: 12,
        }}>
          Frequently Asked Questions
          <span style={{ flex: 1, height: 1, background: 'var(--border)', display: 'inline-block' }} />
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {[
            {
              q: `What is the average ${data.role} salary in ${data.city}?`,
              a: `The median ${data.role} salary in ${data.city}, ${data.state} is ${formatSalary(data.median)} per year (${data.source}, ${data.updatedAt}). The middle 50% of earners fall between ${formatSalary(data.p25)} and ${formatSalary(data.p75)}.`,
            },
            {
              q: `What is the entry-level ${data.role} salary in ${data.city}?`,
              a: `Entry-level ${data.role} positions in ${data.city} typically start around ${formatSalary(data.p25)} per year (25th percentile). With 2–4 years of experience, compensation climbs toward the market median of ${formatSalary(data.median)}.`,
            },
            {
              q: `What do senior ${data.role}s earn in ${data.city}?`,
              a: `Senior ${data.role}s in ${data.city} earn ${formatSalary(data.p75)} at the 75th percentile and up to ${formatSalary(data.p90)} at the 90th percentile, reflecting 6+ years of experience and management responsibilities.`,
            },
          ].map(({ q, a }, i) => (
            <details key={q} style={{ background: i % 2 === 0 ? 'white' : 'var(--paper-alt)', borderBottom: '1px solid var(--border)' }}>
              <summary style={{
                padding: '13px 16px',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--navy)',
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                {q}
                <span style={{ color: 'var(--gold)', fontSize: 18, marginLeft: 12 }}>+</span>
              </summary>
              <p style={{ padding: '0 16px 14px', margin: 0, fontSize: 13.5, color: 'var(--ink-muted)', lineHeight: 1.7 }}>
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>


      {/* Same role, other cities */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{
          fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--ink-muted)', fontWeight: 600, margin: '0 0 14px',
          fontFamily: 'Georgia, serif', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap',
        }}>
          {data.role} — Other Markets
          <span style={{ flex: 1, height: 1, background: 'var(--border)', display: 'inline-block', minWidth: 20 }} />
        </h2>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Market</th>
                <th>25th Pct.</th>
                <th>Median</th>
                <th>75th Pct.</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {otherCities.map(c => {
                const d = getSalaryData(role, c.slug)
                if (!d) return null
                return (
                  <tr key={c.slug}>
                    <td>
                      <a href={`/salary/${role}/${c.slug}`} style={{ color: 'var(--navy)', fontWeight: 600, textDecoration: 'none' }}>
                        {c.label}, {c.state}
                      </a>
                    </td>
                    <td style={{ fontFamily: 'Courier New, monospace', fontSize: 13 }}>{formatSalary(d.p25)}</td>
                    <td className="median">{formatSalary(d.median)}</td>
                    <td style={{ fontFamily: 'Courier New, monospace', fontSize: 13 }}>{formatSalary(d.p75)}</td>
                    <td>{d.source}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Other roles same city */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{
          fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--ink-muted)', fontWeight: 600, margin: '0 0 14px',
          fontFamily: 'Georgia, serif', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap',
        }}>
          {data.city} — Other Roles
          <span style={{ flex: 1, height: 1, background: 'var(--border)', display: 'inline-block', minWidth: 20 }} />
        </h2>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>25th Pct.</th>
                <th>Median</th>
                <th>75th Pct.</th>
              </tr>
            </thead>
            <tbody>
              {otherRoles.map(r => {
                const d = getSalaryData(r.slug, city)
                if (!d) return null
                return (
                  <tr key={r.slug}>
                    <td>
                      <a href={`/salary/${r.slug}/${city}`} style={{ color: 'var(--navy)', fontWeight: 600, textDecoration: 'none' }}>
                        {r.label}
                      </a>
                    </td>
                    <td style={{ fontFamily: 'Courier New, monospace', fontSize: 13 }}>{formatSalary(d.p25)}</td>
                    <td className="median">{formatSalary(d.median)}</td>
                    <td style={{ fontFamily: 'Courier New, monospace', fontSize: 13 }}>{formatSalary(d.p75)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Source citation box */}
      <div className="source-box">
        <p style={{ margin: 0, fontSize: 12, color: 'var(--ink-muted)', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--navy)' }}>Source:</strong> {data.source} · {data.updatedAt}.{' '}
          <a href="/methodology" style={{ color: 'var(--navy)', textDecoration: 'underline' }}>ussalaryindex.com/methodology</a>
        </p>
      </div>

      {/* Cite this page */}
      <div style={{
        marginTop: 24,
        padding: '14px 20px',
        background: 'var(--paper-alt)',
        border: '1px solid var(--border)',
        fontSize: 12,
        color: 'var(--ink-muted)',
        lineHeight: 1.7,
      }}>
        <strong style={{ color: 'var(--navy)', display: 'block', marginBottom: 4, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Cite this page
        </strong>
        ussalaryindex.com. ({new Date().getFullYear()}). <em>{data.role} Salary in {data.city}, {data.state} ({data.updatedAt})</em>.
        {' '}Retrieved from https://ussalaryindex.com/salary/{role}/{city}. Source: {data.source}.
      </div>
    </>
  )
}
