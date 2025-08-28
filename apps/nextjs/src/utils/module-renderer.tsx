import type { TAllSanityModuleSchemas } from 'types/sanity-types';
import { BrandsModule } from '@/layout/modules/brands-module/brands-module';
import { CountersModule } from '@/layout/modules/counters-module/counters-module';
import { HeroModule } from '@/layout/modules/hero-module/hero-module';
import { StudioModule } from '@/layout/modules/studio-module/studio-module';

type TProps = {
  modules: TAllSanityModuleSchemas[];
};

export function ModuleRenderer({ modules }: TProps) {
  return modules.map(module => {
    switch (module._type) {
      case 'heroModuleDocumentType':
        return <HeroModule key={module._id} module={module} />;
      case 'studioModuleDocumentType':
        return <StudioModule key={module._id} module={module} />;
      case 'countersModuleDocumentType':
        return <CountersModule key={module._id} module={module} />;
      case 'brandsModuleDocumentType':
        return <BrandsModule key={module._id} module={module} />;
    }
  });
}
