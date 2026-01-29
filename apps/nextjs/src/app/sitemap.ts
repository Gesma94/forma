import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get('host');
  const hostName = `https://${host?.replace(/\/$/, '')}`;

  return [
    {
      url: `${hostName}`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    },
    {
      url: `${hostName}/services/architectural-stills`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    },
    {
      url: `${hostName}/services/video-animations`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    },
    {
      url: `${hostName}/services/360-virtual-reality`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    },
    {
      url: `${hostName}/process`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    },
    {
      url: `${hostName}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    },
    {
      url: `${hostName}/book`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    },
    {
      url: `${hostName}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    },
    {
      url: `${hostName}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    },
    {
      url: `${hostName}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    }
  ];
}
