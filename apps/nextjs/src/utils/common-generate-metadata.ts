import type { Metadata } from 'next';
import { getSanityImageUrl, q, runQuery } from './groqd-client';

type TSanityQueryParams = {
  pageId: string;
};

export async function commonGenerateMetadata(pageId: string): Promise<Metadata> {
  const result = await runQuery(
    q
      .parameters<TSanityQueryParams>()
      .star.filterByType('pageLayoutDocumentType')
      .filterBy('_id == $pageId')
      .slice(0)
      .project(sub => ({
        pageMetadata: sub.field('pageMetadata').project(p => ({
          pageTitle: true,
          pageDescription: true,
          keywords: true,
          openGraph: p.field('openGraph').project(og => ({
            openGraphTitle: true,
            openGraphDescription: true,
            openGraphImage: og.field('openGraphImage').deref().field('image')
          }))
        })),
        modules: sub.field('modules[]').deref()
      })),
    { parameters: { pageId } }
  );

  const openGraphImageUrl = getSanityImageUrl(result.pageMetadata.openGraph.openGraphImage);

  return {
    title: result.pageMetadata.pageTitle,
    description: result.pageMetadata.pageDescription,
    keywords: result.pageMetadata.keywords,
    openGraph: {
      title: result.pageMetadata.openGraph.openGraphTitle,
      description: result.pageMetadata.openGraph.openGraphDescription,
      images: {
        url: openGraphImageUrl
      }
    }
  };
}

export async function commonPolicyGenerateMetadata(pageId: string): Promise<Metadata> {
  const result = await runQuery(
    q
      .parameters<TSanityQueryParams>()
      .star.filterByType('policyPageDocumentType')
      .filterBy('_id == $pageId')
      .slice(0)
      .project(sub => ({
        pageMetadata: sub.field('pageMetadata').project(p => ({
          pageTitle: true,
          pageDescription: true,
          keywords: true,
          openGraph: p.field('openGraph').project(og => ({
            openGraphTitle: true,
            openGraphDescription: true,
            openGraphImage: og.field('openGraphImage').deref().field('image')
          }))
        }))
      })),
    { parameters: { pageId } }
  );

  const openGraphImageUrl = getSanityImageUrl(result.pageMetadata.openGraph.openGraphImage);

  return {
    title: result.pageMetadata.pageTitle,
    description: result.pageMetadata.pageDescription,
    keywords: result.pageMetadata.keywords,
    openGraph: {
      title: result.pageMetadata.openGraph.openGraphTitle,
      description: result.pageMetadata.openGraph.openGraphDescription,
      images: {
        url: openGraphImageUrl
      }
    }
  };
}
