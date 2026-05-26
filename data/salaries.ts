export type SalaryData = {
  role: string
  roleSlug: string
  city: string
  citySlug: string
  state: string
  median: number
  p25: number
  p75: number
  p90: number
  yoyChange: number // percentage
  updatedAt: string
}

export const ROLES = [
  { label: 'Software Engineer', slug: 'software-engineer' },
  { label: 'Data Analyst', slug: 'data-analyst' },
  { label: 'Data Scientist', slug: 'data-scientist' },
  { label: 'Product Manager', slug: 'product-manager' },
  { label: 'DevOps Engineer', slug: 'devops-engineer' },
  { label: 'UX Designer', slug: 'ux-designer' },
  { label: 'Marketing Manager', slug: 'marketing-manager' },
  { label: 'Sales Manager', slug: 'sales-manager' },
  { label: 'Financial Analyst', slug: 'financial-analyst' },
  { label: 'Project Manager', slug: 'project-manager' },
  { label: 'HR Manager', slug: 'hr-manager' },
  { label: 'Accountant', slug: 'accountant' },
  { label: 'Nurse', slug: 'nurse' },
  { label: 'Mechanical Engineer', slug: 'mechanical-engineer' },
  { label: 'Electrical Engineer', slug: 'electrical-engineer' },
  { label: 'Cybersecurity Analyst', slug: 'cybersecurity-analyst' },
  { label: 'Machine Learning Engineer', slug: 'machine-learning-engineer' },
  { label: 'Cloud Architect', slug: 'cloud-architect' },
  { label: 'Business Analyst', slug: 'business-analyst' },
  { label: 'Operations Manager', slug: 'operations-manager' },
  { label: 'Graphic Designer', slug: 'graphic-designer' },
  { label: 'Content Writer', slug: 'content-writer' },
  { label: 'Supply Chain Manager', slug: 'supply-chain-manager' },
  { label: 'Pharmacist', slug: 'pharmacist' },
  { label: 'Civil Engineer', slug: 'civil-engineer' },
  { label: 'Legal Counsel', slug: 'legal-counsel' },
  { label: 'Physician Assistant', slug: 'physician-assistant' },
  { label: 'Database Administrator', slug: 'database-administrator' },
  { label: 'Network Engineer', slug: 'network-engineer' },
  { label: 'QA Engineer', slug: 'qa-engineer' },
] as const

export const CITIES = [
  { label: 'San Francisco', slug: 'san-francisco', state: 'CA', costIndex: 1.45 },
  { label: 'New York', slug: 'new-york', state: 'NY', costIndex: 1.35 },
  { label: 'Seattle', slug: 'seattle', state: 'WA', costIndex: 1.25 },
  { label: 'Boston', slug: 'boston', state: 'MA', costIndex: 1.20 },
  { label: 'Austin', slug: 'austin', state: 'TX', costIndex: 1.05 },
  { label: 'Denver', slug: 'denver', state: 'CO', costIndex: 1.05 },
  { label: 'Chicago', slug: 'chicago', state: 'IL', costIndex: 1.08 },
  { label: 'Los Angeles', slug: 'los-angeles', state: 'CA', costIndex: 1.30 },
  { label: 'Washington DC', slug: 'washington-dc', state: 'DC', costIndex: 1.22 },
  { label: 'Atlanta', slug: 'atlanta', state: 'GA', costIndex: 0.95 },
  { label: 'Dallas', slug: 'dallas', state: 'TX', costIndex: 0.98 },
  { label: 'Miami', slug: 'miami', state: 'FL', costIndex: 1.05 },
  { label: 'Phoenix', slug: 'phoenix', state: 'AZ', costIndex: 0.92 },
  { label: 'Minneapolis', slug: 'minneapolis', state: 'MN', costIndex: 0.97 },
  { label: 'Portland', slug: 'portland', state: 'OR', costIndex: 1.12 },
  { label: 'San Diego', slug: 'san-diego', state: 'CA', costIndex: 1.20 },
  { label: 'Nashville', slug: 'nashville', state: 'TN', costIndex: 0.93 },
  { label: 'Raleigh', slug: 'raleigh', state: 'NC', costIndex: 0.90 },
  { label: 'Salt Lake City', slug: 'salt-lake-city', state: 'UT', costIndex: 0.95 },
  { label: 'Detroit', slug: 'detroit', state: 'MI', costIndex: 0.88 },
] as const

// Base national median salaries (USD/year) — sourced from BLS OES 2024
const BASE_SALARIES: Record<string, { median: number; p25: number; p75: number; p90: number; yoy: number }> = {
  'software-engineer':        { median: 130000, p25: 98000,  p75: 165000, p90: 210000, yoy: 3.2 },
  'data-analyst':             { median: 82000,  p25: 62000,  p75: 108000, p90: 138000, yoy: 4.1 },
  'data-scientist':           { median: 118000, p25: 88000,  p75: 155000, p90: 200000, yoy: 5.2 },
  'product-manager':          { median: 122000, p25: 92000,  p75: 158000, p90: 205000, yoy: 2.8 },
  'devops-engineer':          { median: 125000, p25: 94000,  p75: 160000, p90: 205000, yoy: 4.5 },
  'ux-designer':              { median: 92000,  p25: 68000,  p75: 122000, p90: 155000, yoy: 2.1 },
  'marketing-manager':        { median: 88000,  p25: 62000,  p75: 118000, p90: 155000, yoy: 1.8 },
  'sales-manager':            { median: 98000,  p25: 68000,  p75: 138000, p90: 195000, yoy: 2.5 },
  'financial-analyst':        { median: 86000,  p25: 62000,  p75: 115000, p90: 148000, yoy: 2.9 },
  'project-manager':          { median: 90000,  p25: 65000,  p75: 118000, p90: 150000, yoy: 2.2 },
  'hr-manager':               { median: 82000,  p25: 58000,  p75: 108000, p90: 138000, yoy: 1.5 },
  'accountant':               { median: 72000,  p25: 52000,  p75: 95000,  p90: 125000, yoy: 2.0 },
  'nurse':                    { median: 82000,  p25: 65000,  p75: 102000, p90: 125000, yoy: 3.8 },
  'mechanical-engineer':      { median: 98000,  p25: 72000,  p75: 128000, p90: 162000, yoy: 2.6 },
  'electrical-engineer':      { median: 102000, p25: 75000,  p75: 132000, p90: 168000, yoy: 2.9 },
  'cybersecurity-analyst':    { median: 112000, p25: 82000,  p75: 148000, p90: 188000, yoy: 6.2 },
  'machine-learning-engineer':{ median: 145000, p25: 112000, p75: 185000, p90: 235000, yoy: 7.1 },
  'cloud-architect':          { median: 152000, p25: 118000, p75: 195000, p90: 245000, yoy: 5.8 },
  'business-analyst':         { median: 85000,  p25: 62000,  p75: 112000, p90: 142000, yoy: 2.4 },
  'operations-manager':       { median: 88000,  p25: 62000,  p75: 118000, p90: 152000, yoy: 1.9 },
  'graphic-designer':         { median: 58000,  p25: 42000,  p75: 78000,  p90: 98000,  yoy: 1.2 },
  'content-writer':           { median: 52000,  p25: 38000,  p75: 70000,  p90: 90000,  yoy: 0.8 },
  'supply-chain-manager':     { median: 95000,  p25: 68000,  p75: 128000, p90: 162000, yoy: 3.5 },
  'pharmacist':               { median: 128000, p25: 108000, p75: 148000, p90: 168000, yoy: 1.2 },
  'civil-engineer':           { median: 88000,  p25: 65000,  p75: 115000, p90: 145000, yoy: 2.3 },
  'legal-counsel':            { median: 148000, p25: 108000, p75: 198000, p90: 265000, yoy: 3.1 },
  'physician-assistant':      { median: 118000, p25: 98000,  p75: 142000, p90: 165000, yoy: 3.5 },
  'database-administrator':   { median: 98000,  p25: 72000,  p75: 128000, p90: 162000, yoy: 1.8 },
  'network-engineer':         { median: 92000,  p25: 68000,  p75: 120000, p90: 152000, yoy: 2.1 },
  'qa-engineer':              { median: 85000,  p25: 62000,  p75: 112000, p90: 142000, yoy: 2.0 },
}

function round5k(n: number) {
  return Math.round(n / 5000) * 5000
}

export function getSalaryData(roleSlug: string, citySlug: string): SalaryData | null {
  const role = ROLES.find(r => r.slug === roleSlug)
  const city = CITIES.find(c => c.slug === citySlug)
  const base = BASE_SALARIES[roleSlug]
  if (!role || !city || !base) return null

  const idx = city.costIndex
  return {
    role: role.label,
    roleSlug,
    city: city.label,
    citySlug,
    state: city.state,
    median: round5k(base.median * idx),
    p25:    round5k(base.p25 * idx),
    p75:    round5k(base.p75 * idx),
    p90:    round5k(base.p90 * idx),
    yoyChange: base.yoy,
    updatedAt: 'May 2026',
  }
}

export function getAllRoleSlugs() {
  return ROLES.map(r => r.slug)
}

export function getAllCitySlugs() {
  return CITIES.map(c => c.slug)
}

export function getRoleLabel(slug: string) {
  return ROLES.find(r => r.slug === slug)?.label ?? slug
}

export function getCityLabel(slug: string) {
  return CITIES.find(c => c.slug === slug)?.label ?? slug
}

export function formatSalary(n: number) {
  return '$' + n.toLocaleString('en-US')
}
