import oewsSnapshot from './oews-may-2025.json'

type WagePercentiles = number[]
type OewsOccupation = {
  code: string
  occupation: string
  national?: WagePercentiles
  markets: Record<string, WagePercentiles>
}

const OEWS = oewsSnapshot as Record<string, OewsOccupation>
export const OEWS_PERIOD = 'May 2025'
export const OEWS_SOURCE = 'https://www.bls.gov/oes/tables.htm'

export function getOewsOccupation(roleSlug: string) {
  return OEWS[roleSlug]
}

export function getNationalBenchmark(roleSlug: string) {
  const national = OEWS[roleSlug]?.national
  if (!national) return null
  const [p25, median, p75, p90] = national
  return { median, p25, p75, p90, source: 'BLS OEWS' }
}

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
  source: string
  updatedAt: string
}

export const ROLES = [
  // Technology
  { label: 'Software Engineer',           slug: 'software-engineer' },
  { label: 'Full Stack Developer',         slug: 'full-stack-developer' },
  { label: 'Frontend Developer',           slug: 'frontend-developer' },
  { label: 'Backend Developer',            slug: 'backend-developer' },
  { label: 'iOS Developer',                slug: 'ios-developer' },
  { label: 'Android Developer',            slug: 'android-developer' },
  { label: 'Data Analyst',                 slug: 'data-analyst' },
  { label: 'Data Scientist',               slug: 'data-scientist' },
  { label: 'Data Engineer',                slug: 'data-engineer' },
  { label: 'AI Engineer',                  slug: 'ai-engineer' },
  { label: 'Machine Learning Engineer',    slug: 'machine-learning-engineer' },
  { label: 'DevOps Engineer',              slug: 'devops-engineer' },
  { label: 'Site Reliability Engineer',    slug: 'site-reliability-engineer' },
  { label: 'Platform Engineer',            slug: 'platform-engineer' },
  { label: 'Cloud Architect',              slug: 'cloud-architect' },
  { label: 'Solutions Architect',          slug: 'solutions-architect' },
  { label: 'Cybersecurity Analyst',        slug: 'cybersecurity-analyst' },
  { label: 'Blockchain Developer',         slug: 'blockchain-developer' },
  { label: 'Embedded Systems Engineer',    slug: 'embedded-systems-engineer' },
  { label: 'Database Administrator',       slug: 'database-administrator' },
  { label: 'Network Engineer',             slug: 'network-engineer' },
  { label: 'Systems Administrator',        slug: 'systems-administrator' },
  { label: 'IT Manager',                   slug: 'it-manager' },
  { label: 'QA Engineer',                  slug: 'qa-engineer' },
  { label: 'Technical Writer',             slug: 'technical-writer' },

  // Healthcare
  { label: 'Registered Nurse',             slug: 'nurse' },
  { label: 'Nurse Practitioner',           slug: 'nurse-practitioner' },
  { label: 'Physician',                    slug: 'physician' },
  { label: 'Surgeon',                      slug: 'surgeon' },
  { label: 'Anesthesiologist',             slug: 'anesthesiologist' },
  { label: 'Radiologist',                  slug: 'radiologist' },
  { label: 'Dentist',                      slug: 'dentist' },
  { label: 'Dental Hygienist',             slug: 'dental-hygienist' },
  { label: 'Pharmacist',                   slug: 'pharmacist' },
  { label: 'Physician Assistant',          slug: 'physician-assistant' },
  { label: 'Physical Therapist',           slug: 'physical-therapist' },
  { label: 'Occupational Therapist',       slug: 'occupational-therapist' },
  { label: 'Medical Laboratory Technician',slug: 'medical-laboratory-technician' },
  { label: 'Medical Coder',                slug: 'medical-coder' },
  { label: 'Healthcare Administrator',     slug: 'healthcare-administrator' },

  // Finance & Legal
  { label: 'Financial Analyst',            slug: 'financial-analyst' },
  { label: 'Accountant',                   slug: 'accountant' },
  { label: 'Auditor',                      slug: 'auditor' },
  { label: 'Tax Specialist',               slug: 'tax-specialist' },
  { label: 'Controller',                   slug: 'controller' },
  { label: 'CFO',                          slug: 'cfo' },
  { label: 'Investment Banker',            slug: 'investment-banker' },
  { label: 'Portfolio Manager',            slug: 'portfolio-manager' },
  { label: 'Actuary',                      slug: 'actuary' },
  { label: 'Risk Analyst',                 slug: 'risk-analyst' },
  { label: 'Compliance Officer',           slug: 'compliance-officer' },
  { label: 'Management Consultant',        slug: 'management-consultant' },
  { label: 'Legal Counsel',                slug: 'legal-counsel' },
  { label: 'Corporate Attorney',           slug: 'corporate-attorney' },
  { label: 'Paralegal',                    slug: 'paralegal' },

  // Business & Management
  { label: 'Product Manager',              slug: 'product-manager' },
  { label: 'Project Manager',              slug: 'project-manager' },
  { label: 'Business Analyst',             slug: 'business-analyst' },
  { label: 'Operations Manager',           slug: 'operations-manager' },

  // Sales & Marketing
  { label: 'Sales Manager',                slug: 'sales-manager' },
  { label: 'Account Executive',            slug: 'account-executive' },
  { label: 'Sales Representative',         slug: 'sales-representative' },
  { label: 'Marketing Manager',            slug: 'marketing-manager' },
  { label: 'Digital Marketing Manager',    slug: 'digital-marketing-manager' },
  { label: 'Brand Manager',                slug: 'brand-manager' },
  { label: 'SEO Specialist',               slug: 'seo-specialist' },
  { label: 'Social Media Manager',         slug: 'social-media-manager' },
  { label: 'Public Relations Manager',     slug: 'public-relations-manager' },
  { label: 'Market Research Analyst',      slug: 'market-research-analyst' },
  { label: 'Growth Marketer',              slug: 'growth-hacker' },
  { label: 'Content Writer',               slug: 'content-writer' },

  // Engineering
  { label: 'Mechanical Engineer',          slug: 'mechanical-engineer' },
  { label: 'Electrical Engineer',          slug: 'electrical-engineer' },
  { label: 'Civil Engineer',               slug: 'civil-engineer' },
  { label: 'Aerospace Engineer',           slug: 'aerospace-engineer' },
  { label: 'Chemical Engineer',            slug: 'chemical-engineer' },
  { label: 'Biomedical Engineer',          slug: 'biomedical-engineer' },
  { label: 'Environmental Engineer',       slug: 'environmental-engineer' },
  { label: 'Structural Engineer',          slug: 'structural-engineer' },
  { label: 'Industrial Engineer',          slug: 'industrial-engineer' },
  { label: 'Manufacturing Engineer',       slug: 'manufacturing-engineer' },
  { label: 'Petroleum Engineer',           slug: 'petroleum-engineer' },

  // Design & Creative
  { label: 'UX Designer',                  slug: 'ux-designer' },
  { label: 'UI Designer',                  slug: 'ui-designer' },
  { label: 'Graphic Designer',             slug: 'graphic-designer' },
  { label: 'Motion Designer',              slug: 'motion-designer' },
  { label: 'Art Director',                 slug: 'art-director' },
  { label: 'Creative Director',            slug: 'creative-director' },
  { label: 'Video Editor',                 slug: 'video-editor' },
  { label: 'Photographer',                 slug: 'photographer' },

  // HR & People
  { label: 'HR Manager',                   slug: 'hr-manager' },
  { label: 'HR Business Partner',          slug: 'hr-business-partner' },
  { label: 'Recruiter',                    slug: 'recruiter' },
  { label: 'Talent Acquisition Specialist',slug: 'talent-acquisition-specialist' },
  { label: 'Compensation Analyst',         slug: 'compensation-analyst' },
  { label: 'Training Specialist',          slug: 'training-specialist' },

  // Supply Chain & Operations
  { label: 'Supply Chain Manager',         slug: 'supply-chain-manager' },
  { label: 'Logistics Manager',            slug: 'logistics-manager' },
  { label: 'Purchasing Manager',           slug: 'purchasing-manager' },
  { label: 'Warehouse Manager',            slug: 'warehouse-manager' },
  { label: 'Quality Assurance Manager',    slug: 'quality-assurance-manager' },
  { label: 'Facilities Manager',           slug: 'facilities-manager' },

  // Education
  { label: 'Teacher',                      slug: 'teacher' },
  { label: 'Professor',                    slug: 'professor' },
  { label: 'Instructional Designer',       slug: 'instructional-designer' },
  { label: 'School Counselor',             slug: 'school-counselor' },
  { label: 'Librarian',                    slug: 'librarian' },

  // Trades & Skilled
  { label: 'Electrician',                  slug: 'electrician' },
  { label: 'Plumber',                      slug: 'plumber' },
  { label: 'HVAC Technician',              slug: 'hvac-technician' },
  { label: 'Construction Manager',         slug: 'construction-manager' },
  { label: 'Real Estate Agent',            slug: 'real-estate-agent' },
] as const

export const CITIES = [
  { label: 'San Francisco',  slug: 'san-francisco',  state: 'CA', costIndex: 1.45 },
  { label: 'New York',       slug: 'new-york',       state: 'NY', costIndex: 1.35 },
  { label: 'Seattle',        slug: 'seattle',        state: 'WA', costIndex: 1.25 },
  { label: 'Boston',         slug: 'boston',         state: 'MA', costIndex: 1.20 },
  { label: 'Los Angeles',    slug: 'los-angeles',    state: 'CA', costIndex: 1.30 },
  { label: 'San Diego',      slug: 'san-diego',      state: 'CA', costIndex: 1.20 },
  { label: 'Sacramento',     slug: 'sacramento',     state: 'CA', costIndex: 1.15 },
  { label: 'Washington DC',  slug: 'washington-dc',  state: 'DC', costIndex: 1.22 },
  { label: 'Baltimore',      slug: 'baltimore',      state: 'MD', costIndex: 1.02 },
  { label: 'Philadelphia',   slug: 'philadelphia',   state: 'PA', costIndex: 1.05 },
  { label: 'Pittsburgh',     slug: 'pittsburgh',     state: 'PA', costIndex: 0.90 },
  { label: 'Chicago',        slug: 'chicago',        state: 'IL', costIndex: 1.08 },
  { label: 'Austin',         slug: 'austin',         state: 'TX', costIndex: 1.05 },
  { label: 'Dallas',         slug: 'dallas',         state: 'TX', costIndex: 0.98 },
  { label: 'Houston',        slug: 'houston',        state: 'TX', costIndex: 0.98 },
  { label: 'Denver',         slug: 'denver',         state: 'CO', costIndex: 1.05 },
  { label: 'Portland',       slug: 'portland',       state: 'OR', costIndex: 1.12 },
  { label: 'Minneapolis',    slug: 'minneapolis',    state: 'MN', costIndex: 0.97 },
  { label: 'Atlanta',        slug: 'atlanta',        state: 'GA', costIndex: 0.95 },
  { label: 'Miami',          slug: 'miami',          state: 'FL', costIndex: 1.05 },
  { label: 'Tampa',          slug: 'tampa',          state: 'FL', costIndex: 0.92 },
  { label: 'Phoenix',        slug: 'phoenix',        state: 'AZ', costIndex: 0.92 },
  { label: 'Las Vegas',      slug: 'las-vegas',      state: 'NV', costIndex: 1.00 },
  { label: 'Nashville',      slug: 'nashville',      state: 'TN', costIndex: 0.93 },
  { label: 'Charlotte',      slug: 'charlotte',      state: 'NC', costIndex: 0.91 },
  { label: 'Raleigh',        slug: 'raleigh',        state: 'NC', costIndex: 0.90 },
  { label: 'Salt Lake City', slug: 'salt-lake-city', state: 'UT', costIndex: 0.95 },
  { label: 'Kansas City',    slug: 'kansas-city',    state: 'MO', costIndex: 0.88 },
  { label: 'Columbus',       slug: 'columbus',       state: 'OH', costIndex: 0.87 },
  { label: 'Detroit',        slug: 'detroit',        state: 'MI', costIndex: 0.88 },
] as const

export const ROLE_CATEGORIES: Record<string, string> = {
  // Technology
  'software-engineer': 'tech', 'full-stack-developer': 'tech', 'frontend-developer': 'tech',
  'backend-developer': 'tech', 'ios-developer': 'tech', 'android-developer': 'tech',
  'data-analyst': 'tech', 'data-scientist': 'tech', 'data-engineer': 'tech',
  'ai-engineer': 'tech', 'machine-learning-engineer': 'tech', 'devops-engineer': 'tech',
  'site-reliability-engineer': 'tech', 'platform-engineer': 'tech', 'cloud-architect': 'tech',
  'solutions-architect': 'tech', 'cybersecurity-analyst': 'tech', 'blockchain-developer': 'tech',
  'embedded-systems-engineer': 'tech', 'database-administrator': 'tech', 'network-engineer': 'tech',
  'systems-administrator': 'tech', 'it-manager': 'tech', 'qa-engineer': 'tech',
  'technical-writer': 'tech',
  // Healthcare
  'nurse': 'healthcare', 'nurse-practitioner': 'healthcare', 'physician': 'healthcare',
  'surgeon': 'healthcare', 'anesthesiologist': 'healthcare', 'radiologist': 'healthcare',
  'dentist': 'healthcare', 'dental-hygienist': 'healthcare', 'pharmacist': 'healthcare',
  'physician-assistant': 'healthcare', 'physical-therapist': 'healthcare',
  'occupational-therapist': 'healthcare', 'medical-laboratory-technician': 'healthcare',
  'medical-coder': 'healthcare', 'healthcare-administrator': 'healthcare',
  // Finance & Legal
  'financial-analyst': 'finance', 'accountant': 'finance', 'auditor': 'finance',
  'tax-specialist': 'finance', 'controller': 'finance', 'cfo': 'finance',
  'investment-banker': 'finance', 'portfolio-manager': 'finance', 'actuary': 'finance',
  'risk-analyst': 'finance', 'compliance-officer': 'finance', 'management-consultant': 'finance',
  'legal-counsel': 'finance', 'corporate-attorney': 'finance', 'paralegal': 'finance',
  // Business & Management
  'product-manager': 'management', 'project-manager': 'management',
  'business-analyst': 'management', 'operations-manager': 'management',
  // Sales & Marketing
  'sales-manager': 'marketing', 'account-executive': 'marketing', 'sales-representative': 'marketing',
  'marketing-manager': 'marketing', 'digital-marketing-manager': 'marketing', 'brand-manager': 'marketing',
  'seo-specialist': 'marketing', 'social-media-manager': 'marketing',
  'public-relations-manager': 'marketing', 'market-research-analyst': 'marketing',
  'growth-hacker': 'marketing', 'content-writer': 'marketing',
  // Engineering
  'mechanical-engineer': 'engineering', 'electrical-engineer': 'engineering',
  'civil-engineer': 'engineering', 'aerospace-engineer': 'engineering',
  'chemical-engineer': 'engineering', 'biomedical-engineer': 'engineering',
  'environmental-engineer': 'engineering', 'structural-engineer': 'engineering',
  'industrial-engineer': 'engineering', 'manufacturing-engineer': 'engineering',
  'petroleum-engineer': 'engineering',
  // Design & Creative
  'ux-designer': 'design', 'ui-designer': 'design', 'graphic-designer': 'design',
  'motion-designer': 'design', 'art-director': 'design', 'creative-director': 'design',
  'video-editor': 'design', 'photographer': 'design',
  // HR & People
  'hr-manager': 'hr', 'hr-business-partner': 'hr', 'recruiter': 'hr',
  'talent-acquisition-specialist': 'hr', 'compensation-analyst': 'hr', 'training-specialist': 'hr',
  // Supply Chain
  'supply-chain-manager': 'supply-chain', 'logistics-manager': 'supply-chain',
  'purchasing-manager': 'supply-chain', 'warehouse-manager': 'supply-chain',
  'quality-assurance-manager': 'supply-chain', 'facilities-manager': 'supply-chain',
  // Education
  'teacher': 'education', 'professor': 'education', 'instructional-designer': 'education',
  'school-counselor': 'education', 'librarian': 'education',
  // Trades
  'electrician': 'trades', 'plumber': 'trades', 'hvac-technician': 'trades',
  'construction-manager': 'trades', 'real-estate-agent': 'trades',
}

export function getSalaryData(roleSlug: string, citySlug: string): SalaryData | null {
  const role = ROLES.find(r => r.slug === roleSlug)
  const city = CITIES.find(c => c.slug === citySlug)
  const official = OEWS[roleSlug]?.markets[citySlug]
  if (!role || !city || !official) return null
  const [p25, median, p75, p90] = official
  return {
    role: role.label,
    roleSlug,
    city: city.label,
    citySlug,
    state: city.state,
    median, p25, p75, p90,
    source: 'BLS OEWS',
    updatedAt: OEWS_PERIOD,
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

export const STATE_META: Record<string, { name: string; slug: string }> = {
  CA: { name: 'California',       slug: 'ca' },
  NY: { name: 'New York',         slug: 'ny' },
  WA: { name: 'Washington',       slug: 'wa' },
  MA: { name: 'Massachusetts',    slug: 'ma' },
  TX: { name: 'Texas',            slug: 'tx' },
  CO: { name: 'Colorado',         slug: 'co' },
  IL: { name: 'Illinois',         slug: 'il' },
  DC: { name: 'Washington D.C.',  slug: 'dc' },
  GA: { name: 'Georgia',          slug: 'ga' },
  FL: { name: 'Florida',          slug: 'fl' },
  AZ: { name: 'Arizona',          slug: 'az' },
  MN: { name: 'Minnesota',        slug: 'mn' },
  OR: { name: 'Oregon',           slug: 'or' },
  TN: { name: 'Tennessee',        slug: 'tn' },
  NC: { name: 'North Carolina',   slug: 'nc' },
  UT: { name: 'Utah',             slug: 'ut' },
  MI: { name: 'Michigan',         slug: 'mi' },
  PA: { name: 'Pennsylvania',     slug: 'pa' },
  NV: { name: 'Nevada',           slug: 'nv' },
  MD: { name: 'Maryland',         slug: 'md' },
  MO: { name: 'Missouri',         slug: 'mo' },
  OH: { name: 'Ohio',             slug: 'oh' },
}

export function getUniqueStates() {
  return [...new Set(CITIES.map(c => c.state))]
}

export function getCitiesForState(stateCode: string) {
  return CITIES.filter(c => c.state === stateCode)
}

export function getStateSalaryRanking(stateCode: string) {
  const cities = getCitiesForState(stateCode)
  if (!cities.length) return []
  return ROLES.flatMap(role => {
    const salaries = cities
      .map(city => getSalaryData(role.slug, city.slug))
      .filter(Boolean) as SalaryData[]
    const national = getNationalBenchmark(role.slug)
    if (!salaries.length || !national) return []
    const avg = (arr: number[]) => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length)
    return {
      role: role.label,
      slug: role.slug,
      median: avg(salaries.map(s => s.median)),
      p25:    avg(salaries.map(s => s.p25)),
      p75:    avg(salaries.map(s => s.p75)),
      p90:    avg(salaries.map(s => s.p90)),
      nationalMedian: national.median,
    }
  }).sort((a, b) => b.median - a.median)
}

// Only generate compare pages for same-category pairs to stay under file limits
export function getAllCompareSlugs() {
  const slugs: string[] = []
  const rolesList = ROLES.filter(r => getNationalBenchmark(r.slug)).map(r => r.slug)
  for (let i = 0; i < rolesList.length; i++) {
    for (let j = i + 1; j < rolesList.length; j++) {
      const cat1 = ROLE_CATEGORIES[rolesList[i]]
      const cat2 = ROLE_CATEGORIES[rolesList[j]]
      if (cat1 && cat2 && cat1 === cat2) {
        slugs.push(`${rolesList[i]}-vs-${rolesList[j]}`)
      }
    }
  }
  return slugs
}

export function parseCompareSlug(slug: string) {
  const vsIndex = slug.indexOf('-vs-')
  if (vsIndex === -1) return null
  const role1Slug = slug.slice(0, vsIndex)
  const role2Slug = slug.slice(vsIndex + 4)
  const role1 = ROLES.find(r => r.slug === role1Slug)
  const role2 = ROLES.find(r => r.slug === role2Slug)
  if (!role1 || !role2) return null
  return { role1, role2 }
}
