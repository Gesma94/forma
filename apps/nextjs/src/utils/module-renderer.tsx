import type { AllSanitySchemaTypes } from 'types/generated/sanity-types-generated';
import { BrandsModule } from '@/layout/modules/brands-module/brands-module';
import { CountersModule } from '@/layout/modules/counters-module/counters-module';
import { HeroModule } from '@/layout/modules/hero-module/hero-module';
import { QuotesModule } from '@/layout/modules/quotes-module/quotes-module';
import { ReviewsModule } from '@/layout/modules/reviews-module/reviews-module';
import { ServicesModule } from '@/layout/modules/services-module/services-module';
import { StudioModule } from '@/layout/modules/studio-module/studio-module';
import { TextWithImageModule } from '@/layout/modules/text-with-image-module/text-with-image-module';

type TProps = {
  modules: AllSanitySchemaTypes[];
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
      case 'textWithImageModuleDocumentType':
        return <TextWithImageModule key={module._id} module={module} />;
      case 'quotesModuleDocumentType':
        return <QuotesModule key={module._id} module={module} />;
      case 'reviewsModuleDocumentType':
        return <ReviewsModule key={module._id} module={module} />;
      case 'servicesModuleDocumentType':
        return <ServicesModule key={module._id} module={module} />;
      default:
        return null;
    }
  });
}
