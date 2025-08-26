import { MOTION_ANIMATION } from 'common/enums/motion-animation';
import Image from 'next/image';
import type { StudioModuleDocumentType } from 'types/generated/sanity-types-generated';
import { textWithSideImage, twoColumnLayout } from '@/styles/layouts';
import { Button } from '@/ui/buttons/button/button';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { LogoIcon } from '@/ui/logos/logo-icon/logo-icon';
import { MotionDiv } from '@/ui/motion/motion-div';
import { ParagraphPortableText } from '@/ui/portable-text/paragraph-portable-text';
import { getSanityImageUrl } from '@/utils/groqd-client';
import { StudioModuleSubHeading } from './subs/studio-module-subheading';

type TProps = {
  module: StudioModuleDocumentType;
};

export function StudioModule({ module }: TProps) {
  const imageUrl = getSanityImageUrl(module.image);
  console.log(module.content);
  return (
    <ModuleContentContainer surface='bg'>
      <MotionDiv animation={MOTION_ANIMATION.TRANSLATE_FROM_BOTTOM} className={twoColumnLayout()}>
        <div className={textWithSideImage({ class: 'flex flex-col' })}>
          <div className='flex relative'>
            <div className='absolute h-18 mt-[75px] mr-4 -left-4 -top-1 -translate-x-full'>
              <LogoIcon variant='brand' />
            </div>
            <h2 className='text-8xl text-primary flex flex-col'>
              <span className='text-6xl'>This is</span>
              <span className='font-bold'>Forma Studio</span>
            </h2>
          </div>
          <StudioModuleSubHeading value={module.subHeading} />
          <div className='mt-8'>
            <ParagraphPortableText value={module.content} surface='bg' />
          </div>
          {module.showCta && (
            <div className='mt-8 mr-auto'>
              <Button size='large' variant='primary' surface='bg'>
                {module.CtaLabel}
              </Button>
            </div>
          )}
        </div>
        <div className='relative'>
          <Image
            fill={true}
            className='w-full aspect-[9/16] h-auto object-cover rounded-2xl'
            alt='test'
            src={imageUrl}
          />
        </div>
      </MotionDiv>
    </ModuleContentContainer>
  );
}
