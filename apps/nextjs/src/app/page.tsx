import { SANITY_DOCUMENT_IDS } from '@forma/common';
import type { Metadata, Viewport } from 'next';
import { Topbar } from '@/layout/topbar/topbar';
import { commonGenerateMetadata } from '@/utils/common-generate-metadata';
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

export async function generateMetadata(): Promise<Metadata> {
  return commonGenerateMetadata(SANITY_DOCUMENT_IDS.homepage);
}

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
      <Topbar variant='floating' />
      <ModuleRenderer modules={result.modules} />
    </div>
  );
}
