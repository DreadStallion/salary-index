import type { Metadata } from 'next'
import { BENCHMARK_PERIOD, getBenchmark, getBenchmarkSlugs } from '@/data/benchmarks'

export const metadata: Metadata = {
  title: 'Verified U.S. salary benchmarks | SalaryIndex',
  description: 'Compare U.S. metropolitan wage percentiles from the official May 2025 BLS OEWS tables.',
  alternates: { canonical: 'https://ussalaryindex.com/benchmarks' },
}

export default function BenchmarksPage() {
  return (
    <section className="benchmark">
      <h1>Verified U.S. salary benchmarks</h1>
      <p>Compare annual wages across U.S. metro areas using the {BENCHMARK_PERIOD} BLS OEWS tables. Each comparison shows the occupation and area codes used in the original source.</p>
      <ul className="benchmark-list">
        {getBenchmarkSlugs().map(slug => {
          const benchmark = getBenchmark(slug)
          if (!benchmark) return null
          return <li key={slug}><a href={`/benchmarks/${slug}`}>{benchmark.occupation}</a> <span>SOC {benchmark.code}</span></li>
        })}
      </ul>
    </section>
  )
}
