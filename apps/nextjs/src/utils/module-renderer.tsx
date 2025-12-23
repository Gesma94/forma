import type { AllSanitySchemaTypes } from 'types/generated/sanity-types-generated';
import { BookModule } from '@/layout/modules/book-module/book-module';
import { BrandsModule } from '@/layout/modules/brands-module/brands-module';
import { CardsModule } from '@/layout/modules/cards-module/cards-module';
import { ContactUsModule } from '@/layout/modules/contact-us-module/contact-us-module';
import { CountersModule } from '@/layout/modules/counters-module/counters-module';
import { HalfHeroModule } from '@/layout/modules/half-hero-module/half-hero-module';
import { HeroModule } from '@/layout/modules/hero-module/hero-module';
import { HowItWorksModule } from '@/layout/modules/how-it-works-module/how-it-works-module';
import { InlineGalleryModule } from '@/layout/modules/inline-gallery-module/inline-gallery-module';
import { ListWithImageModule } from '@/layout/modules/list-with-image-module/list-with-image-module';
import { ParallaxImageModule } from '@/layout/modules/parallax-image-module/parallax-image-module';
import { ProcessModule } from '@/layout/modules/process-module/process-module';
import { QuotesModule } from '@/layout/modules/quotes-module/quotes-module';
import { ReadyToStartModule } from '@/layout/modules/ready-to-start-module/ready-to-start-module';
import { ReviewsModule } from '@/layout/modules/reviews-module/reviews-module';
import { ScrollGalleryModule } from '@/layout/modules/scroll-gallery-module/scroll-gallery-module';
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
      case 'inlineGalleryModuleDocumentType':
        return <InlineGalleryModule key={module._id} module={module} />;
      case 'teamModuleDocumentType':
        return <TeamModule key={module._id} module={module} />;
      case 'readyToStartModuleDocumentType':
        return <ReadyToStartModule key={module._id} module={module} />;
      case 'processModuleDocumentType':
        return <ProcessModule key={module._id} module={module} />;
      case 'halfHeroModuleDocumentType':
        return <HalfHeroModule key={module._id} module={module} />;
      case 'scrollGalleryModuleDocumentType':
        return <ScrollGalleryModule key={module._id} module={module} />;
      case 'parallaxImagesModuleDocumentType':
        return <ParallaxImageModule key={module._id} module={module} />;
      case 'contactUsModuleDocumentType':
        return <ContactUsModule key={module._id} module={module} />;
      case 'listWithImageModuleDocumentType':
        return <ListWithImageModule key={module._id} module={module} />;
      default:
        return null;
    }
  });
}
