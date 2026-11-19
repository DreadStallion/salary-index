import { BENCHMARK_PERIOD, BLS_METRO_WORKBOOK } from '@/data/benchmarks'
import { getHiringBudgetSample, SAMPLE_BUDGET } from '@/data/hiring-budget'

export const dynamic = 'force-static'

export function GET() {
  const sample = getHiringBudgetSample()
  const rows = [
    ['Metro area', ...sample[0].wages.map(wage => `${wage.occupation} (${wage.code}) median USD`), 'Annual wage budget USD', 'Total wages USD', 'Budget remaining USD', 'Reference period', 'Source'],
    ...sample.map((row, index) => [
      row.metro, ...row.wages.map(wage => wage.median), SAMPLE_BUDGET,
      `=SUM(B${index + 2}:D${index + 2})`, `=E${index + 2}-F${index + 2}`, BENCHMARK_PERIOD, BLS_METRO_WORKBOOK,
    ]),
  ]
  const csv = rows.map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\r\n')
  return new Response(csv + '\r\n', { headers: { 'Content-Type': 'text/csv; charset=utf-8' } })
}
