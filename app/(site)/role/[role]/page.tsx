import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ROLES, CITIES, getSalaryData, formatSalary, getAllRoleSlugs } from '@/data/salaries'

type Props = { params: Promise<{ role: string }> }

export async function generateStaticParams() {
  return getAllRoleSlugs().map(role => ({ role }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params
  const roleData = ROLES.find(r => r.slug === role)
  if (!roleData) return {}
  return {
    title: `${roleData.label} Salary by City — 2026 Compensation Data`,
    description: `Compare ${roleData.label} salaries across 20 U.S. markets. Median, 25th, 75th, and 90th percentile data. Updated May 2026.`,
  }
}

export default async function RolePage({ params }: Props) {
  const { role } = await params
  const roleData = ROLES.find(r => r.slug === role)
  if (!roleData) notFound()

  const cityData = CITIES.map(city => ({
    city,
    salary: getSalaryData(role, city.slug),
  })).filter(x => x.salary !== null).sort((a, b) => b.salary!.median - a.salary!.median)

  const nationalMedian = Math.round(
    cityData.reduce((sum, x) => sum + x.salary!.median, 0) / cityData.length / 5000
  ) * 5000

  const topCity = cityData[0]
  const bottomCity = cityData[cityData.length - 1]

  return (
    <>
      <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 20 }}>
        <a href="/" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Roles</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: 'var(--navy)' }}>{roleData.label}</span>
      </div>

      <div style={{ borderBottom: '2px solid var(--navy)', paddingBottom: 20, marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, margin: '0 0 6px', color: 'var(--navy)' }}>
            {roleData.label} Salary — U.S. Market Overview
          </h1>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-muted)' }}>
            20 metropolitan markets · May 2026 · BLS OES
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 4 }}>National Median</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--navy)', fontFamily: 'Courier New, monospace' }}>
            {formatSalary(nationalMedian)}
          </div>
        </div>
      </div>

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, marginBottom: 28 }}>
        {[
          { label: 'Highest Market', value: topCity?.city.label, sub: formatSalary(topCity?.salary?.median ?? 0) },
          { label: 'National Median', value: formatSalary(nationalMedian), sub: '20-market average' },
          { label: 'Lowest Market', value: bottomCity?.city.label, sub: formatSalary(bottomCity?.salary?.median ?? 0) },
        ].map(item => (
          <div key={item.label} style={{ background: 'white', border: '1px solid var(--border)', padding: '14px 18px' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', fontWeight: 600, marginBottom: 6 }}>
              {item.label}
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', fontFamily: 'Courier New, monospace' }}>
              {item.value}
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 2 }}>{item.sub}</div>
          </div>
        ))}
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Market</th>
            <th>25th Pct.</th>
            <th>Median</th>
            <th>75th Pct.</th>
            <th>90th Pct.</th>
            <th>YoY</th>
          </tr>
        </thead>
        <tbody>
          {cityData.map(({ city, salary: s }) => (
            <tr key={city.slug}>
              <td>
                <a href={`/salary/${role}/${city.slug}`} style={{ color: 'var(--navy)', fontWeight: 600, textDecoration: 'none' }}>
                  {city.label}, {city.state}
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
    </>
  )
}
