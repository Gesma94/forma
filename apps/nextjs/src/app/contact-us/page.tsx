import type { Viewport } from 'next';
import { ContactUsModule } from '@/layout/modules/contact-us-module/contact-us-module';
import { Topbar } from '@/layout/topbar/topbar';

export const viewport: Viewport = {
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1
};

export default async function Page() {
  return (
    <div>
      <Topbar variant='floating' />
      <ContactUsModule />
      {/* <ModuleRenderer modules={sanityData.modules} /> */}
    </div>
  );
}
