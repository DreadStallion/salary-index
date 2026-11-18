import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_SALARYINDEX_PREVIEW === 'true') {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/widget/',
    },
    sitemap: 'https://ussalaryindex.com/sitemap.xml',
  }
}
