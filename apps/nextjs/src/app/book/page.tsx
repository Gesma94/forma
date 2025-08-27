import { SANITY_DOCUMENT_IDS } from '@forma/common';
import type { Viewport } from 'next';
import { Topbar } from '@/layout/topbar/topbar';
import { ContentContainer } from '@/ui/content-container/content-container';
import { q, runQuery } from '@/utils/groqd-client';
import { ModuleRenderer } from '@/utils/module-renderer';

type TSanityQueryParams = {
  pageId: string;
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1
};

export default async function Page() {
  const result = await runQuery(
    q
      .parameters<TSanityQueryParams>()
      .star.filterByType('pageLayoutDocumentType')
      .filterBy('_id == $pageId')
      .slice(0)
      .project(sub => ({
        modules: sub.field('modules[]').deref()
      })),
    { parameters: { pageId: SANITY_DOCUMENT_IDS.bookpage } }
  );

  return (
    <div>
      <Topbar variant='solid' />
      <ModuleRenderer modules={result.modules} />
      <ContentContainer>
        <div className='grid grid-cols-2'>
          <h1 className='sticky top-20 text-7xl font-bold'>Book a cal</h1>
        </div>
      </ContentContainer>
      <div className='h-[300px] bg-bg' />
    </div>
  );
}
