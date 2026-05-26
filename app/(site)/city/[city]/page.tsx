import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ROLES, CITIES, getSalaryData, formatSalary, getAllCitySlugs } from '@/data/salaries'

type Props = { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  return getAllCitySlugs().map(city => ({ city }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  const cityData = CITIES.find(c => c.slug === city)
  if (!cityData) return {}
  return {
    title: `Salaries in ${cityData.label}, ${cityData.state} — 2026 Guide`,
    description: `Compare salaries for 113 roles in ${cityData.label}. Updated May 2026 with BLS OES data.`,
  }
}

export default async function CityPage({ params }: Props) {
  const { city } = await params
  const cityData = CITIES.find(c => c.slug === city)
  if (!cityData) notFound()

  const roleData = ROLES.map(role => ({
    role,
    salary: getSalaryData(role.slug, city),
  })).filter(x => x.salary !== null).sort((a, b) => b.salary!.median - a.salary!.median)

  return (
    <>
      <div className="mb-3 text-sm text-gray-500">
        <a href="/" className="hover:text-gray-300">Home</a>
        {' › '}
        <a href="/cities" className="hover:text-gray-300">Cities</a>
        {' › '}
        <span className="text-gray-400">{cityData.label}</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">
        Salaries in {cityData.label}, {cityData.state}
      </h1>
      <p className="text-gray-500 text-sm mb-8">Updated May 2026 · BLS OES data</p>

      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-sm">
          <thead className="bg-gray-900 text-gray-400">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Role</th>
              <th className="text-right px-4 py-3 font-medium">25th</th>
              <th className="text-right px-4 py-3 font-medium">Median</th>
              <th className="text-right px-4 py-3 font-medium">75th</th>
              <th className="text-right px-4 py-3 font-medium">90th</th>
            </tr>
          </thead>
          <tbody>
            {roleData.map(({ role, salary: s }) => (
              <tr key={role.slug} className="border-t border-gray-800 hover:bg-gray-900 transition-colors">
                <td className="px-4 py-3">
                  <a
                    href={`/salary/${role.slug}/${city}`}
                    className="text-blue-400 hover:text-blue-300 font-medium"
                  >
                    {role.label}
                  </a>
                </td>
                <td className="text-right px-4 py-3 text-gray-400">{formatSalary(s!.p25)}</td>
                <td className="text-right px-4 py-3 text-white font-semibold">{formatSalary(s!.median)}</td>
                <td className="text-right px-4 py-3 text-gray-400">{formatSalary(s!.p75)}</td>
                <td className="text-right px-4 py-3 text-gray-400">{formatSalary(s!.p90)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
