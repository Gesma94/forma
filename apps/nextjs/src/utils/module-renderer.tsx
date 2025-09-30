import type { AllSanitySchemaTypes } from 'types/generated/sanity-types-generated';
import { BookModule } from '@/layout/modules/book-module/book-module';
import { BrandsModule } from '@/layout/modules/brands-module/brands-module';
import { CardsModule } from '@/layout/modules/cards-module/cards-module';
import { CountersModule } from '@/layout/modules/counters-module/counters-module';
import { HeroModule } from '@/layout/modules/hero-module/hero-module';
import { HowItWorksModule } from '@/layout/modules/how-it-works-module/how-it-works-module';
import { ImageModule } from '@/layout/modules/image-module/image-module';
import { InlineGalleryModule } from '@/layout/modules/inline-gallery-module/inline-gallery-module';
import { QuotesModule } from '@/layout/modules/quotes-module/quotes-module';
import { ReadyToStartModule } from '@/layout/modules/ready-to-start-module/ready-to-start-module';
import { ReasonsModule } from '@/layout/modules/reasons-module/reasons-module';
import { ReviewsModule } from '@/layout/modules/reviews-module/reviews-module';
import { ServicesModule } from '@/layout/modules/services-module/services-module';
import { StudioModule } from '@/layout/modules/studio-module/studio-module';
import { TeamModule } from '@/layout/modules/team-module/team-module';
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
      case 'howItWorksModuleDocumentType':
        return <HowItWorksModule key={module._id} module={module} />;
      case 'cardsModuleDocumentType':
        return <CardsModule key={module._id} module={module} />;
      case 'bookModuleDocumentType':
        return <BookModule key={module._id} module={module} />;
      case 'imageModuleDocumentType':
        return <ImageModule key={module._id} module={module} />;
      case 'reasonsModuleDocumentType':
        return <ReasonsModule key={module._id} module={module} />;
      case 'inlineGalleryModuleDocumentType':
        return <InlineGalleryModule key={module._id} module={module} />;
      case 'teamModuleDocumentType':
        return <TeamModule key={module._id} module={module} />;
      case 'readyToStartModuleDocumentType':
        return <ReadyToStartModule key={module._id} module={module} />;
      default:
        return null;
    }
  });
}
