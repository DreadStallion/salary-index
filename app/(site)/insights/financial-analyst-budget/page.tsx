import type { Metadata } from 'next'
import {
  BENCHMARK_PERIOD, BLS_METRO_WORKBOOK, FINANCIAL_ANALYST_BUDGET_PATH,
  FINANCIAL_ANALYST_PILOT_MARKETS, getBenchmark,
} from '@/data/benchmarks'
import { formatSalary } from '@/data/salaries'

const budget = 95000
const title = 'Where does a $95,000 budget go furthest for hiring a financial analyst?'
const description = 'Compare a $95,000 annual wage budget with official BLS financial analyst wages across U.S. metro areas.'

export const metadata: Metadata = {
  title: `${title} | SalaryIndex`,
  description,
  alternates: { canonical: `https://ussalaryindex.com${FINANCIAL_ANALYST_BUDGET_PATH}` },
}

export default function FinancialAnalystBudget() {
  const benchmark = getBenchmark('financial-analyst')
  if (!benchmark) throw new Error('Financial analyst benchmark is required for the budget comparison.')

  const ranked = benchmark.markets.flatMap(row =>
    row.median === null ? [] : [{ ...row, median: row.median }],
  ).sort((a, b) => a.median - b.median)
  const atOrAbove = ranked.filter(row => budget >= row.median)
  const featured = ranked.filter(row => FINANCIAL_ANALYST_PILOT_MARKETS.includes(row.slug))

  return (
    <article className="benchmark">
      <nav aria-label="Breadcrumb"><a href="/benchmarks/financial-analyst">Financial analyst benchmarks</a></nav>
      <h1>{title}</h1>
      <p className="benchmark-summary">
        An annual wage budget of <strong>{formatSalary(budget)}</strong> meets or exceeds the published median in{' '}
        <strong>{atOrAbove.length} of {ranked.length} covered metro areas</strong>.{' '}
        Lowest median among the covered markets: <strong>{ranked[0].market}, {formatSalary(ranked[0].median)}</strong>.
      </p>
      <p>
        Figures are for {benchmark.occupation} (SOC {benchmark.code}) in the BLS OEWS {BENCHMARK_PERIOD} reference period.
        Use this comparison to shortlist markets. Experience, role scope and compensation components can affect the offer.
      </p>

      <h2>Five hiring markets at a glance</h2>
      <div className="benchmark-scroll" role="region" aria-label="Five-market budget comparison" tabIndex={0}>
        <table className="data-table">
          <caption>Annual wages in USD and the position of a {formatSalary(budget)} budget</caption>
          <thead><tr><th scope="col">Metropolitan area</th><th scope="col">25th percentile</th><th scope="col">Median</th><th scope="col">Budget position</th></tr></thead>
          <tbody>
            {featured.map(row => (
              <tr key={row.area}>
                <td><a href={`/salary/financial-analyst/${row.slug}`}>{row.market}</a></td>
                <td>{row.p25 === null ? 'Unavailable' : formatSalary(row.p25)}</td>
                <td>{formatSalary(row.median)}</td>
                <td>{budget >= row.median ? 'At or above median' : row.p25 === null ? 'Below median' : budget < row.p25 ? 'Below 25th percentile' : 'From 25th to below median'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Markets where the budget reaches the median</h2>
      <ul className="benchmark-list">
        {atOrAbove.map(row => <li key={row.area}>{row.market} <strong>{formatSalary(row.median)}</strong></li>)}
      </ul>
      <p>The comparison covers the SalaryIndex markets with a published median. It assesses annual wages and excludes employer costs.</p>
      <p><a href="/benchmarks/financial-analyst">See every market and percentile</a> · <a href={BLS_METRO_WORKBOOK}>Download the original BLS tables</a></p>
    </article>
  )
}
