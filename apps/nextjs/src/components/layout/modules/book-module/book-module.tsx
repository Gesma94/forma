import { getCalComAvailableSlots } from 'services/cal-com';
import type { BookModuleDocumentType } from 'types/generated/sanity-types-generated';
import { Scrolldown } from '@/layout/scrolldown/scrolldown';
import { ContentContainer } from '@/ui/content-container/content-container';
import { FormaMedia } from '@/ui/forma-media/forma-media';
import { BookModuleForm } from './subs/book-module-form';
import { BookModuleHeading } from './subs/book-module-heading';
import { BookModuleSubHeading } from './subs/book-module-subheading';

type TProps = {
  module: BookModuleDocumentType;
};

export async function BookModule({ module }: TProps) {
  const calComData = await getCalComAvailableSlots(14);

  return (
    <div className='relative min-h-dvh grid grid-rows-[minmax(5rem,1fr)_auto_minmax(5rem,1fr)]'>
      <div className='absolute size-full'>
        <FormaMedia formaMedia={module.backgroundMedia} className='object-cover size-full' />
      </div>
      <div className='row-start-2'>
        <ContentContainer>
          <div className='relative flex flex-col xl:grid xl:grid-cols-2 gap-20'>
            <div>
              <BookModuleHeading value={module.heading} />
              <div className='mt-10'>
                <BookModuleSubHeading value={module.subHeading} />
              </div>
            </div>
            <BookModuleForm availableSlots={calComData} availablePhases={module.projectPhases} />
          </div>
        </ContentContainer>
      </div>
      <div className='absolute bottom-4 w-full flex justify-center mt-4'>
        <Scrolldown label={module.scrollText} />
      </div>
    </div>
  );
}
