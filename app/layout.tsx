import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'SalaryIndex — U.S. Salary Data for 113 Roles & 30 Cities',
    template: '%s | SalaryIndex',
  },
  description: 'Free U.S. salary benchmarks for 113 roles across 30 major cities. BLS OES 2025 data — median, p25, p75, p90 percentiles. Updated monthly.',
  metadataBase: new URL('https://ussalaryindex.com'),
  openGraph: {
    type: 'website',
    siteName: 'SalaryIndex',
    title: 'SalaryIndex — U.S. Salary Data for 113 Roles & 30 Cities',
    description: 'Free U.S. salary benchmarks for 113 roles across 30 major cities. BLS OES 2025 data.',
    url: 'https://ussalaryindex.com',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'SalaryIndex — U.S. Compensation Data' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SalaryIndex — U.S. Salary Data for 113 Roles & 30 Cities',
    description: 'Free U.S. salary benchmarks for 113 roles across 30 major cities.',
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
      description: 'Institutional-grade U.S. salary benchmarks for 113 roles across 30 markets, sourced from BLS OES surveys.',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://ussalaryindex.com/#website',
      url: 'https://ussalaryindex.com',
      name: 'SalaryIndex',
      publisher: { '@id': 'https://ussalaryindex.com/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: 'https://ussalaryindex.com/role/{search_term_string}' },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Dataset',
      name: 'U.S. Salary Dataset 2025 — 113 Roles × 30 Cities',
      description: '3,360 salary data points covering 113 occupational roles across 30 major U.S. cities. Includes median, P25, P75, and P90 annual compensation. Sourced from BLS OES 2024 surveys.',
      url: 'https://ussalaryindex.com',
      creator: { '@id': 'https://ussalaryindex.com/#organization' },
      license: 'https://creativecommons.org/licenses/by/4.0/',
      temporalCoverage: '2024/2026',
      spatialCoverage: 'United States',
      keywords: ['salary', 'compensation', 'wages', 'BLS', 'OES', 'occupational employment', 'US salary data'],
      variableMeasured: ['median salary', '25th percentile', '75th percentile', '90th percentile'],
      distribution: [{
        '@type': 'DataDownload',
        encodingFormat: 'text/csv',
        contentUrl: 'https://dreadstallion.gumroad.com/l/tvhsz',
      }],
      dateModified: '2026-05-28',
      isAccessibleForFree: false,
      offers: {
        '@type': 'Offer',
        price: '19',
        priceCurrency: 'USD',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1MC7PJSWDN"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-1MC7PJSWDN');` }} />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6775316191683171" crossOrigin="anonymous"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
