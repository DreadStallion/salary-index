import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  STATE_META, getUniqueStates, getCitiesForState,
  getStateSalaryRanking, formatSalary, ROLES,
} from '@/data/salaries'

type Props = { params: Promise<{ state: string }> }

export async function generateStaticParams() {
  return getUniqueStates()
    .filter(code => STATE_META[code])
    .map(code => ({ state: STATE_META[code].slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params
  const entry = Object.entries(STATE_META).find(([, v]) => v.slug === stateSlug)
  if (!entry) return {}
  const [, meta] = entry
  return {
    title: `Highest Paying Jobs in ${meta.name} — 2026 Salary Rankings`,
    description: `See the top paying jobs in ${meta.name} ranked by median salary across 113 roles. Official BLS data, updated May 2026.`,
  }
}

export default async function StatePage({ params }: Props) {
  const { state: stateSlug } = await params
  const entry = Object.entries(STATE_META).find(([, v]) => v.slug === stateSlug)
  if (!entry) notFound()

  const [stateCode, meta] = entry
  const cities = getCitiesForState(stateCode)
  const ranking = getStateSalaryRanking(stateCode)
  const top = ranking[0]
  const nationalAvg = Math.round(
    ranking.reduce((s, r) => s + r.nationalMedian, 0) / ranking.length / 5000
  ) * 5000
  const stateAvg = Math.round(
    ranking.reduce((s, r) => s + r.median, 0) / ranking.length / 5000
  ) * 5000
  const vsNational = stateAvg > nationalAvg ? `+${Math.round((stateAvg / nationalAvg - 1) * 100)}%` : `${Math.round((stateAvg / nationalAvg - 1) * 100)}%`
  const isAbove = stateAvg >= nationalAvg

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 20 }}>
        <a href="/" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Home</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: 'var(--navy)' }}>Highest Paying Jobs in {meta.name}</span>
      </div>

      {/* Header */}
      <div style={{ borderBottom: '2px solid var(--navy)', paddingBottom: 20, marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <h1 style={{ fontSize: 26, margin: 0, color: 'var(--navy)' }}>
              Highest Paying Jobs in {meta.name}
            </h1>
            <span className="tag">2026</span>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-muted)' }}>
            {cities.length} {cities.length === 1 ? 'market' : 'markets'} · {ROLES.length} roles ranked by median salary · BLS OES
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 4 }}>State Avg vs National</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: isAbove ? 'var(--green)' : 'var(--red)', fontFamily: 'Courier New, monospace' }}>
            {vsNational}
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, marginBottom: 28 }}>
        {[
          { label: 'Top Paying Role', value: top.role, sub: formatSalary(top.median) + ' median' },
          { label: 'State Median (all roles)', value: formatSalary(stateAvg), sub: `${isAbove ? 'above' : 'below'} national avg` },
          { label: 'Available Markets', value: cities.map(c => c.label).join(', '), sub: `${cities.length} ${cities.length === 1 ? 'city' : 'cities'} tracked` },
        ].map(item => (
          <div key={item.label} style={{ background: 'white', border: '1px solid var(--border)', padding: '14px 18px' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', fontWeight: 600, marginBottom: 6 }}>{item.label}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', fontFamily: 'Courier New, monospace' }}>{item.value}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 2 }}>{item.sub}</div>
          </div>
        ))}
      </div>

      {/* Rankings table */}
      <table className="data-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'left', width: 40 }}>#</th>
            <th style={{ textAlign: 'left' }}>Role</th>
            <th>25th Pct.</th>
            <th>Median</th>
            <th>75th Pct.</th>
            <th>90th Pct.</th>
            <th>vs National</th>
            <th>YoY</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((r, i) => {
            const diff = r.median - r.nationalMedian
            const diffPct = Math.round((diff / r.nationalMedian) * 100)
            return (
              <tr key={r.slug}>
                <td style={{ color: 'var(--ink-muted)', fontSize: 12, fontWeight: 600 }}>#{i + 1}</td>
                <td>
                  <a href={`/role/${r.slug}`} style={{ color: 'var(--navy)', fontWeight: 600, textDecoration: 'none' }}>
                    {r.role}
                  </a>
                </td>
                <td style={{ fontFamily: 'Courier New, monospace', fontSize: 13 }}>{formatSalary(r.p25)}</td>
                <td className="median">{formatSalary(r.median)}</td>
                <td style={{ fontFamily: 'Courier New, monospace', fontSize: 13 }}>{formatSalary(r.p75)}</td>
                <td style={{ fontFamily: 'Courier New, monospace', fontSize: 13 }}>{formatSalary(r.p90)}</td>
                <td style={{ fontWeight: 600, fontSize: 12, color: diff >= 0 ? 'var(--green)' : 'var(--red)' }}>
                  {diff >= 0 ? '+' : ''}{diffPct}%
                </td>
                <td style={{ color: 'var(--green)', fontWeight: 600, fontSize: 12 }}>+{r.yoyChange}%</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Cities in state */}
      <div style={{ marginTop: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <h2 style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0, color: 'var(--ink-muted)' }}>
            Markets tracked in {meta.name}
          </h2>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {cities.map(city => (
            <a key={city.slug} href={`/city/${city.slug}`} style={{
              padding: '6px 14px', background: 'white',
              border: '1px solid var(--border)', textDecoration: 'none',
              color: 'var(--navy)', fontSize: 13, fontWeight: 600,
              borderLeft: '3px solid var(--gold)',
            }}>
              {city.label}
            </a>
          ))}
        </div>
      </div>

      {/* Other states */}
      <div style={{ marginTop: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <h2 style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0, color: 'var(--ink-muted)' }}>
            Browse other states
          </h2>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {Object.entries(STATE_META)
            .filter(([code]) => code !== stateCode)
            .map(([, s]) => (
              <a key={s.slug} href={`/state/${s.slug}`} style={{
                padding: '4px 10px', background: 'var(--paper-alt)',
                border: '1px solid var(--border)', textDecoration: 'none',
                color: 'var(--ink-muted)', fontSize: 12,
              }}>
                {s.name}
              </a>
            ))}
        </div>
      </div>
    </>
  )
}
