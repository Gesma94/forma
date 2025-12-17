import { getFormaImageData } from 'common/utils/get-forma-image';
import { tv } from 'tailwind-variants';
import type { ContactUsModuleDocumentType } from 'types/generated/sanity-types-generated';
import { ContentContainer } from '@/ui/content-container/content-container';
import { ContactUsModuleForm } from './subs/contact-us-module-form';
import { Header } from './subs/header';
import { Subheading } from './subs/subheading';

type TProps = {
  module: ContactUsModuleDocumentType;
};

export async function ContactUsModule({ module }: TProps) {
  const [backgroundImageData, cardBackgroundImageData] = await Promise.all([
    getFormaImageData(module.backgroundImage),
    getFormaImageData(module.cardBackgroundImage)
  ]);

  const { outerContainerTv, bgImageTv, floatingContainerTv, floatingInnerContainerTv, formContainerTv } = styleTv();
  return (
    <div className={outerContainerTv()}>
      <img className={bgImageTv()} src={backgroundImageData.imageUrl} alt={backgroundImageData.imageAltText} />
      <div className={floatingContainerTv()}>
        <ContentContainer>
          <div className={floatingInnerContainerTv()}>
            <div className='contain-size'>
              <img
                src={cardBackgroundImageData.imageUrl}
                alt={cardBackgroundImageData.imageAltText}
                className='object-cover size-full'
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
    </div>
  );
}

const styleTv = tv({
  slots: {
    outerContainerTv:
      'min-h-dvh relative grid grid-rows-[minmax(7.5rem,_auto)_1fr_minmax(7.5rem,_auto)] items-center-safe',
    bgImageTv: 'absolute size-full inset-0 object-cover brightness-[25%]',
    floatingContainerTv: 'row-start-2 w-full z-10',
    floatingInnerContainerTv: 'size-full grid grid-cols-[3fr_2fr]  rounded-2xl overflow-hidden',
    formContainerTv: 'bg-primary text-primary-text p-10 flex flex-col'
  }
});
