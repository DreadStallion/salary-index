import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'
import { getAllRoleSlugs, getAllCitySlugs } from '@/data/salaries'

const BASE = 'https://ussalaryindex.com'

// Must match TOP_CITIES in salary/[role]/[city]/page.tsx
const SALARY_CITIES = ['san-francisco', 'new-york', 'seattle', 'los-angeles', 'chicago', 'austin', 'washington-dc', 'boston']

export default function sitemap(): MetadataRoute.Sitemap {
  const roles = getAllRoleSlugs()
  const cities = getAllCitySlugs()
  const now = new Date().toISOString()

  const salaryPages = roles.flatMap(role =>
    SALARY_CITIES.map(city => ({
      url: `${BASE}/salary/${role}/${city}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  const rolePages = roles.map(role => ({
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
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/cities`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    ...rolePages,
    ...cityPages,
    ...salaryPages,
  ]
}
