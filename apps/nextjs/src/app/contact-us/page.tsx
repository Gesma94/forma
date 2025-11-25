import type { Viewport } from 'next';
import { Topbar } from '@/layout/topbar/topbar';
import { ModuleRenderer } from '@/utils/module-renderer';
import { q, runQuery } from '@/utils/groqd-client';
import { SANITY_DOCUMENT_IDS } from '@forma/common';

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
    q
      .parameters<TSanityQueryParams>()
      .star.filterByType('pageLayoutDocumentType')
      .filterBy('_id == $pageId')
      .slice(0)
      .project(sub => ({
        modules: sub.field('modules[]').deref()
      })),
    { parameters: { pageId: SANITY_DOCUMENT_IDS.contactUsPage } }
  );
  return (
    <div>
      <Topbar variant='floating' />
      <ModuleRenderer modules={sanityData.modules} />
    </div>
  );
}
