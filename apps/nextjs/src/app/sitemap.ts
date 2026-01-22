import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.BASE_URL;

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    },
    {
      url: `${baseUrl}/services/architectural-stills`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    },
    {
      url: `${baseUrl}/services/video-animations`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    },
    {
      url: `${baseUrl}/services/360-virtual-reality`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    },
    {
      url: `${baseUrl}/process`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    },
    {
      url: `${baseUrl}/book`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly'
    }
  ];
}
