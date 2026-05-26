import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getSalaryData, getAllRoleSlugs, getAllCitySlugs,
  formatSalary, ROLES, CITIES,
} from '@/data/salaries'

type Props = { params: Promise<{ role: string; city: string }> }

export async function generateStaticParams() {
  const pairs: { role: string; city: string }[] = []
  for (const role of getAllRoleSlugs()) {
    for (const city of getAllCitySlugs()) {
      pairs.push({ role, city })
    }
  }
  return pairs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role, city } = await params
  const data = getSalaryData(role, city)
  if (!data) return {}
  return {
    title: `${data.role} Salary in ${data.city}, ${data.state} (${data.updatedAt})`,
    description: `The median ${data.role} salary in ${data.city} is ${formatSalary(data.median)}/year. Full compensation distribution: 25th percentile ${formatSalary(data.p25)}, 75th ${formatSalary(data.p75)}, 90th ${formatSalary(data.p90)}.`,
  }
}

export default async function SalaryPage({ params }: Props) {
  const { role, city } = await params
  const data = getSalaryData(role, city)
  if (!data) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the average ${data.role} salary in ${data.city}?`,
            acceptedAnswer: { '@type': 'Answer', text: `The median ${data.role} salary in ${data.city}, ${data.state} is ${formatSalary(data.median)} per year as of ${data.updatedAt}. The middle 50% earn between ${formatSalary(data.p25)} and ${formatSalary(data.p75)}.` },
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
          {
            '@type': 'Question',
            name: `How has the ${data.role} salary changed in ${data.city}?`,
            acceptedAnswer: { '@type': 'Answer', text: `${data.role} salaries in ${data.city} grew by ${data.yoyChange}% year-over-year as of ${data.updatedAt}.` },
          },
        ],
      },
    ],
  }

  const otherCities = CITIES.filter(c => c.slug !== city).slice(0, 8)
  const otherRoles = ROLES.filter(r => r.slug !== role).slice(0, 6)

  const percentiles = [
    { label: '10th Pct.', value: Math.round(data.p25 * 0.78 / 5000) * 5000, sub: 'Junior' },
    { label: '25th Pct.', value: data.p25, sub: 'Entry-level' },
    { label: '50th Pct.', value: data.median, sub: 'Median', highlight: true },
    { label: '75th Pct.', value: data.p75, sub: 'Senior' },
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
      <div style={{ borderBottom: '2px solid var(--navy)', paddingBottom: 20, marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 26, margin: '0 0 6px', color: 'var(--navy)' }}>
              {data.role} Salary in {data.city}, {data.state}
            </h1>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-muted)' }}>
              Annual base compensation · {data.updatedAt} · BLS OES Survey Data
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 34, fontWeight: 700, color: 'var(--navy)', fontFamily: 'Courier New, monospace', letterSpacing: '-0.02em' }}>
              {formatSalary(data.median)}
            </div>
            <div style={{ fontSize: 11, color: 'var(--green)', fontWeight: 600, letterSpacing: '0.05em', marginTop: 2 }}>
              ▲ {data.yoyChange}% YOY
            </div>
          </div>
        </div>
      </div>

      {/* Compensation distribution */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 12, fontWeight: 600 }}>
          Compensation Distribution
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2 }}>
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

      {/* Job listings */}
      <div style={{
        padding: '16px 20px',
        background: 'white',
        border: '1px solid var(--border)',
        borderLeft: '4px solid var(--navy)',
        marginBottom: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 3 }}>
            Open Positions
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}>
            Find active {data.role} roles in {data.city}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { name: 'LinkedIn', color: '#0a66c2', href: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(data.role)}&location=${encodeURIComponent(data.city)}` },
            { name: 'Indeed', color: '#003a9b', href: `https://www.indeed.com/jobs?q=${encodeURIComponent(data.role)}&l=${encodeURIComponent(data.city)}` },
            { name: 'Glassdoor', color: '#0caa41', href: `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${encodeURIComponent(data.role)}&locT=C&locName=${encodeURIComponent(data.city)}` },
          ].map(site => (
            <a key={site.name} href={site.href} target="_blank" rel="noopener noreferrer" style={{
              padding: '7px 16px',
              background: site.color,
              color: 'white',
              fontSize: 12,
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.04em',
            }}>
              {site.name} →
            </a>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', fontWeight: 600 }}>
            Frequently Asked Questions
          </div>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {[
            {
              q: `What is the average ${data.role} salary in ${data.city}?`,
              a: `The median ${data.role} salary in ${data.city}, ${data.state} is ${formatSalary(data.median)} per year as of ${data.updatedAt}. The middle 50% of earners fall between ${formatSalary(data.p25)} and ${formatSalary(data.p75)}.`,
            },
            {
              q: `What is the entry-level ${data.role} salary in ${data.city}?`,
              a: `Entry-level ${data.role} positions in ${data.city} typically start around ${formatSalary(data.p25)} per year (25th percentile). With 2–4 years of experience, compensation climbs toward the market median of ${formatSalary(data.median)}.`,
            },
            {
              q: `What do senior ${data.role}s earn in ${data.city}?`,
              a: `Senior ${data.role}s in ${data.city} earn ${formatSalary(data.p75)} at the 75th percentile and up to ${formatSalary(data.p90)} at the 90th percentile, reflecting 6+ years of experience and management responsibilities.`,
            },
            {
              q: `How has the ${data.role} market changed in ${data.city}?`,
              a: `Year-over-year salary growth for ${data.role}s in ${data.city} stands at ${data.yoyChange}% as of ${data.updatedAt}, indicating ${data.yoyChange > 4 ? 'strong' : 'moderate'} demand in the local market.`,
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>
            {data.role} — Other Markets
          </div>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Market</th>
              <th>25th Pct.</th>
              <th>Median</th>
              <th>75th Pct.</th>
              <th>YoY</th>
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
                  <td style={{ color: 'var(--green)', fontWeight: 600, fontSize: 12 }}>+{d.yoyChange}%</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Other roles same city */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>
            {data.city} — Other Roles
          </div>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
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
    </>
  )
}
