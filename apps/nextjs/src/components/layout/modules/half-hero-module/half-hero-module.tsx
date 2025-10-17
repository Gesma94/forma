import { tv } from 'tailwind-variants';
import type { HalfHeroModuleDocumentType } from 'types/generated/sanity-types-generated';
import { ContentContainer } from '@/ui/content-container/content-container';
import { getSanityImageUrl } from '@/utils/groqd-client';
import { HalfHeroHeading } from './subs/half-hero-heading';
import { HalfHeroSubHeading } from './subs/half-hero-subheading';

type TProps = {
  module: HalfHeroModuleDocumentType;
};

export async function HalfHeroModule({ module }: TProps) {
  const { bgImageTv, containerTv, contentWrapperTv, contentContainerTv } = styles();
  const imageUrl = getSanityImageUrl(module.backgroundImage);

  return (
    <div className={containerTv()}>
      <img
        src={imageUrl}
        alt={module.backgroundImage.altText}
        className={bgImageTv()}
        style={{ filter: `brightness(${module.backgroundImage.brightness}%)` }}
      />

      <div className={contentWrapperTv()}>
        <ContentContainer>
          <div className={contentContainerTv()}>
            <HalfHeroHeading value={module.heading} />
            <HalfHeroSubHeading value={module.subHeading} />
          </div>
        </ContentContainer>
      </div>
    </div>
  );
}

const styles = tv({
  slots: {
    containerTv: 'w-full relative sm:h-half-hero-height grid grid-cols-1 grid-rows-1',
    bgImageTv: ['object-cover row-start-1 col-start-1', 'w-full h-full sm:h-half-hero-height'],
    contentWrapperTv: ['row-start-1 col-start-1 z-10', 'pt-30 pb-20  sm:pt-[unset] sm:pb-[unset] sm:px-[unset]'],
    contentContainerTv: 'max-w-4xl h-full flex flex-col justify-center gap-4'
  }
});
