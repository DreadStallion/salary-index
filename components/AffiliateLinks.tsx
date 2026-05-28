// Provider-agnostic affiliate link module.
// To activate a provider: set active: true and replace PLACEHOLDER_ID with real affiliate ID.
// To add a provider: add an entry to PROVIDERS following the same shape.

type AffiliateProvider = {
  id: string
  name: string
  label: string
  description: string
  active: boolean
  buildUrl: (role: string, city: string) => string
  cta: string
  commission: string
}

const PROVIDERS: AffiliateProvider[] = [
  {
    id: 'flexjobs',
    name: 'FlexJobs',
    label: 'Remote & Flexible Jobs',
    description: 'Verified remote, hybrid and flexible listings — hand-screened, no scams',
    active: false, // set to true after FlexJobs affiliate signup — replace PLACEHOLDER_ID
    buildUrl: (role, city) =>
      `https://www.flexjobs.com/jobs-us/${encodeURIComponent(role.toLowerCase().replace(/\s+/g, '-'))}?affiliate_id=PLACEHOLDER_ID&utm_source=ussalaryindex&utm_medium=affiliate`,
    cta: 'Browse Flexible Roles →',
    commission: 'CPA per subscription',
  },
  // ZipRecruiter: verify affiliate program availability before enabling
  // {
  //   id: 'ziprecruiter',
  //   name: 'ZipRecruiter',
  //   label: 'Job Search',
  //   description: 'Search millions of job listings across the U.S.',
  //   active: false,
  //   buildUrl: (role, city) => `https://www.ziprecruiter.com/jobs-search?search=${encodeURIComponent(role)}&location=${encodeURIComponent(city)}&source=PLACEHOLDER_ID`,
  //   cta: 'Search Jobs on ZipRecruiter →',
  //   commission: 'CPA per apply',
  // },
]

export default function AffiliateLinks({ role, city }: { role: string; city: string }) {
  const active = PROVIDERS.filter(p => p.active)
  if (active.length === 0) return null

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{
        fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
        color: 'var(--ink-muted)', fontWeight: 600, marginBottom: 10,
      }}>
        Open Positions
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {active.map(p => (
          <a
            key={p.id}
            href={p.buildUrl(role, city)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              background: 'white',
              border: '1px solid var(--border)',
              textDecoration: 'none',
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--navy)', marginBottom: 2 }}>
                {p.name} — {p.label}
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>
                {p.description}
              </div>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 600, color: 'var(--gold)',
              whiteSpace: 'nowrap', letterSpacing: '0.04em',
            }}>
              {p.cta}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
