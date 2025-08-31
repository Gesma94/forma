import { MODULE_VARIANTS } from '@forma/common';
import type { StudioModuleDocumentType } from 'types/generated/sanity-types-generated';
import { textWithSideImage, twoColumnLayout } from '@/styles/layouts';
import { Button } from '@/ui/buttons/button/button';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { LogoIcon } from '@/ui/logos/logo-icon/logo-icon';
import { ParagraphPortableText } from '@/ui/portable-text/paragraph-portable-text';
import { getSanityImageUrl } from '@/utils/groqd-client';
import { StudioModuleSubHeading } from './subs/studio-module-subheading';

type TProps = {
  module: StudioModuleDocumentType;
};

export function StudioModule({ module }: TProps) {
  const imageUrl = getSanityImageUrl(module.image);

  return (
    <ModuleContentContainer variant={MODULE_VARIANTS.ON_BG}>
      <div
        className={twoColumnLayout({
          class: 'grid-rows-[auto_auto] grid-cols-1 xl:grid-rows-1 xl:grid-cols-[4fr_3fr] 2xl:grid-cols-2'
        })}
      >
        <div className={textWithSideImage({ class: 'flex flex-col' })}>
          <div className='flex relative md:mx-auto xl:mx-[unset]'>
            <h2 className='text-7xl md:text-8xl text-primary flex flex-col'>
              <span className='text-5xl md:text-6xl'>This is</span>
              <span className=' font-bold flex gap-2 md:whitespace-nowrap'>
                <span className='h-14 mt-2 md:h-20 md:hidden xl:block'>
                  <LogoIcon variant='brand' />
                </span>
                Forma Studio
              </span>
            </h2>
          </div>
          <div className='mt-2'>
            <StudioModuleSubHeading value={module.subHeading} />
          </div>
          <div className='mt-8'>
            <ParagraphPortableText value={module.content} variant={MODULE_VARIANTS.ON_BG} />
          </div>
          {module.showCta && (
            <div className='mt-8 grid xs:block md:mx-auto xl:mx-[unset] xs:mr-auto'>
              <Button size='large' variant='primary' surface='bg'>
                {module.CtaLabel}
              </Button>
            </div>
          )}
        </div>
        <div className='relative'>
          <img
            className='max-h-96 size-full xl:max-h-dvh object-cover rounded-2xl'
            alt={module.image.altText}
            src={imageUrl}
          />
        </div>
      </div>
    </ModuleContentContainer>
  );
}
