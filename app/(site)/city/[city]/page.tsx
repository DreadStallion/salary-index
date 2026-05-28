import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ROLES, CITIES, getSalaryData, formatSalary, getAllCitySlugs } from '@/data/salaries'
import DatasetCTA from '@/components/DatasetCTA'
import EmailCapture from '@/components/EmailCapture'

type Props = { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  return getAllCitySlugs().map(city => ({ city }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  const cityData = CITIES.find(c => c.slug === city)
  if (!cityData) return {}
  return {
    title: `Salaries in ${cityData.label}, ${cityData.state} — 2026 Guide`,
    description: `Compare salaries for 113 roles in ${cityData.label}. Median, P25, P75, P90 compensation data. Updated May 2026 with BLS OES data.`,
  }
}

export default async function CityPage({ params }: Props) {
  const { city } = await params
  const cityData = CITIES.find(c => c.slug === city)
  if (!cityData) notFound()

  const roleData = ROLES.map(role => ({
    role,
    salary: getSalaryData(role.slug, city),
  })).filter(x => x.salary !== null).sort((a, b) => b.salary!.median - a.salary!.median)

  const topRole = roleData[0]
  const bottomRole = roleData[roleData.length - 1]
  const cityMedian = Math.round(
    roleData.reduce((sum, x) => sum + x.salary!.median, 0) / roleData.length / 5000
  ) * 5000

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ussalaryindex.com' },
      { '@type': 'ListItem', position: 2, name: 'Cities', item: 'https://ussalaryindex.com/cities' },
      { '@type': 'ListItem', position: 3, name: `${cityData.label} Salaries`, item: `https://ussalaryindex.com/city/${city}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 20 }}>
        <a href="/" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Home</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <a href="/cities" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Cities</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: 'var(--navy)' }}>{cityData.label}</span>
      </div>

      {/* Title block */}
      <div style={{ borderBottom: '2px solid var(--navy)', paddingBottom: 20, marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, margin: '0 0 6px', color: 'var(--navy)' }}>
            Salaries in {cityData.label}, {cityData.state}
          </h1>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-muted)' }}>
            {roleData.length} roles tracked · May 2026 · BLS OES
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 4 }}>City Median</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--navy)', fontFamily: 'Courier New, monospace' }}>
            {formatSalary(cityMedian)}
          </div>
        </div>
      </div>

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, marginBottom: 28 }}>
        {[
          { label: 'Highest-Paying Role', value: topRole?.role.label, sub: formatSalary(topRole?.salary?.median ?? 0) },
          { label: 'Median Across All Roles', value: formatSalary(cityMedian), sub: `${roleData.length}-role average` },
          { label: 'Entry-Level Role', value: bottomRole?.role.label, sub: formatSalary(bottomRole?.salary?.median ?? 0) },
        ].map(item => (
          <div key={item.label} style={{ background: 'white', border: '1px solid var(--border)', padding: '14px 18px' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', fontWeight: 600, marginBottom: 6 }}>
              {item.label}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', fontFamily: 'Courier New, monospace' }}>
              {item.value}
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 2 }}>{item.sub}</div>
          </div>
        ))}
      </div>

      {/* Factual answer block */}
      <div style={{
        padding: '16px 20px',
        background: 'white',
        border: '1px solid var(--border)',
        borderLeft: '4px solid var(--gold)',
        marginBottom: 28,
      }}>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--ink)', lineHeight: 1.75 }}>
          The median salary across all tracked roles in <strong>{cityData.label}, {cityData.state}</strong> is <strong style={{ fontFamily: 'Courier New, monospace', color: 'var(--navy)' }}>{formatSalary(cityMedian)}</strong> per year as of May 2026.
          The highest-paying tracked role is <strong>{topRole?.role.label}</strong> at a median of <strong style={{ fontFamily: 'Courier New, monospace' }}>{formatSalary(topRole?.salary?.median ?? 0)}</strong>.
          All figures are sourced from the Bureau of Labor Statistics OES program.
        </p>
      </div>

      <EmailCapture city={cityData.label} />

      <h2 style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
        All Roles in {cityData.label}
        <span style={{ flex: 1, height: 1, background: 'var(--border)', display: 'inline-block' }} />
      </h2>

      <div className="table-scroll" style={{ marginBottom: 36 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>25th Pct.</th>
              <th>Median</th>
              <th>75th Pct.</th>
              <th>90th Pct.</th>
              <th>YoY</th>
            </tr>
          </thead>
          <tbody>
            {roleData.map(({ role, salary: s }) => (
              <tr key={role.slug}>
                <td>
                  <a
                    href={`/salary/${role.slug}/${city}`}
                    style={{ color: 'var(--navy)', fontWeight: 600, textDecoration: 'none' }}
                  >
                    {role.label}
                  </a>
                </td>
                <td style={{ fontFamily: 'Courier New, monospace', fontSize: 13 }}>{formatSalary(s!.p25)}</td>
                <td className="median">{formatSalary(s!.median)}</td>
                <td style={{ fontFamily: 'Courier New, monospace', fontSize: 13 }}>{formatSalary(s!.p75)}</td>
                <td style={{ fontFamily: 'Courier New, monospace', fontSize: 13 }}>{formatSalary(s!.p90)}</td>
                <td style={{ color: 'var(--green)', fontWeight: 600, fontSize: 12 }}>+{s!.yoyChange}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DatasetCTA city={cityData!.label} />
    </>
  )
}
