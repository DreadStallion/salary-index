import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'SalaryIndex — U.S. Compensation Data',
    template: '%s | SalaryIndex',
  },
  description: 'Institutional-grade salary benchmarks for 113 roles across 30 U.S. markets. Updated monthly from BLS OES and verified sources.',
  metadataBase: new URL('https://ussalaryindex.com'),
  openGraph: { type: 'website', siteName: 'SalaryIndex' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1MC7PJSWDN"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-1MC7PJSWDN');` }} />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6775316191683171" crossOrigin="anonymous"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
