import { tv } from 'tailwind-variants';
import type { HalfHeroModuleDocumentType } from 'types/generated/sanity-types-generated';
import { Scrolldown } from '@/layout/scrolldown/scrolldown';
import { ContentContainer } from '@/ui/content-container/content-container';
import { FormaMedia } from '@/ui/forma-media/forma-media';
import { HalfHeroHeading } from './subs/half-hero-heading';
import { HalfHeroSubHeading } from './subs/half-hero-subheading';

type TProps = {
  module: HalfHeroModuleDocumentType;
};

export async function HalfHeroModule({ module }: TProps) {
  const { bgImageTv, containerTv, contentWrapperTv, contentContainerTv } = styles();

  return (
    <div className={containerTv()}>
      <div className='absolute size-full'>
        <FormaMedia
          formaMedia={module.backgroundMedia}
          className={bgImageTv()}
          forceIs360HintShown={false}
          forceHideMediaTitle={true}
          wrapper360Classname='size-full overflow-hidden'
          imageBuilderOptions={{ quality: 40 }}
        />
      </div>
      <div className={contentWrapperTv()}>
        <ContentContainer>
          <div className={contentContainerTv()}>
            <HalfHeroHeading value={module.heading} />
            <HalfHeroSubHeading value={module.subHeading} />
          </div>
        </ContentContainer>
      </div>
      <div className='absolute bottom-4 w-full flex justify-center mt-4'>
        <Scrolldown label={module.scrollText} />
      </div>
    </div>
  );
}

const styles = tv({
  slots: {
    containerTv: 'w-full relative sm:min-h-half-hero-height h-dvh grid grid-cols-1 grid-rows-1',
    bgImageTv: ['object-cover row-start-1 col-start-1 w-full h-full sm:contain-size'],
    contentWrapperTv: ['row-start-1 col-start-1 z-10', 'pt-30 pb-20  sm:pt-[unset] sm:pb-[unset] sm:px-[unset]'],
    contentContainerTv: 'max-w-4xl h-full flex flex-col gap-4 justify-center'
  }
});
