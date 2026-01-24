import { SANITY_DOCUMENT_IDS } from '@forma/common';
import type { Metadata, Viewport } from 'next';
import { Topbar } from '@/layout/topbar/topbar';
import { ContentContainer } from '@/ui/content-container/content-container';
import { PolicyPortableText } from '@/ui/portable-text/policy-portable-text';
import { commonPolicyGenerateMetadata } from '@/utils/common-generate-metadata';
import { q, runQuery } from '@/utils/groqd-client';

type TSanityQueryParams = {
  pageId: string;
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1
};

export async function generateMetadata(): Promise<Metadata> {
  return commonPolicyGenerateMetadata(SANITY_DOCUMENT_IDS.cookiePolicyPage);
}

export default async function Page() {
  const sanityData = await runQuery(
    q.parameters<TSanityQueryParams>().star.filterByType('policyPageDocumentType').filterBy('_id == $pageId').slice(0),
    { parameters: { pageId: SANITY_DOCUMENT_IDS.cookiePolicyPage } }
  );

  return (
    <div>
      <Topbar variant='solid' />
      <ContentContainer>
        <div className='text-primary py-12 md:py-20'>
          <h1 className='font-bold text-7xl md:text-9xl'>{sanityData.heading}</h1>
          <PolicyPortableText value={sanityData.content} />
          <p className='mt-12 text-text-muted text-sm'>
            Last updated at: {new Date(sanityData._updatedAt).toDateString()}
          </p>
        </div>
      </ContentContainer>
    </div>
  );
}
