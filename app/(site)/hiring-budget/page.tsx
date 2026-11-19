import type { Metadata } from 'next'
import { BENCHMARK_PERIOD, BLS_METRO_WORKBOOK } from '@/data/benchmarks'
import { formatSalary } from '@/data/salaries'
import {
  getHiringBudgetSample, HIRING_BUDGET_PATH, HIRING_BUDGET_PRICE,
  HIRING_BUDGET_SAMPLE_PATH, SAMPLE_BUDGET,
} from '@/data/hiring-budget'

export const metadata: Metadata = {
  title: 'Hiring Budget Brief for U.S. Teams | SalaryIndex',
  description: 'Get a client-ready hiring recommendation, two costed alternatives and an editable model backed by BLS wage data.',
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
  const chicago = sample.find(row => row.slug === 'chicago')
  const austin = sample.find(row => row.slug === 'austin')
  const analyst = chicago?.wages.find(wage => wage.code === '13-2051')
  if (!chicago || !austin || !analyst) throw new Error('Missing wage inputs for the sample decision.')
  const staggeredCost = chicago.total - analyst.median / 2
  const scenarios = [
    { label: 'Chicago · all hires start immediately', firstYear: chicago.total, annualized: chicago.total },
    { label: 'Austin · all hires start immediately', firstYear: austin.total, annualized: austin.total },
    { label: 'Chicago · analyst starts six months later', firstYear: staggeredCost, annualized: chicago.total },
  ]
  return (
    <article className="benchmark">
      <nav aria-label="Breadcrumb"><a href="/benchmarks">Verified benchmarks</a> / Hiring budget brief</nav>
      <h1>Fit your hiring plan to your budget.</h1>
      <p>
        Send us up to three roles, three U.S. metro markets and your wage budget. Get a client-ready recommendation, two costed alternatives and an editable model backed by BLS data.
      </p>
      <div className="benchmark-summary">
        <h2>Custom hiring budget brief · {HIRING_BUDGET_PRICE}</h2>
        <ul style={{ paddingLeft: 20, listStyle: 'disc' }}>
          <li>A one-page recommendation with the best-fit scenario and its main trade-off.</li>
          <li>Two costed alternatives, showing first-year wages and annualized wages separately.</li>
          <li>An editable Excel model with assumptions, occupation codes and BLS sources.</li>
        </ul>
        <p>We confirm data coverage, scope and timing before payment.</p>
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
      <p className="benchmark-summary">
        <strong>Sample recommendation:</strong> If the analyst role can start six months later, Chicago costs{' '}
        <strong>{formatSalary(staggeredCost)}</strong> in the first 12 months, leaving {formatSalary(SAMPLE_BUDGET - staggeredCost)} before contingency.
        The full team still costs {formatSalary(chicago.total)} per year after all hires start. If the analyst is needed immediately, revise the plan or increase the budget.
      </p>
      <div className="benchmark-scroll" role="region" aria-label="Sample hiring alternatives" tabIndex={0}>
        <table className="data-table">
          <caption>Decision options · wage costs at BLS medians</caption>
          <thead><tr><th scope="col">Scenario</th><th scope="col">First 12 months</th><th scope="col">Annualized wages</th><th scope="col">First-year budget difference</th></tr></thead>
          <tbody>{scenarios.map(row => {
            const difference = SAMPLE_BUDGET - row.firstYear
            return (
              <tr key={row.label}>
                <td>{row.label}</td><td>{formatSalary(row.firstYear)}</td><td>{formatSalary(row.annualized)}</td>
                <td>{formatSalary(Math.abs(difference))} {difference < 0 ? 'over' : 'remaining'}</td>
              </tr>
            )
          })}</tbody>
        </table>
      </div>
      <p>Scenario totals exclude contingency. The linked Excel lets you adjust headcount and contingency for the full-year market comparison.</p>
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
