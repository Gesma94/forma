import { MODULE_VARIANTS } from '@forma/common';
import type { ServicesModuleDocumentType } from 'types/generated/sanity-types-generated';
import { LinkButton } from '@/ui/buttons/link-button/link-button';
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
          <div className='mt-10 grid grid-cols-3 gap-4 relative z-10'>
            <ServiceCard service={module.services.at(0)} />
            <ServiceCard service={module.services.at(1)} />
            <ServiceCard service={module.services.at(2)} />
          </div>
          {(module.primaryCta.showCta || module.secondaryCta.showCta) && (
            <div className='mt-10 mx-auto flex justify-center gap-8 z-0 relative'>
              {module.primaryCta.showCta && (
                <LinkButton href={module.primaryCta.url} size='large' variant='primary' surface='bg'>
                  {module.primaryCta.caption}
                </LinkButton>
              )}
              {module.secondaryCta.showCta && (
                <LinkButton href={module.secondaryCta.url} size='large' variant='ghost' surface='bg'>
                  {module.secondaryCta.caption}
                </LinkButton>
              )}
            </div>
          )}
        </ModuleContentContainer>
      </VerticalPaddingContainer>
    </BackgroundVariantContainer>
  );
}
