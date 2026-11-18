import officialBenchmarks from './oews-benchmarks.json'

export const BENCHMARK_PERIOD = 'May 2025'
export const BENCHMARK_RELEASE = '2026-05-15'
export const BLS_TABLES = 'https://www.bls.gov/oes/tables.htm#2025'
export const BLS_METRO_WORKBOOK = 'https://www.bls.gov/oes/special-requests/oesm25ma.zip'

type Market = {
  area: string
  market: string
  p25: number | null
  median: number | null
  p75: number | null
  p90: number | null
}

const benchmarks: Record<string, { code: string; occupation: string; markets: Market[] }> = officialBenchmarks

export function getBenchmark(slug: string) {
  return Object.prototype.hasOwnProperty.call(benchmarks, slug) ? benchmarks[slug] : undefined
}

export function getBenchmarkSlugs() {
  return Object.keys(benchmarks)
}
