import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BENCHMARK_PERIOD, BENCHMARK_RELEASE, BLS_METRO_WORKBOOK, BLS_TABLES, getBenchmark, getBenchmarkSlugs } from '@/data/benchmarks'
import { formatSalary } from '@/data/salaries'

type Props = { params: Promise<{ role: string }> }

export function generateStaticParams() {
  return getBenchmarkSlugs().map(role => ({ role }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params
  const benchmark = getBenchmark(role)
  if (!benchmark) return {}
  return {
    title: `${benchmark.occupation} salaries by metro area | SalaryIndex`,
    description: `Compare official BLS wage percentiles for ${benchmark.occupation} (SOC ${benchmark.code}) across U.S. metro areas. ${BENCHMARK_PERIOD} reference period.`,
    alternates: { canonical: `https://ussalaryindex.com/benchmarks/${role}` },
  }
}

export default async function BenchmarkPage({ params }: Props) {
  const { role } = await params
  const benchmark = getBenchmark(role)
  if (!benchmark) notFound()

  const availableMedians = benchmark.markets.filter(row => row.median !== null)
  const high = availableMedians[0]
  const low = availableMedians[availableMedians.length - 1]

  return (
    <article className="benchmark">
      <nav aria-label="Breadcrumb"><a href="/benchmarks">Verified benchmarks</a> / {benchmark.occupation}</nav>
      <h1>{benchmark.occupation} salaries by metro area</h1>
      <p>SOC {benchmark.code} · Reference period {BENCHMARK_PERIOD} · BLS release <time dateTime={BENCHMARK_RELEASE}>May 15, 2026</time></p>
      {high && low && high.median !== null && low.median !== null && (
        <p className="benchmark-summary">
          Across {availableMedians.length} areas with a published median in this comparison, annual median wages range from{' '}
          <strong>{formatSalary(low.median)}</strong> in {low.market} to{' '}
          <strong>{formatSalary(high.median)}</strong> in {high.market}.
        </p>
      )}
      <p>Figures are annual wages in U.S. dollars. Area names and codes match the BLS workbook. An unavailable cell means the source does not give a numeric value for that percentile.</p>
      <div className="benchmark-scroll" role="region" aria-label="Scrollable wage table" tabIndex={0}>
        <table className="data-table">
          <caption>Annual wage percentiles, {BENCHMARK_PERIOD}</caption>
          <thead>
            <tr><th scope="col">Metropolitan area (CBSA)</th><th scope="col">25th</th><th scope="col">Median</th><th scope="col">75th</th><th scope="col">90th</th></tr>
          </thead>
          <tbody>
            {benchmark.markets.map(row => (
              <tr key={row.area}>
                <td>{row.market} ({row.area})</td>
                {[row.p25, row.median, row.p75, row.p90].map((value, i) => (
                  <td key={i} className={i === 1 ? 'median' : undefined}>{value === null ? 'Unavailable' : formatSalary(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Source: <a href={BLS_TABLES}>BLS Occupational Employment and Wage Statistics</a> · <a href={BLS_METRO_WORKBOOK}>Download the original metropolitan tables</a> · <a href="/methodology">SalaryIndex methodology</a></p>
    </article>
  )
}
