import { SANITY_DOCUMENT_IDS } from '@forma/common';
import type { Viewport } from 'next';
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
    { parameters: { pageId: SANITY_DOCUMENT_IDS.homepage } }
  );

  return (
    <div>
      <ModuleRenderer modules={result.modules} />
      <div className='h-[300px] bg-bg' />
    </div>
  );
}
