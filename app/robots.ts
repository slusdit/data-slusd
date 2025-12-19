import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/profile/', '/attendance/', '/interventions/', '/ai-query/', '/custom-query/', '/gradedistribution/', '/query/', '/sped/', '/tests/'],
    },
  }
}
