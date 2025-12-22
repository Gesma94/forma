import { MODULE_VARIANTS } from '@forma/common';
import { getFormaImageData } from 'common/utils/get-forma-image';
import Image from 'next/image';
import type { ReadyToStartModuleDocumentType } from 'types/generated/sanity-types-generated';
import { LinkButton } from '@/ui/buttons/link-button/link-button';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { Subtitle } from './subs/subtitle';

type TProps = {
  module: ReadyToStartModuleDocumentType;
};

export async function ReadyToStartModule({ module }: TProps) {
  const backgroundImageData = await getFormaImageData(module.backgroundImage);

  return (
    <ModuleContentContainer skipContentContainer={true} skipYPadding={true} variant={MODULE_VARIANTS.ON_PRIMARY}>
      <div className='h-ready-to-start w-full relative'>
        <Image
          src={backgroundImageData.imageUrl}
          alt={backgroundImageData.imageAltText}
          fill
          className='object-cover'
          style={{ filter: `brightness(${module.backgroundImage.brightness}%)` }}
        />
        <div className='flex flex-col gap-4 relative z-10  justify-center items-center size-full'>
          <h3 className='text-6xl md:text-7xl text-bg font-bold text-center'>{module.title}</h3>
          <Subtitle value={module.subtitle} />
          <div className='grid sm:grid-cols-2 gap-4'>
            <LinkButton href='/book' size='large' variant='primary' surface='bg'>
              {module.primaryCtaLabel}
            </LinkButton>
            <LinkButton href='/contact-us' size='large' variant='primary' surface='primary'>
              {module.emailCta}
            </LinkButton>
          </div>
        </div>
      </div>
    </ModuleContentContainer>
  );
}
