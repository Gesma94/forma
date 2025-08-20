import { q, runQuery } from '@/utils/groqd-client';
import { ModuleRenderer } from '@/utils/module-renderer';
import { SANITY_DOCUMENT_IDS } from '@forma/common';

type TSanityQueryParams = {
  pageId: string;
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
    </div>
  );
}
