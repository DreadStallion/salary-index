import { getBenchmark } from '@/data/benchmarks'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ROLES, CITIES, getSalaryData, formatSalary, getAllRoleSlugs, getOewsOccupation, getNationalBenchmark, OEWS_SOURCE } from '@/data/salaries'

type Props = { params: Promise<{ role: string }> }

export async function generateStaticParams() {
  return getAllRoleSlugs().map(role => ({ role }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params
  const roleData = ROLES.find(r => r.slug === role)
  if (!roleData) return {}
  return {
    alternates: { canonical: `https://ussalaryindex.com/role/${role}` },
    ...(!getOewsOccupation(role) ? { robots: { index: false, follow: true } } : {}),
    title: `${roleData.label} Salary by City — 2026 U.S. Data`,
    description: `Compare ${roleData.label} salaries across 30 U.S. markets. Median, p25, p75, p90 percentile data from official OEWS tables.`,
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

  const marketAverage = Math.round(
    cityData.reduce((sum, x) => sum + x.salary!.median, 0) / cityData.length
  )

  const occupation = getOewsOccupation(role)
  const benchmark = getNationalBenchmark(role)
  if (!cityData.length) return <section className="benchmark"><h1>{roleData.label} salaries</h1><p>SalaryIndex has no verified metropolitan wages for this role in this release.</p><a href="/benchmarks">Browse verified benchmarks</a></section>

  const topCity = cityData[0]
  const bottomCity = cityData[cityData.length - 1]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ussalaryindex.com' },
          { '@type': 'ListItem', position: 2, name: `${roleData.label} Salary`, item: `https://ussalaryindex.com/role/${role}` },
        ],
      },
      {
        '@type': 'Occupation',
        name: roleData.label,
        description: `${roleData.label} salary data across 30 major U.S. metropolitan markets. Includes official BLS OEWS figures.`,
        estimatedSalary: [
          {
            '@type': 'MonetaryAmountDistribution',
            name: 'Average of market medians',
            currency: 'USD',
            duration: 'P1Y',
            percentile25: cityData[Math.floor(cityData.length * 0.75)]?.salary?.median ?? 0,
            median: marketAverage,
            percentile75: cityData[Math.floor(cityData.length * 0.25)]?.salary?.median ?? 0,
          },
        ],
        occupationLocation: { '@type': 'Country', name: 'United States' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the average ${roleData.label} salary in the United States?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The average of the market medians for ${roleData.label} across the tracked U.S. markets is ${formatSalary(marketAverage)} per year using the SalaryIndex comparison figures.`,
            },
          },
          {
            '@type': 'Question',
            name: `Which city pays the most for ${roleData.label}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${topCity?.city.label} is the highest-paying market for ${roleData.label}, with a median salary of ${formatSalary(topCity?.salary?.median ?? 0)} per year.`,
            },
          },
          {
            '@type': 'Question',
            name: `What is the entry-level ${roleData.label} salary?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Entry-level ${roleData.label} salaries (25th percentile) range from ${formatSalary(bottomCity?.salary?.p25 ?? 0)} in ${bottomCity?.city.label} to ${formatSalary(topCity?.salary?.p25 ?? 0)} in ${topCity?.city.label}.`,
            },
          },
          {
            '@type': 'Question',
            name: `How much do senior ${roleData.label}s make?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Senior ${roleData.label}s (90th percentile) in top markets like ${topCity?.city.label} earn ${formatSalary(topCity?.salary?.p90 ?? 0)} per year.`,
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
            {cityData.length} metropolitan markets · BLS OEWS · May 2025
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 4 }}>Average of Market Medians</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--navy)', fontFamily: 'Courier New, monospace' }}>
            {formatSalary(marketAverage)}
          </div>
        </div>
      </div>

      {/* Factual answer block */}
      <div style={{
        padding: '16px 20px',
        background: 'white',
        border: '1px solid var(--border)',
        borderLeft: '4px solid var(--gold)',
        marginBottom: 28,
      }}>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--ink)', lineHeight: 1.8 }}>
          The average of the market medians for <strong>{roleData.label}</strong> across the tracked U.S. markets is{' '}
          <strong style={{ fontFamily: 'Courier New, monospace', color: 'var(--navy)' }}>{formatSalary(marketAverage)}</strong> per year for the tracked markets.
          {' '}The highest-paying market is <strong>{topCity?.city.label}</strong> at{' '}
          <strong style={{ fontFamily: 'Courier New, monospace' }}>{formatSalary(topCity?.salary?.median ?? 0)}</strong>.
          {' '}The table shows the markets with complete published annual wage percentiles.
          {occupation && benchmark?.source === 'BLS OEWS' && (
            <> The <a href={OEWS_SOURCE}>official U.S. median</a> for {occupation.occupation} (SOC {occupation.code}) is{' '}
              <strong>{formatSalary(benchmark.median)}</strong> for May 2025.</>
          )}
        </p>
      </div>

      {getBenchmark(role) && (
        <p style={{ marginBottom: 24 }}><a className="verified-benchmark-link" href={`/benchmarks/${role}`}>See the BLS-only metropolitan comparison →</a></p>
      )}

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, marginBottom: 28 }}>
        {[
          { label: 'Highest Market', value: topCity?.city.label, sub: formatSalary(topCity?.salary?.median ?? 0) },
          { label: 'Average of Market Medians', value: formatSalary(marketAverage), sub: 'Tracked-market average' },
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


      <h2 style={{
        fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--ink-muted)', fontWeight: 600, margin: '0 0 12px',
        fontFamily: 'Georgia, serif', display: 'flex', alignItems: 'center', gap: 12,
      }}>
        Salary by Market
        <span style={{ flex: 1, height: 1, background: 'var(--border)', display: 'inline-block' }} />
      </h2>

      <div className="table-scroll" style={{ marginBottom: 36 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Market</th>
              <th>25th Pct.</th>
              <th>Median</th>
              <th>75th Pct.</th>
              <th>90th Pct.</th>
              <th>Source</th>
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
                <td>{s!.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </>
  )
}
