import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'
import { getBenchmarkSlugs } from '@/data/benchmarks'
import { getAllRoleSlugs, getAllCitySlugs, getSalaryData, getOewsOccupation } from '@/data/salaries'

const BASE = 'https://ussalaryindex.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const roles = getAllRoleSlugs()
  const cities = getAllCitySlugs()
  const now = new Date().toISOString()

  const salaryPages = roles.flatMap(role =>
    cities.filter(city => getSalaryData(role, city)?.source === 'BLS OEWS').map(city => ({
      url: `${BASE}/salary/${role}/${city}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  const rolePages = roles.filter(getOewsOccupation).map(role => ({
    url: `${BASE}/role/${role}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const cityPages = cities.map(city => ({
    url: `${BASE}/city/${city}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: `${BASE}/benchmarks` },
    ...getBenchmarkSlugs().map(role => ({ url: `${BASE}/benchmarks/${role}` })),
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/cities`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    ...rolePages,
    ...cityPages,
    ...salaryPages,
  ]
}
