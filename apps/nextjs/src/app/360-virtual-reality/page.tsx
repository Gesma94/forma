import type { Viewport } from 'next';
import { Topbar } from '@/layout/topbar/topbar';
import { Viewer360 } from '@/ui/viewer-360/viewer-360';

export const viewport: Viewport = {
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1
};

// export async function generateMetadata(): Promise<Metadata> {
//   return commonGenerateMetadata(SANITY_DOCUMENT_IDS.contactUsPage);
// }

export default async function Page() {
  // const sanityData = await runQuery(
  //   q
  //     .parameters<TSanityQueryParams>()
  //     .star.filterByType('pageLayoutDocumentType')
  //     .filterBy('_id == $pageId')
  //     .slice(0)
  //     .project(sub => ({
  //       modules: sub.field('modules[]').deref()
  //     })),
  //   { parameters: { pageId: SANITY_DOCUMENT_IDS.contactUsPage } }
  // );
  return (
    <div>
      <Topbar variant='floating' />
      <div className=''>
        <Viewer360 imageUrl='https://forma-studio.transforms.svdcdn.com/production/images/22002_ArtOfLiving_Coworking_View01_OpenSpace_360_2023-11-21-151326_vfuu.jpg?w=1200&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1700579606&s=9365f931022071e5ff5d0ea189bd3620' />
      </div>
      {/* <ModuleRenderer modules={sanityData.modules} /> */}
    </div>
  );
}
