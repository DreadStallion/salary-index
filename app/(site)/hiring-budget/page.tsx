import type { Metadata } from 'next'
import { BENCHMARK_PERIOD, BLS_METRO_WORKBOOK } from '@/data/benchmarks'
import { formatSalary } from '@/data/salaries'
import {
  getHiringBudgetSample, HIRING_BUDGET_PATH, HIRING_BUDGET_PRICE,
  HIRING_BUDGET_SAMPLE_PATH, SAMPLE_BUDGET,
} from '@/data/hiring-budget'

export const metadata: Metadata = {
  title: 'Hiring Budget Brief for U.S. Teams | SalaryIndex',
  description: 'Compare the annual wage budget for up to three roles in three U.S. markets with a custom, source-linked SalaryIndex brief.',
  alternates: { canonical: `https://ussalaryindex.com${HIRING_BUDGET_PATH}` },
}

const contactEmail = 'dreadstalliondev@gmail.com'
const inquiry = 'https://mail.google.com/mail/?' + new URLSearchParams({
  view: 'cm',
  fs: '1',
  to: contactEmail,
  su: 'SalaryIndex hiring budget pilot',
  body: 'Hi Dread Stallion Dev,\n\nI would like to request a hiring budget brief.\n\nRoles and headcount:\nMarkets to compare:\nAnnual wage budget (USD):\nWhen do you need to make the decision?\n',
}).toString()

export default function HiringBudgetPage() {
  const sample = getHiringBudgetSample()
  return (
    <article className="benchmark">
      <nav aria-label="Breadcrumb"><a href="/benchmarks">Verified benchmarks</a> / Hiring budget brief</nav>
      <h1>Compare what it costs to hire your team</h1>
      <p>
        Send us up to three roles and three U.S. metro markets. We match each role to a BLS occupation and compare annual wage costs against your budget.
      </p>
      <div className="benchmark-summary">
        <h2>Custom hiring budget brief · {HIRING_BUDGET_PRICE}</h2>
        <p>Get a short brief and an editable spreadsheet. Both include assumptions, occupation codes, sources and the budget difference by market. We confirm data coverage, scope and timing before payment.</p>
        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 700, color: 'var(--navy)', textDecoration: 'underline' }}>
            Request a hiring budget brief
          </summary>
          <p>Email <strong>{contactEmail}</strong> with the roles and headcount, metro areas, annual wage budget in USD, and your decision deadline.</p>
          <a className="verified-benchmark-link" href={inquiry} target="_blank" rel="noopener noreferrer">Open prefilled draft in Gmail →</a>
        </details>
      </div>

      <h2>Sample brief with a {formatSalary(SAMPLE_BUDGET)} budget</h2>
      <p>Illustrative plan for one hire in each listed occupation. The figures are median annual wages in USD from BLS OEWS, {BENCHMARK_PERIOD}.</p>
      <div className="benchmark-scroll" role="region" aria-label="Sample hiring budget by market" tabIndex={0}>
        <table className="data-table">
          <caption>Annual wage budget by metro area</caption>
          <thead><tr>
            <th scope="col">Metro area</th>
            {sample[0].wages.map(wage => <th key={wage.code} scope="col">{wage.occupation} ({wage.code})</th>)}
            <th scope="col">Total</th><th scope="col">Budget remaining</th>
          </tr></thead>
          <tbody>{sample.map(row => (
            <tr key={row.slug}>
              <td>{row.metro}</td>
              {row.wages.map(wage => <td key={wage.code}>{formatSalary(wage.median)}</td>)}
              <td className="median">{formatSalary(row.total)}</td>
              <td>{row.remaining < 0 ? `${formatSalary(-row.remaining)} over` : formatSalary(row.remaining)}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <p><a href={HIRING_BUDGET_SAMPLE_PATH} download>Download the editable Excel sample</a> · <a href={BLS_METRO_WORKBOOK}>Original BLS metropolitan tables</a></p>
      <p>The example covers wages only. Employer taxes, benefits, recruiting costs and other compensation are outside this pilot.</p>
    </article>
  )
}
