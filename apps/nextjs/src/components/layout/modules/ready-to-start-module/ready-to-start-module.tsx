import { MODULE_VARIANTS } from '@forma/common';
import type { ReadyToStartModuleDocumentType } from 'types/generated/sanity-types-generated';
import { LinkButton } from '@/ui/buttons/link-button/link-button';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { FormaMedia } from '@/ui/forma-media/forma-media';
import { Subtitle } from './subs/subtitle';
import { Title } from './subs/title';

type TProps = {
  module: ReadyToStartModuleDocumentType;
};

export async function ReadyToStartModule({ module }: TProps) {
  return (
    <ModuleContentContainer skipContentContainer={true} skipYPadding={true} variant={MODULE_VARIANTS.ON_PRIMARY}>
      <div className='h-ready-to-start w-full relative'>
        <div className='absolute size-full'>
          <FormaMedia
            formaMedia={module.backgroundMedia}
            className='object-cover size-full'
            imageBuilderOptions={{ quality: 40 }}
          />
        </div>
        <div className='flex flex-col gap-4 relative z-10  justify-center items-center size-full'>
          <Title value={module.title} />
          <Subtitle value={module.subtitle} />
          <div className='w-full px-4 sm:w-auto sm:mx-auto flex flex-col sm:flex-row gap-2 sm:gap-8'>
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
