import { SANITY_DOCUMENT_IDS } from '@forma/common';
import type { Viewport } from 'next';
import { getCalendlyDaysAvailableSlots } from 'services/calendly';
import { Topbar } from '@/layout/topbar/topbar';
import { Button } from '@/ui/buttons/button/button';
import { ContentContainer } from '@/ui/content-container/content-container';
import { DateField } from '@/ui/fields/date-field/date-field';
import { SelectField } from '@/ui/fields/select-field/select-field';
import { SelectOption } from '@/ui/fields/select-field/select-option';
import { TextAreaField } from '@/ui/fields/text-area-field/text-area-field';
import { TextField } from '@/ui/fields/text-field/text-field';
import { q, runQuery } from '@/utils/groqd-client';
import { ModuleRenderer } from '@/utils/module-renderer';

type TSanityQueryParams = {
  pageId: string;
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1
};

export default async function Page() {
  const [_, sanityData] = await Promise.all([
    getCalendlyDaysAvailableSlots(14),
    runQuery(
      q
        .parameters<TSanityQueryParams>()
        .star.filterByType('pageLayoutDocumentType')
        .filterBy('_id == $pageId')
        .slice(0)
        .project(sub => ({
          modules: sub.field('modules[]').deref()
        })),
      { parameters: { pageId: SANITY_DOCUMENT_IDS.bookpage } }
    )
  ]);

  return (
    <div>
      <Topbar variant='floating' />
      <div className='relative'>
        <img
          alt='we'
          src='https://cdn.sanity.io/images/8gia4a8i/production/70d69846f77d7644b1a6a734c703296eca8b412d-2000x1430.jpg'
          className='absolute object-cover size-full brightness-[30%]'
        />
        <ContentContainer>
          <div className='relative py-20 flex flex-col xl:grid xl:grid-cols-2 gap-20'>
            <div className='xl:sticky pt-20 top-20 mb-auto'>
              <div className='relative'>
                <h1 className='text-9xl text-primary font-bold font-accent'>Book a call now!</h1>
                <p className=' mt-10 prose-2xl prose-p:my-0 font-base font-light text-primary-text'>
                  This meeting is to <span className='font-bold'>discuss the Architectural illustration</span> for your
                  next project/design. Please choose the time that fits your schedule, answer all the questions briefly,
                  and <span className='font-bold'>we'll dive into details in the meeting</span>.
                </p>
              </div>
              {/* <img src='https://placehold.co/400x400' className='object-cover w-full max-h-96 aspect-square rounded-2xl mt-10' /> */}
            </div>
            <div className='flex flex-col gap-4 xl:mt-60 w-full max-w-2xl mx-auto'>
              <TextField type='text' label='Full name' />
              <TextField type='email' label='Email' />
              <div className='flex flex-col sm:grid sm:grid-cols-2 gap-4'>
                <DateField label='Appointment Date' />
                <SelectField label='Appointment slot'>
                  <SelectOption>Aardvark</SelectOption>
                  <SelectOption>Cat</SelectOption>
                  <SelectOption>Dog</SelectOption>
                  <SelectOption>Kangaroo</SelectOption>
                  <SelectOption>Panda</SelectOption>
                  <SelectOption>Snake</SelectOption>
                </SelectField>
              </div>
              <TextField type='text' label='Company/Studio' />
              <TextAreaField label='Whats the project about?' rows={4} />
              <DateField label='When is the deadline?' />
              <SelectField label='In which phase is the project?'>
                <SelectOption>Concept Development</SelectOption>
                <SelectOption>Design Development</SelectOption>
                <SelectOption>Presentation Submission</SelectOption>
                <SelectOption>Competition Submission</SelectOption>
                <SelectOption>Marketing</SelectOption>
              </SelectField>
              <div>
                <Button className='min-w-2xs mt-10' size='large' variant='primary' surface='bg'>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </ContentContainer>
      </div>
      <ModuleRenderer modules={sanityData.modules} />
    </div>
  );
}
