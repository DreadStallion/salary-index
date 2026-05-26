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
  yoyChange: number
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

// Base national median salaries (USD/year) — sourced from BLS OES 2025
const BASE_SALARIES: Record<string, { median: number; p25: number; p75: number; p90: number; yoy: number }> = {
  // Technology
  'software-engineer':           { median: 130000, p25: 98000,  p75: 165000, p90: 210000, yoy: 3.2 },
  'full-stack-developer':        { median: 120000, p25: 90000,  p75: 155000, p90: 195000, yoy: 4.2 },
  'frontend-developer':          { median: 108000, p25: 80000,  p75: 142000, p90: 180000, yoy: 3.8 },
  'backend-developer':           { median: 118000, p25: 88000,  p75: 152000, p90: 195000, yoy: 4.0 },
  'ios-developer':               { median: 122000, p25: 92000,  p75: 158000, p90: 198000, yoy: 3.5 },
  'android-developer':           { median: 118000, p25: 88000,  p75: 152000, p90: 192000, yoy: 3.2 },
  'data-analyst':                { median: 82000,  p25: 62000,  p75: 108000, p90: 138000, yoy: 4.1 },
  'data-scientist':              { median: 118000, p25: 88000,  p75: 155000, p90: 200000, yoy: 5.2 },
  'data-engineer':               { median: 128000, p25: 96000,  p75: 165000, p90: 210000, yoy: 5.8 },
  'ai-engineer':                 { median: 155000, p25: 118000, p75: 198000, p90: 248000, yoy: 9.2 },
  'machine-learning-engineer':   { median: 145000, p25: 112000, p75: 185000, p90: 235000, yoy: 7.1 },
  'devops-engineer':             { median: 125000, p25: 94000,  p75: 160000, p90: 205000, yoy: 4.5 },
  'site-reliability-engineer':   { median: 138000, p25: 105000, p75: 175000, p90: 218000, yoy: 5.1 },
  'platform-engineer':           { median: 135000, p25: 102000, p75: 172000, p90: 215000, yoy: 5.5 },
  'cloud-architect':             { median: 152000, p25: 118000, p75: 195000, p90: 245000, yoy: 5.8 },
  'solutions-architect':         { median: 148000, p25: 112000, p75: 190000, p90: 238000, yoy: 4.8 },
  'cybersecurity-analyst':       { median: 112000, p25: 82000,  p75: 148000, p90: 188000, yoy: 6.2 },
  'blockchain-developer':        { median: 135000, p25: 102000, p75: 175000, p90: 225000, yoy: 8.2 },
  'embedded-systems-engineer':   { median: 105000, p25: 78000,  p75: 135000, p90: 170000, yoy: 2.8 },
  'database-administrator':      { median: 98000,  p25: 72000,  p75: 128000, p90: 162000, yoy: 1.8 },
  'network-engineer':            { median: 92000,  p25: 68000,  p75: 120000, p90: 152000, yoy: 2.1 },
  'systems-administrator':       { median: 85000,  p25: 62000,  p75: 112000, p90: 140000, yoy: 1.8 },
  'it-manager':                  { median: 118000, p25: 88000,  p75: 152000, p90: 190000, yoy: 2.5 },
  'qa-engineer':                 { median: 85000,  p25: 62000,  p75: 112000, p90: 142000, yoy: 2.0 },
  'technical-writer':            { median: 78000,  p25: 55000,  p75: 102000, p90: 130000, yoy: 1.5 },

  // Healthcare
  'nurse':                       { median: 82000,  p25: 65000,  p75: 102000, p90: 125000, yoy: 3.8 },
  'nurse-practitioner':          { median: 115000, p25: 96000,  p75: 138000, p90: 162000, yoy: 4.2 },
  'physician':                   { median: 218000, p25: 162000, p75: 298000, p90: 380000, yoy: 2.8 },
  'surgeon':                     { median: 352000, p25: 268000, p75: 445000, p90: 550000, yoy: 2.2 },
  'anesthesiologist':            { median: 338000, p25: 268000, p75: 418000, p90: 492000, yoy: 2.3 },
  'radiologist':                 { median: 298000, p25: 232000, p75: 380000, p90: 452000, yoy: 2.5 },
  'dentist':                     { median: 175000, p25: 128000, p75: 225000, p90: 290000, yoy: 2.1 },
  'dental-hygienist':            { median: 82000,  p25: 65000,  p75: 98000,  p90: 118000, yoy: 2.4 },
  'pharmacist':                  { median: 128000, p25: 108000, p75: 148000, p90: 168000, yoy: 1.2 },
  'physician-assistant':         { median: 118000, p25: 98000,  p75: 142000, p90: 165000, yoy: 3.5 },
  'physical-therapist':          { median: 95000,  p25: 78000,  p75: 115000, p90: 138000, yoy: 2.9 },
  'occupational-therapist':      { median: 88000,  p25: 72000,  p75: 108000, p90: 128000, yoy: 2.7 },
  'medical-laboratory-technician':{ median: 58000, p25: 45000,  p75: 72000,  p90: 88000,  yoy: 2.1 },
  'medical-coder':               { median: 48000,  p25: 38000,  p75: 62000,  p90: 78000,  yoy: 1.8 },
  'healthcare-administrator':    { median: 105000, p25: 75000,  p75: 138000, p90: 175000, yoy: 2.6 },

  // Finance & Legal
  'financial-analyst':           { median: 86000,  p25: 62000,  p75: 115000, p90: 148000, yoy: 2.9 },
  'accountant':                  { median: 72000,  p25: 52000,  p75: 95000,  p90: 125000, yoy: 2.0 },
  'auditor':                     { median: 75000,  p25: 55000,  p75: 100000, p90: 128000, yoy: 2.2 },
  'tax-specialist':              { median: 78000,  p25: 55000,  p75: 105000, p90: 138000, yoy: 2.5 },
  'controller':                  { median: 128000, p25: 95000,  p75: 168000, p90: 215000, yoy: 2.8 },
  'cfo':                         { median: 235000, p25: 168000, p75: 325000, p90: 438000, yoy: 3.2 },
  'investment-banker':           { median: 158000, p25: 112000, p75: 225000, p90: 325000, yoy: 4.5 },
  'portfolio-manager':           { median: 138000, p25: 98000,  p75: 195000, p90: 272000, yoy: 3.8 },
  'actuary':                     { median: 112000, p25: 82000,  p75: 148000, p90: 195000, yoy: 3.2 },
  'risk-analyst':                { median: 88000,  p25: 64000,  p75: 118000, p90: 152000, yoy: 2.9 },
  'compliance-officer':          { median: 92000,  p25: 66000,  p75: 122000, p90: 158000, yoy: 3.1 },
  'management-consultant':       { median: 115000, p25: 82000,  p75: 158000, p90: 215000, yoy: 4.2 },
  'legal-counsel':               { median: 148000, p25: 108000, p75: 198000, p90: 265000, yoy: 3.1 },
  'corporate-attorney':          { median: 165000, p25: 118000, p75: 225000, p90: 312000, yoy: 3.5 },
  'paralegal':                   { median: 58000,  p25: 42000,  p75: 76000,  p90: 98000,  yoy: 1.8 },

  // Business & Management
  'product-manager':             { median: 122000, p25: 92000,  p75: 158000, p90: 205000, yoy: 2.8 },
  'project-manager':             { median: 90000,  p25: 65000,  p75: 118000, p90: 150000, yoy: 2.2 },
  'business-analyst':            { median: 85000,  p25: 62000,  p75: 112000, p90: 142000, yoy: 2.4 },
  'operations-manager':          { median: 88000,  p25: 62000,  p75: 118000, p90: 152000, yoy: 1.9 },

  // Sales & Marketing
  'sales-manager':               { median: 98000,  p25: 68000,  p75: 138000, p90: 195000, yoy: 2.5 },
  'account-executive':           { median: 95000,  p25: 65000,  p75: 138000, p90: 195000, yoy: 3.2 },
  'sales-representative':        { median: 68000,  p25: 45000,  p75: 98000,  p90: 145000, yoy: 2.5 },
  'marketing-manager':           { median: 88000,  p25: 62000,  p75: 118000, p90: 155000, yoy: 1.8 },
  'digital-marketing-manager':   { median: 85000,  p25: 60000,  p75: 115000, p90: 148000, yoy: 4.5 },
  'brand-manager':               { median: 88000,  p25: 62000,  p75: 118000, p90: 152000, yoy: 2.8 },
  'seo-specialist':              { median: 62000,  p25: 45000,  p75: 85000,  p90: 112000, yoy: 5.2 },
  'social-media-manager':        { median: 58000,  p25: 42000,  p75: 78000,  p90: 102000, yoy: 3.8 },
  'public-relations-manager':    { median: 82000,  p25: 58000,  p75: 108000, p90: 142000, yoy: 1.9 },
  'market-research-analyst':     { median: 68000,  p25: 48000,  p75: 92000,  p90: 120000, yoy: 2.5 },
  'growth-hacker':               { median: 88000,  p25: 62000,  p75: 118000, p90: 155000, yoy: 6.2 },
  'content-writer':              { median: 52000,  p25: 38000,  p75: 70000,  p90: 90000,  yoy: 0.8 },

  // Engineering
  'mechanical-engineer':         { median: 98000,  p25: 72000,  p75: 128000, p90: 162000, yoy: 2.6 },
  'electrical-engineer':         { median: 102000, p25: 75000,  p75: 132000, p90: 168000, yoy: 2.9 },
  'civil-engineer':              { median: 88000,  p25: 65000,  p75: 115000, p90: 145000, yoy: 2.3 },
  'aerospace-engineer':          { median: 112000, p25: 85000,  p75: 142000, p90: 178000, yoy: 2.4 },
  'chemical-engineer':           { median: 105000, p25: 78000,  p75: 138000, p90: 172000, yoy: 2.6 },
  'biomedical-engineer':         { median: 98000,  p25: 72000,  p75: 128000, p90: 162000, yoy: 3.2 },
  'environmental-engineer':      { median: 92000,  p25: 68000,  p75: 122000, p90: 155000, yoy: 2.3 },
  'structural-engineer':         { median: 95000,  p25: 70000,  p75: 125000, p90: 158000, yoy: 2.2 },
  'industrial-engineer':         { median: 95000,  p25: 70000,  p75: 125000, p90: 158000, yoy: 2.3 },
  'manufacturing-engineer':      { median: 88000,  p25: 65000,  p75: 115000, p90: 148000, yoy: 2.1 },
  'petroleum-engineer':          { median: 135000, p25: 98000,  p75: 178000, p90: 225000, yoy: 3.8 },

  // Design & Creative
  'ux-designer':                 { median: 92000,  p25: 68000,  p75: 122000, p90: 155000, yoy: 2.1 },
  'ui-designer':                 { median: 88000,  p25: 65000,  p75: 118000, p90: 150000, yoy: 2.5 },
  'graphic-designer':            { median: 58000,  p25: 42000,  p75: 78000,  p90: 98000,  yoy: 1.2 },
  'motion-designer':             { median: 72000,  p25: 52000,  p75: 98000,  p90: 128000, yoy: 2.2 },
  'art-director':                { median: 98000,  p25: 72000,  p75: 130000, p90: 165000, yoy: 1.9 },
  'creative-director':           { median: 118000, p25: 88000,  p75: 155000, p90: 198000, yoy: 2.1 },
  'video-editor':                { median: 58000,  p25: 42000,  p75: 78000,  p90: 102000, yoy: 1.8 },
  'photographer':                { median: 45000,  p25: 32000,  p75: 62000,  p90: 85000,  yoy: 0.9 },

  // HR & People
  'hr-manager':                  { median: 82000,  p25: 58000,  p75: 108000, p90: 138000, yoy: 1.5 },
  'hr-business-partner':         { median: 92000,  p25: 66000,  p75: 122000, p90: 158000, yoy: 2.6 },
  'recruiter':                   { median: 62000,  p25: 45000,  p75: 85000,  p90: 112000, yoy: 2.8 },
  'talent-acquisition-specialist':{ median: 72000, p25: 52000,  p75: 98000,  p90: 128000, yoy: 3.2 },
  'compensation-analyst':        { median: 78000,  p25: 56000,  p75: 105000, p90: 135000, yoy: 2.5 },
  'training-specialist':         { median: 62000,  p25: 45000,  p75: 82000,  p90: 108000, yoy: 1.9 },

  // Supply Chain & Operations
  'supply-chain-manager':        { median: 95000,  p25: 68000,  p75: 128000, p90: 162000, yoy: 3.5 },
  'logistics-manager':           { median: 88000,  p25: 62000,  p75: 118000, p90: 150000, yoy: 3.2 },
  'purchasing-manager':          { median: 92000,  p25: 66000,  p75: 122000, p90: 155000, yoy: 2.5 },
  'warehouse-manager':           { median: 62000,  p25: 45000,  p75: 82000,  p90: 105000, yoy: 2.1 },
  'quality-assurance-manager':   { median: 88000,  p25: 64000,  p75: 118000, p90: 150000, yoy: 2.8 },
  'facilities-manager':          { median: 78000,  p25: 56000,  p75: 105000, p90: 135000, yoy: 1.9 },

  // Education
  'teacher':                     { median: 62000,  p25: 48000,  p75: 78000,  p90: 96000,  yoy: 1.8 },
  'professor':                   { median: 92000,  p25: 65000,  p75: 125000, p90: 165000, yoy: 1.5 },
  'instructional-designer':      { median: 72000,  p25: 52000,  p75: 98000,  p90: 128000, yoy: 3.8 },
  'school-counselor':            { median: 62000,  p25: 48000,  p75: 78000,  p90: 98000,  yoy: 1.6 },
  'librarian':                   { median: 62000,  p25: 46000,  p75: 78000,  p90: 98000,  yoy: 1.2 },

  // Trades & Skilled
  'electrician':                 { median: 62000,  p25: 46000,  p75: 82000,  p90: 108000, yoy: 3.5 },
  'plumber':                     { median: 62000,  p25: 46000,  p75: 85000,  p90: 112000, yoy: 3.8 },
  'hvac-technician':             { median: 58000,  p25: 42000,  p75: 78000,  p90: 102000, yoy: 4.2 },
  'construction-manager':        { median: 105000, p25: 78000,  p75: 138000, p90: 175000, yoy: 3.1 },
  'real-estate-agent':           { median: 58000,  p25: 32000,  p75: 92000,  p90: 145000, yoy: 1.5 },
}

// Category map for smart compare page generation
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
  return ROLES.map(role => {
    const salaries = cities
      .map(city => getSalaryData(role.slug, city.slug))
      .filter(Boolean) as SalaryData[]
    const avg = (arr: number[]) => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length / 5000) * 5000
    return {
      role: role.label,
      slug: role.slug,
      median: avg(salaries.map(s => s.median)),
      p25:    avg(salaries.map(s => s.p25)),
      p75:    avg(salaries.map(s => s.p75)),
      p90:    avg(salaries.map(s => s.p90)),
      yoyChange: salaries[0]?.yoyChange ?? 0,
      nationalMedian: BASE_SALARIES[role.slug]?.median ?? 0,
    }
  }).sort((a, b) => b.median - a.median)
}

// Only generate compare pages for same-category pairs to stay under file limits
export function getAllCompareSlugs() {
  const slugs: string[] = []
  const rolesList = ROLES.map(r => r.slug)
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

export { BASE_SALARIES }
