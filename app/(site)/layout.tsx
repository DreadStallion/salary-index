export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Top bar */}
      <div style={{ background: 'var(--navy-dark)', borderBottom: '1px solid #1e3a5f' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '6px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#8a9bb5', fontSize: 11, letterSpacing: '0.05em' }}>
            U.S. COMPENSATION DATA · UPDATED MAY 2026 · SOURCE: BLS OES
          </span>
          <span style={{ color: '#8a9bb5', fontSize: 11, letterSpacing: '0.05em' }}>
            113 ROLES · 30 MARKETS
          </span>
        </div>
      </div>

      {/* Main header */}
      <header style={{ background: 'var(--navy)', borderBottom: '3px solid var(--gold)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <div style={{ color: '#f0ead8', fontSize: 22, fontWeight: 700, letterSpacing: '0.02em', fontFamily: 'Georgia, serif' }}>
              SALARY<span style={{ color: 'var(--gold-lt)' }}>INDEX</span>
            </div>
            <div style={{ color: '#7a90a8', fontSize: 10, letterSpacing: '0.15em', marginTop: 2 }}>
              U.S. COMPENSATION INTELLIGENCE
            </div>
          </a>
          <nav style={{ display: 'flex', gap: 32 }}>
            {[
              { href: '/', label: 'Roles' },
              { href: '/cities', label: 'Cities' },
              { href: '/calculator', label: 'Calculator' },
              { href: '/compare/software-engineer-vs-data-scientist', label: 'Compare' },
              { href: '/embed', label: 'Embed' },
            ].map(({ href, label }) => (
              <a key={href} href={href} style={{
                color: '#c8d4e0',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontFamily: 'Georgia, serif',
              }}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px', minHeight: '70vh' }}>
        {children}
      </main>

      <footer style={{ background: 'var(--navy)', borderTop: '3px solid var(--gold)', marginTop: 80 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: '#f0ead8', fontSize: 14, fontWeight: 700, letterSpacing: '0.05em' }}>
              SALARY<span style={{ color: 'var(--gold-lt)' }}>INDEX</span>
            </div>
            <div style={{ color: '#7a90a8', fontSize: 11, marginTop: 4 }}>
              © 2026 SalaryIndex · All data sourced from BLS OES surveys
            </div>
          </div>
          <div style={{ color: '#7a90a8', fontSize: 11, textAlign: 'right', lineHeight: 1.8 }}>
            <a href="/embed" style={{ color: '#8a9bb5', textDecoration: 'none' }}>Embed widget</a>
            <br />
            <a href="/methodology" style={{ color: '#8a9bb5', textDecoration: 'none' }}>Methodology</a>
            <br />Data updated monthly
          </div>
        </div>
      </footer>
    </>
  )
}
