import { notFound } from 'next/navigation'
import { getSalaryData, formatSalary, ROLES, CITIES, getAllRoleSlugs, getAllCitySlugs } from '@/data/salaries'

type Props = { params: Promise<{ role: string; city: string }> }

export async function generateStaticParams() {
  const params: { role: string; city: string }[] = []
  for (const role of getAllRoleSlugs()) {
    for (const city of getAllCitySlugs()) {
      params.push({ role, city })
    }
  }
  return params
}

export default async function WidgetPage({ params }: Props) {
  const { role: roleSlug, city: citySlug } = await params
  const data = getSalaryData(roleSlug, citySlug)
  const roleData = ROLES.find(r => r.slug === roleSlug)
  const cityData = CITIES.find(c => c.slug === citySlug)
  if (!data || !roleData || !cityData) notFound()

  const barMax = data.p90
  const pcts = {
    p25: Math.round((data.p25 / barMax) * 100),
    median: Math.round((data.median / barMax) * 100),
    p75: Math.round((data.p75 / barMax) * 100),
    p90: 100,
  }

  return (
    <div style={{
      fontFamily: 'Georgia, serif',
      background: '#f7f6f2',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      margin: 0,
    }}>
      <div style={{
        width: 360,
        border: '1px solid #d0cdc7',
        background: 'white',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ background: '#0b1f3a', padding: '12px 16px', borderBottom: '3px solid #b8962e' }}>
          <div style={{ fontSize: 11, color: '#8a9bb5', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>
            {roleData.label}
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#f0ead8', fontFamily: 'Courier New, monospace' }}>
            {formatSalary(data.median)}
          </div>
          <div style={{ fontSize: 11, color: '#8a9bb5', marginTop: 2 }}>
            Median salary · {cityData.label}, {cityData.state} · 2026
          </div>
        </div>

        {/* Percentile bars */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #e8e4dc' }}>
          {[
            { label: '25th', value: data.p25, pct: pcts.p25 },
            { label: 'Median', value: data.median, pct: pcts.median, highlight: true },
            { label: '75th', value: data.p75, pct: pcts.p75 },
            { label: '90th', value: data.p90, pct: pcts.p90 },
          ].map(row => (
            <div key={row.label} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, fontSize: 11 }}>
                <span style={{ color: '#4a5568', fontWeight: row.highlight ? 700 : 400 }}>{row.label} pct.</span>
                <span style={{ fontFamily: 'Courier New, monospace', fontWeight: row.highlight ? 700 : 400, color: row.highlight ? '#0b1f3a' : '#4a5568' }}>
                  {formatSalary(row.value)}
                </span>
              </div>
              <div style={{ height: 4, background: '#e8e4dc', borderRadius: 2 }}>
                <div style={{
                  height: 4, borderRadius: 2,
                  width: `${row.pct}%`,
                  background: row.highlight ? '#0b1f3a' : '#b8962e',
                  opacity: row.highlight ? 1 : 0.5,
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #e8e4dc' }}>
          <div style={{ padding: '10px 16px', borderRight: '1px solid #e8e4dc', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>YoY Growth</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1a6640' }}>+{data.yoyChange}%</div>
          </div>
          <div style={{ padding: '10px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>Source</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#0b1f3a' }}>BLS OES</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f7f6f2' }}>
          <span style={{ fontSize: 10, color: '#4a5568' }}>Powered by</span>
          <a href={`https://ussalaryindex.com/salary/${roleSlug}/${citySlug}`}
            target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 12, fontWeight: 700, color: '#0b1f3a', textDecoration: 'none', letterSpacing: '0.05em' }}>
            SALARY<span style={{ color: '#b8962e' }}>INDEX</span>
          </a>
        </div>
      </div>
    </div>
  )
}
