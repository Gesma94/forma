import { SANITY_DOCUMENT_IDS } from '@forma/common';
import type { Viewport } from 'next';
import { Topbar } from '@/layout/topbar/topbar';
import { q, runQuery } from '@/utils/groqd-client';
import { ModuleRenderer } from '@/utils/module-renderer';
import { ContactUsModule } from '@/layout/modules/contact-us-module/contact-us-module';

type TSanityQueryParams = {
  pageId: string;
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1
};

export default async function Page() {
  
  return (
    <div>
      <Topbar variant='solidWhite' />
      <ContactUsModule module={null} />
      {/* <ModuleRenderer modules={sanityData.modules} /> */}
    </div>
  );
}
