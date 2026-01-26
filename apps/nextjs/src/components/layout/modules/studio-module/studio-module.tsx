import { MODULE_VARIANTS } from '@forma/common';
import type { StudioModuleDocumentType } from 'types/generated/sanity-types-generated';
import { LinkButton } from '@/ui/buttons/link-button/link-button';
import { BackgroundVariantContainer } from '@/ui/containers/background-variant-container/background-variant-container';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { VerticalPaddingContainer } from '@/ui/containers/vertical-padding-container/vertical-padding-container';
import { FormaMedia } from '@/ui/forma-media/forma-media';
import { ParagraphPortableText } from '@/ui/portable-text/paragraph-portable-text';
import { StudioModuleSubHeading } from './subs/studio-module-subheading';

type TProps = {
  module: StudioModuleDocumentType;
};

export async function StudioModule({ module }: TProps) {
  const variant = MODULE_VARIANTS.ON_BG;

  return (
    <BackgroundVariantContainer variant={variant}>
      <VerticalPaddingContainer {...module.paddings}>
        <ModuleContentContainer variant={variant}>
          <div className='grid gap-8 xl:gap-20 grid-rows-[auto-auto] grid-cols-1 xl:grid-rows-1 xl:grid-cols-[1fr_2fr]'>
            <div className='flex flex-col min-w-0'>
              <h2 className='text-7xl md:text-8xl text-primary flex flex-col'>
                <span className='text-5xl md:text-6xl'>This is</span>
                <span className='flex flex-col font-bold'>Forma</span>
              </h2>
              <div className='mt-2'>
                <StudioModuleSubHeading value={module.subHeading} />
              </div>
              <div className='mt-8'>
                <ParagraphPortableText value={module.content} variant={MODULE_VARIANTS.ON_BG} />
              </div>
              {module.primaryCta.showCta && (
                <div className='mt-8 grid xs:flex'>
                  <LinkButton href={module.primaryCta.url} size='large' variant='primary' surface='bg'>
                    {module.primaryCta.caption}
                  </LinkButton>
                </div>
              )}
            </div>
            <div className='relative xl:contain-size'>
              <FormaMedia
                formaMedia={module.media}
                className='w-full h-auto xl:h-full xl:size-full xl:max-h-dvh object-cover rounded-2xl'
              />
            </div>
          </div>
        </ModuleContentContainer>
      </VerticalPaddingContainer>
    </BackgroundVariantContainer>
  );
}
