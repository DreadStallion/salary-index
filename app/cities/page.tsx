import { CITIES } from '@/data/salaries'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Salary Data by City — 20 US Cities',
  description: 'Browse salary data for 30 roles across 20 major US cities. Updated monthly.',
}

export default function CitiesPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-white mb-2">Salaries by City</h1>
      <p className="text-gray-400 mb-8">Select a city to see salary ranges for 30 roles.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {CITIES.map(city => (
          <a
            key={city.slug}
            href={`/city/${city.slug}`}
            className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-4 hover:border-blue-500 hover:text-white transition-all"
          >
            <div className="text-white font-medium">{city.label}</div>
            <div className="text-sm text-gray-500 mt-1">{city.state}</div>
          </a>
        ))}
      </div>
    </>
  )
}
