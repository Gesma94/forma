import { MODULE_VARIANTS } from '@forma/common';
import type { ServicesModuleDocumentType } from 'types/generated/sanity-types-generated';
import { BackgroundVariantContainer } from '@/ui/containers/background-variant-container/background-variant-container';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { VerticalPaddingContainer } from '@/ui/containers/vertical-padding-container/vertical-padding-container';
import { ContentContainer } from '@/ui/content-container/content-container';
import { ParagraphPortableText } from '@/ui/portable-text/paragraph-portable-text';
import { ServiceCard } from './subs/service-card';

type TProps = {
  module: ServicesModuleDocumentType;
};

export async function ServicesModule({ module }: TProps) {
  const variant = MODULE_VARIANTS.ON_BG;

  return (
    <BackgroundVariantContainer variant={variant}>
      <VerticalPaddingContainer {...module.paddings}>
        <ModuleContentContainer title={module.heading} variant={variant}>
          <div>
            <div>
              <ContentContainer>
                <ParagraphPortableText
                  value={module.subHeading}
                  variant={MODULE_VARIANTS.ON_BG}
                  className='text-center'
                />
              </ContentContainer>
            </div>
          </div>
          <div className='mt-10 grid grid-cols-3 gap-4'>
            <ServiceCard service={module.services.at(0)} />
            <ServiceCard service={module.services.at(1)} />
            <ServiceCard service={module.services.at(2)} />
          </div>
        </ModuleContentContainer>
      </VerticalPaddingContainer>
    </BackgroundVariantContainer>
  );
}
