import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — SalaryIndex',
  description: 'Privacy policy for ussalaryindex.com. How we collect, use, and protect your data.',
  alternates: { canonical: 'https://ussalaryindex.com/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 20 }}>
        <a href="/" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Home</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: 'var(--navy)' }}>Privacy Policy</span>
      </div>

      <div style={{ borderBottom: '2px solid var(--navy)', paddingBottom: 20, marginBottom: 36 }}>
        <h1 style={{ fontSize: 26, margin: '0 0 8px', color: 'var(--navy)' }}>Privacy Policy</h1>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-muted)' }}>Last updated: May 27, 2026</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 760, fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.8 }}>

        <section>
          <h2 style={{ fontSize: 16, color: 'var(--navy)', marginBottom: 10 }}>1. Who We Are</h2>
          <p style={{ margin: 0 }}>
            SalaryIndex (ussalaryindex.com) is operated by Dread Stallion, based in the Netherlands. We provide free U.S. salary data derived from Bureau of Labor Statistics sources. Contact: <a href="mailto:worldmineralassosiation@gmail.com" style={{ color: 'var(--navy)' }}>worldmineralassosiation@gmail.com</a>
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 16, color: 'var(--navy)', marginBottom: 10 }}>2. Information We Collect</h2>
          <p style={{ margin: '0 0 8px' }}>We collect minimal data necessary to operate the service:</p>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li><strong>Usage data:</strong> Pages visited, time on site, referring URLs — collected via Google Analytics 4.</li>
            <li><strong>API registration:</strong> Email address, if you register for an API key via the /developers page.</li>
            <li><strong>Technical data:</strong> IP address, browser type, device type — standard server logs retained by Cloudflare.</li>
          </ul>
          <p style={{ margin: '8px 0 0' }}>We do not collect names, payment information, or sensitive personal data unless you explicitly provide it.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 16, color: 'var(--navy)', marginBottom: 10 }}>3. How We Use Your Information</h2>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>To operate and improve the website and API service</li>
            <li>To send API key credentials if requested</li>
            <li>To analyze traffic patterns and improve content</li>
            <li>To comply with legal obligations</li>
          </ul>
          <p style={{ margin: '8px 0 0' }}>We do not sell personal data to third parties.</p>
        </section>

        <section>
          <h2 style={{ fontSize: 16, color: 'var(--navy)', marginBottom: 10 }}>4. Cookies and Tracking</h2>
          <p style={{ margin: '0 0 8px' }}>This site uses:</p>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li><strong>Google Analytics 4:</strong> Collects anonymized usage data. You can opt out via <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>Google Analytics Opt-out</a>.</li>
            <li><strong>Google AdSense:</strong> May serve personalized ads based on your browsing history. Managed by Google. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>Google Privacy Policy</a>.</li>
            <li><strong>Cloudflare:</strong> Our CDN provider. See <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>Cloudflare Privacy Policy</a>.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: 16, color: 'var(--navy)', marginBottom: 10 }}>5. Data Retention</h2>
          <p style={{ margin: 0 }}>
            Analytics data is retained for 26 months per Google Analytics defaults. API keys and associated email addresses are retained until you request deletion. Server logs are retained by Cloudflare per their standard retention policy.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 16, color: 'var(--navy)', marginBottom: 10 }}>6. Your Rights (GDPR)</h2>
          <p style={{ margin: '0 0 8px' }}>If you are located in the European Economic Area, you have the right to:</p>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>Access personal data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Request data portability</li>
            <li>Lodge a complaint with your local data protection authority</li>
          </ul>
          <p style={{ margin: '8px 0 0' }}>To exercise these rights, contact: <a href="mailto:worldmineralassosiation@gmail.com" style={{ color: 'var(--navy)' }}>worldmineralassosiation@gmail.com</a></p>
        </section>

        <section>
          <h2 style={{ fontSize: 16, color: 'var(--navy)', marginBottom: 10 }}>7. Third-Party Links</h2>
          <p style={{ margin: 0 }}>
            SalaryIndex contains links to external job boards (LinkedIn, Indeed, Glassdoor). We are not responsible for the privacy practices of these sites. We encourage you to read their privacy policies.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 16, color: 'var(--navy)', marginBottom: 10 }}>8. Changes to This Policy</h2>
          <p style={{ margin: 0 }}>
            We may update this policy periodically. Changes will be reflected by updating the date at the top of this page. Continued use of the site after changes constitutes acceptance.
          </p>
        </section>

      </div>
    </>
  )
}
