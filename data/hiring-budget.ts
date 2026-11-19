import { getBenchmark } from '@/data/benchmarks'

export const HIRING_BUDGET_PATH = '/hiring-budget'
export const HIRING_BUDGET_SAMPLE_PATH = '/hiring-budget-sample.csv'
export const HIRING_BUDGET_PRICE = '€149'
export const SAMPLE_BUDGET = 300000

const roles = ['financial-analyst', 'accountant', 'marketing-manager']
const markets = ['chicago', 'denver', 'austin']

export function getHiringBudgetSample() {
  return markets.map(slug => {
    const wages = roles.map(role => {
      const benchmark = getBenchmark(role)
      const row = benchmark?.markets.find(market => market.slug === slug)
      if (!benchmark || !row || row.median === null) {
        throw new Error(`Missing verified wage for ${role} in ${slug}`)
      }
      return { occupation: benchmark.occupation, code: benchmark.code, metro: row.market, median: row.median }
    })
    const total = wages.reduce((sum, row) => sum + row.median, 0)
    return { slug, metro: wages[0].metro, wages, total, remaining: SAMPLE_BUDGET - total }
  })
}
