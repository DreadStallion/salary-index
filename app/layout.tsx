import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'SalaryIndex — U.S. Salary Data for 113 Roles & 30 Cities',
    template: '%s | SalaryIndex',
  },
  description: 'Free U.S. salary benchmarks for 61 matched roles across 30 major cities. May 2025 BLS OEWS figures.',
  metadataBase: new URL('https://ussalaryindex.com'),
  openGraph: {
    type: 'website',
    siteName: 'SalaryIndex',
    title: 'SalaryIndex — U.S. Salary Data for 113 Roles & 30 Cities',
    description: 'Free U.S. salary benchmarks for 61 matched roles across 30 major cities. May 2025 BLS OEWS figures.',
    url: 'https://ussalaryindex.com',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'SalaryIndex — U.S. Compensation Data' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SalaryIndex — U.S. Salary Data for 113 Roles & 30 Cities',
    description: 'Free U.S. salary benchmarks for 61 matched roles across 30 major cities.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://ussalaryindex.com' },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://ussalaryindex.com/#organization',
      name: 'SalaryIndex',
      url: 'https://ussalaryindex.com',
      description: 'Institutional-grade U.S. salary benchmarks for 61 matched roles across 30 markets, using published BLS OEWS figures.',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://ussalaryindex.com/#website',
      url: 'https://ussalaryindex.com',
      name: 'SalaryIndex',
      publisher: { '@id': 'https://ussalaryindex.com/#organization' },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        {process.env.NEXT_PUBLIC_SALARYINDEX_PREVIEW !== 'true' && (<>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-1MC7PJSWDN"></script>
          <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-1MC7PJSWDN');` }} />
        </>)}
      </head>
      <body>{children}</body>
    </html>
  )
}
