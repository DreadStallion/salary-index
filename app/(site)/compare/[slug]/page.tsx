import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getAllCompareSlugs, parseCompareSlug,
  getSalaryData, CITIES, BASE_SALARIES, formatSalary,
} from '@/data/salaries'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllCompareSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const parsed = parseCompareSlug(slug)
  if (!parsed) return {}
  const { role1, role2 } = parsed
  return {
    title: `${role1.label} vs ${role2.label} Salary — 2026 Comparison`,
    description: `Compare ${role1.label} and ${role2.label} salaries across 20 U.S. markets. Median, percentiles, and growth rates side by side. Updated May 2026.`,
  }
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params
  const parsed = parseCompareSlug(slug)
  if (!parsed) notFound()

  const { role1, role2 } = parsed
  const base1 = BASE_SALARIES[role1.slug]
  const base2 = BASE_SALARIES[role2.slug]

  const cityData = CITIES.map(city => {
    const s1 = getSalaryData(role1.slug, city.slug)
    const s2 = getSalaryData(role2.slug, city.slug)
    return { city, s1, s2 }
  }).filter(x => x.s1 && x.s2)

  const winner1 = cityData.filter(x => x.s1!.median >= x.s2!.median).length
  const winner2 = cityData.filter(x => x.s2!.median > x.s1!.median).length
  const overallWinner = base1.median >= base2.median ? role1 : role2
  const diff = Math.abs(base1.median - base2.median)
  const diffPct = Math.round((diff / Math.min(base1.median, base2.median)) * 100)

  const col1 = '#0b1f3a'
  const col2 = '#b8962e'

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 20 }}>
        <a href="/" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Home</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: 'var(--navy)' }}>{role1.label} vs {role2.label}</span>
      </div>

      {/* Header */}
      <div style={{ borderBottom: '2px solid var(--navy)', paddingBottom: 20, marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: 24, margin: 0, color: 'var(--navy)' }}>
            {role1.label} vs {role2.label} — Salary Comparison
          </h1>
          <span className="tag">2026</span>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-muted)' }}>
          20 U.S. markets · May 2026 · BLS OES data
        </p>
      </div>

      {/* Head-to-head national */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 2, marginBottom: 32, alignItems: 'stretch' }}>
        {/* Role 1 */}
        <div style={{ background: col1, padding: '24px 28px', textAlign: 'center' }}>
          <a href={`/role/${role1.slug}`} style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a9bb5', marginBottom: 8 }}>{role1.label}</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#f0ead8', fontFamily: 'Courier New, monospace' }}>{formatSalary(base1.median)}</div>
            <div style={{ fontSize: 12, color: '#8a9bb5', marginTop: 4 }}>national median</div>
            <div style={{ fontSize: 11, color: base1.yoy >= base2.yoy ? '#4ade80' : '#8a9bb5', marginTop: 8 }}>
              +{base1.yoy}% YoY growth
            </div>
          </a>
        </div>

        {/* VS */}
        <div style={{ background: 'white', border: '1px solid var(--border)', padding: '20px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink-muted)' }}>VS</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 4 }}>Difference</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', fontFamily: 'Courier New, monospace' }}>{formatSalary(diff)}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{diffPct}% higher</div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 4 }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: 4 }}>Winner</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)' }}>{overallWinner.label}</div>
          </div>
        </div>

        {/* Role 2 */}
        <div style={{ background: col2, padding: '24px 28px', textAlign: 'center' }}>
          <a href={`/role/${role2.slug}`} style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#f0ead8', marginBottom: 8 }}>{role2.label}</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#0b1f3a', fontFamily: 'Courier New, monospace' }}>{formatSalary(base2.median)}</div>
            <div style={{ fontSize: 12, color: '#5a3e10', marginTop: 4 }}>national median</div>
            <div style={{ fontSize: 11, color: base2.yoy >= base1.yoy ? '#166534' : '#5a3e10', marginTop: 8 }}>
              +{base2.yoy}% YoY growth
            </div>
          </a>
        </div>
      </div>

      {/* Percentiles comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, marginBottom: 32 }}>
        {[
          { label: '25th Percentile', v1: base1.p25, v2: base2.p25 },
          { label: 'Median (50th)',    v1: base1.median, v2: base2.median },
          { label: '75th Percentile', v1: base1.p75, v2: base2.p75 },
          { label: '90th Percentile', v1: base1.p90, v2: base2.p90 },
        ].map(({ label, v1, v2 }) => (
          <div key={label} style={{ background: 'white', border: '1px solid var(--border)', padding: '14px 16px' }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 10, fontWeight: 600 }}>{label}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13, fontFamily: 'Courier New, monospace' }}>
              <span style={{ fontWeight: v1 >= v2 ? 700 : 400, color: v1 >= v2 ? col1 : 'var(--ink-muted)' }}>{formatSalary(v1)}</span>
              <span style={{ fontWeight: v2 >= v1 ? 700 : 400, color: v2 >= v1 ? col2 : 'var(--ink-muted)' }}>{formatSalary(v2)}</span>
            </div>
            <div style={{ height: 4, background: 'var(--paper-alt)', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: col1, borderRadius: 2, width: `${(v1 / (v1 + v2)) * 100}%` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--ink-muted)', marginTop: 3 }}>
              <span>{role1.label.split(' ')[0]}</span>
              <span>{role2.label.split(' ')[0]}</span>
            </div>
          </div>
        ))}
      </div>

      {/* City breakdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <h2 style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0, color: 'var(--ink-muted)' }}>
          Market by Market — Who Pays More?
        </h2>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span style={{ fontSize: 11, color: 'var(--ink-muted)' }}>
          {role1.label}: {winner1} cities · {role2.label}: {winner2} cities
        </span>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Market</th>
            <th>{role1.label}</th>
            <th>{role2.label}</th>
            <th>Difference</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          {cityData
            .sort((a, b) => Math.max(b.s1!.median, b.s2!.median) - Math.max(a.s1!.median, a.s2!.median))
            .map(({ city, s1, s2 }) => {
              const w = s1!.median >= s2!.median ? role1.label : role2.label
              const diff = Math.abs(s1!.median - s2!.median)
              return (
                <tr key={city.slug}>
                  <td style={{ fontWeight: 600 }}>
                    <a href={`/salary/${s1!.median >= s2!.median ? role1.slug : role2.slug}/${city.slug}`}
                      style={{ color: 'var(--navy)', textDecoration: 'none' }}>
                      {city.label}, {city.state}
                    </a>
                  </td>
                  <td style={{
                    fontFamily: 'Courier New, monospace', fontSize: 13,
                    fontWeight: s1!.median >= s2!.median ? 700 : 400,
                    color: s1!.median >= s2!.median ? col1 : 'var(--ink-muted)',
                  }}>
                    {formatSalary(s1!.median)}
                  </td>
                  <td style={{
                    fontFamily: 'Courier New, monospace', fontSize: 13,
                    fontWeight: s2!.median > s1!.median ? 700 : 400,
                    color: s2!.median > s1!.median ? col2 : 'var(--ink-muted)',
                  }}>
                    {formatSalary(s2!.median)}
                  </td>
                  <td style={{ fontFamily: 'Courier New, monospace', fontSize: 12, color: 'var(--ink-muted)' }}>
                    {formatSalary(diff)}
                  </td>
                  <td style={{ fontWeight: 600, fontSize: 12, color: 'var(--green)' }}>{w.split(' ')[0]}</td>
                </tr>
              )
            })}
        </tbody>
      </table>

      {/* Related comparisons */}
      <div style={{ marginTop: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <h2 style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0, color: 'var(--ink-muted)' }}>
            Related comparisons
          </h2>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[role1, role2].flatMap(role =>
            [role1, role2]
              .filter(r => r.slug !== role.slug)
              .slice(0, 3)
              .map(other => ({ a: role, b: other }))
          ).slice(0, 8).map(({ a, b }) => (
            <a key={`${a.slug}-${b.slug}`}
              href={`/compare/${a.slug}-vs-${b.slug}`}
              style={{ padding: '5px 12px', background: 'var(--paper-alt)', border: '1px solid var(--border)', textDecoration: 'none', color: 'var(--ink-muted)', fontSize: 12 }}>
              {a.label} vs {b.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
