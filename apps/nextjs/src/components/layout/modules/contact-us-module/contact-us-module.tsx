import { tv } from 'tailwind-variants';
import type { ContactUsModuleDocumentType } from 'types/generated/sanity-types-generated';
import { Scrolldown } from '@/layout/scrolldown/scrolldown';
import { ContentContainer } from '@/ui/content-container/content-container';
import { FormaMedia } from '@/ui/forma-media/forma-media';
import { ContactUsModuleForm } from './subs/contact-us-module-form';
import { Header } from './subs/header';
import { Subheading } from './subs/subheading';

type TProps = {
  module: ContactUsModuleDocumentType;
};

export async function ContactUsModule({ module }: TProps) {
  const {
    outerContainerTv,
    imageWrapperTv,
    bgImageTv,
    floatingContainerTv,
    floatingInnerContainerTv,
    formContainerTv
  } = styleTv();

  return (
    <div className={outerContainerTv()}>
      <div className={imageWrapperTv()}>
        <FormaMedia formaMedia={module.backgroundMedia} className={bgImageTv()} imageBuilderOptions={{ quality: 35 }} />
      </div>
      <div className={floatingContainerTv()}>
        <ContentContainer>
          <div className={floatingInnerContainerTv()}>
            <div className='hidden lg:block contain-size bg-primary/80'>
              <FormaMedia
                formaMedia={module.cardBackgroundMedia}
                className='object-cover size-full'
                imageBuilderOptions={{ width: 1800 }}
              />
            </div>
            <div className={formContainerTv()}>
              <div className='mb-4'>
                <Header value={module.heading} />
              </div>
              <Subheading value={module.subHeading} />
              <ContactUsModuleForm ctaLabel={module.CtaLabel} />
            </div>
          </div>
        </ContentContainer>
      </div>
      <div className='absolute bottom-4 w-full flex justify-center mt-4'>
        <Scrolldown label={module.scrollText} />
      </div>
    </div>
  );
}

const styleTv = tv({
  slots: {
    outerContainerTv:
      'min-h-dvh relative grid grid-rows-[minmax(7.5rem,_auto)_1fr_minmax(7.5rem,_auto)] items-center-safe',
    imageWrapperTv: 'absolute size-full inset-0',
    bgImageTv: 'size-full object-cover',
    floatingContainerTv: 'row-start-2 w-full z-10',
    floatingInnerContainerTv: 'size-full grid grid-cols-[0fr-1fr] lg:grid-cols-[3fr_2fr] rounded-2xl overflow-hidden',
    formContainerTv: 'sm:bg-primary text-primary-text p-0 sm:p-10 flex flex-col'
  }
});
