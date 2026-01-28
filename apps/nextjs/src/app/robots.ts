import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const hostName = headersList.get('host');

  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${hostName}/sitemap.xml`
  };
}
