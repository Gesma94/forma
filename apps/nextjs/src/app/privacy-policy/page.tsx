import { SANITY_DOCUMENT_IDS } from '@forma/common';
import type { Viewport } from 'next';
import { Topbar } from '@/layout/topbar/topbar';
import { ContentContainer } from '@/ui/content-container/content-container';
import { PolicyPortableText } from '@/ui/portable-text/policy-portable-text';
import { q, runQuery } from '@/utils/groqd-client';

type TSanityQueryParams = {
  pageId: string;
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1
};

export default async function Page() {
  const sanityData = await runQuery(
    q.parameters<TSanityQueryParams>().star.filterByType('policyPageDocumentType').filterBy('_id == $pageId').slice(0),
    { parameters: { pageId: SANITY_DOCUMENT_IDS.privacyPolicyPage } }
  );

  console.log(sanityData);

  return (
    <div>
      <Topbar variant='solid' />
      <ContentContainer>
        <div className='text-primary py-20'>
          <h1 className='font-bold text-9xl mb-20'>{sanityData.heading}</h1>
          <PolicyPortableText value={sanityData.content} />
        </div>
      </ContentContainer>
    </div>
  );
}
