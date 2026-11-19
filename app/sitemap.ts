import { HIRING_BUDGET_PATH } from '@/data/hiring-budget'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'
import { FINANCIAL_ANALYST_BUDGET_PATH, getBenchmarkSlugs } from '@/data/benchmarks'
import { getAllRoleSlugs, getAllCitySlugs, getSalaryData, getOewsOccupation } from '@/data/salaries'

const BASE = 'https://ussalaryindex.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const roles = getAllRoleSlugs()
  const cities = getAllCitySlugs()

  const salaryPages = roles.flatMap(role =>
    cities.filter(city => getSalaryData(role, city)?.source === 'BLS OEWS').map(city => ({
      url: `${BASE}/salary/${role}/${city}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  const rolePages = roles.filter(getOewsOccupation).map(role => ({
    url: `${BASE}/role/${role}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const cityPages = cities.map(city => ({
    url: `${BASE}/city/${city}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: `${BASE}${HIRING_BUDGET_PATH}`, lastModified: "2026-11-19" },
    { url: `${BASE}${FINANCIAL_ANALYST_BUDGET_PATH}`, lastModified: "2026-11-19" },
    { url: `${BASE}/benchmarks` },
    ...getBenchmarkSlugs().map(role => ({ url: `${BASE}/benchmarks/${role}` })),
    { url: BASE, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/cities`, changeFrequency: 'monthly', priority: 0.6 },
    ...rolePages,
    ...cityPages,
    ...salaryPages,
  ]
}
