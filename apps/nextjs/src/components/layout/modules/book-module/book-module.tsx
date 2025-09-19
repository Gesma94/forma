import type { BookModuleDocumentType } from 'types/generated/sanity-types-generated';
import { ContentContainer } from '@/ui/content-container/content-container';
import { getSanityImageUrl } from '@/utils/groqd-client';
import { BookModuleHeading } from './subs/book-module-heading';
import { BookModuleSubHeading } from './subs/book-module-subheading';
import { getCalendlyDaysAvailableSlots } from 'services/calendly';
import { BookModuleForm } from './subs/book-module-form';

type TProps = {
  module: BookModuleDocumentType;
};

export async function BookModule({ module }: TProps) {
  const calendlyData = await getCalendlyDaysAvailableSlots(14);
  const backgroundImageUrl = getSanityImageUrl(module.backgroundImage);

  return (
    <div className='relative min-h-dvh grid grid-rows-[minmax(5rem,1fr)_auto_minmax(5rem,1fr)]'>
      <img
        alt={module.backgroundImage.altText}
        src={backgroundImageUrl}
        className='absolute object-cover size-full brightness-[30%]'
      />
      <div className='row-start-2'>
        <ContentContainer>
          <div className='relative flex flex-col xl:grid xl:grid-cols-2 gap-20'>
            <div>
              <BookModuleHeading value={module.heading} />
              <div className='mt-10'>
                <BookModuleSubHeading value={module.subHeading} />
              </div>
            </div>
            <BookModuleForm availableSlots={calendlyData} />
          </div>
        </ContentContainer>
      </div>
    </div>
  );
}
