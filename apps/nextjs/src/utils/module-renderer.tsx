import type { TAllSanityModuleSchemas } from 'types/sanity-types';
import { HeroModule } from '@/layout/modules/hero-module/hero-module';

type TProps = {
  modules: TAllSanityModuleSchemas[];
};

export function ModuleRenderer({ modules }: TProps) {
  return modules.map(module => {
    switch (module._type) {
      case 'heroModuleDocumentType':
        return <HeroModule key={module._id} module={module} />;
    }
  });
}
