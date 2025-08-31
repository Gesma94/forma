import { SANITY_DOCUMENT_IDS } from '@forma/common';
import { CalendarDotsIcon } from '@phosphor-icons/react/dist/ssr';
import type { Viewport } from 'next';
import { Topbar } from '@/layout/topbar/topbar';
import { ContentContainer } from '@/ui/content-container/content-container';
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
  const result = await runQuery(
    q
      .parameters<TSanityQueryParams>()
      .star.filterByType('pageLayoutDocumentType')
      .filterBy('_id == $pageId')
      .slice(0)
      .project(sub => ({
        modules: sub.field('modules[]').deref()
      })),
    { parameters: { pageId: SANITY_DOCUMENT_IDS.bookpage } }
  );

  return (
    <div>
      <Topbar variant='floating' />
      <div className='relative'>
        <img
          alt='we'
          src='https://cdn.sanity.io/images/8gia4a8i/production/70d69846f77d7644b1a6a734c703296eca8b412d-2000x1430.jpg'
          className='absolute object-cover size-full brightness-50'
        />
        <ContentContainer>
          <div className='relative py-20 grid grid-cols-2 gap-20'>
            <div className='relative top-20 mb-auto'>
              <div className='absolute -bottom-10 right-10 rotate-12 opacity-10'>
                <CalendarDotsIcon className='size-80 text-primary' />
              </div>
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
            <div className='flex flex-col gap-4 mt-60'>
              <input
                type='text'
                className='w-full border bg-bg border-bg-text/20 rounded-md h-14 px-4 text-lg font-base font-light'
                placeholder='Search available slots...'
              />
              <input
                type='text'
                className='w-full border bg-bg border-bg-text/20 rounded-md h-14 px-4 text-lg font-base font-light'
                placeholder='Search available slots...'
              />
              <input
                type='text'
                className='w-full border bg-bg border-bg-text/20 rounded-md h-14 px-4 text-lg font-base font-light'
                placeholder='Search available slots...'
              />
              <input
                type='text'
                className='w-full border bg-bg border-bg-text/20 rounded-md h-14 px-4 text-lg font-base font-light'
                placeholder='Search available slots...'
              />
              <input
                type='text'
                className='w-full border bg-bg border-bg-text/20 rounded-md h-14 px-4 text-lg font-base font-light'
                placeholder='Search available slots...'
              />
              <input
                type='text'
                className='w-full border bg-bg border-bg-text/20 rounded-md h-14 px-4 text-lg font-base font-light'
                placeholder='Search available slots...'
              />
              <input
                type='text'
                className='w-full border bg-bg border-bg-text/20 rounded-md h-14 px-4 text-lg font-base font-light'
                placeholder='Search available slots...'
              />
              <input
                type='text'
                className='w-full border bg-bg border-bg-text/20 rounded-md h-14 px-4 text-lg font-base font-light'
                placeholder='Search available slots...'
              />
              <input
                type='text'
                className='w-full border bg-bg border-bg-text/20 rounded-md h-14 px-4 text-lg font-base font-light'
                placeholder='Search available slots...'
              />
              <input
                type='text'
                className='w-full border bg-bg border-bg-text/20 rounded-md h-14 px-4 text-lg font-base font-light'
                placeholder='Search available slots...'
              />
              {/* <input type="text" className='w-full border bg-bg border-bg-text/20 rounded-md h-14 px-4 text-lg font-base font-light' placeholder='Search available slots...' />
            <input type="text" className='w-full border bg-bg border-bg-text/20 rounded-md h-14 px-4 text-lg font-base font-light' placeholder='Search available slots...' />
            <input type="text" className='w-full border bg-bg border-bg-text/20 rounded-md h-14 px-4 text-lg font-base font-light' placeholder='Search available slots...' />
            <input type="text" className='w-full border bg-bg border-bg-text/20 rounded-md h-14 px-4 text-lg font-base font-light' placeholder='Search available slots...' />
            <input type="text" className='w-full border bg-bg border-bg-text/20 rounded-md h-14 px-4 text-lg font-base font-light' placeholder='Search available slots...' />
            <input type="text" className='w-full border bg-bg border-bg-text/20 rounded-md h-14 px-4 text-lg font-base font-light' placeholder='Search available slots...' /> */}
            </div>
          </div>
        </ContentContainer>
      </div>
      <ModuleRenderer modules={result.modules} />
    </div>
  );
}
