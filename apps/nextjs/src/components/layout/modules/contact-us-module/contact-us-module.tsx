import { tv } from 'tailwind-variants';
import { ContentContainer } from '@/ui/content-container/content-container';
import { ContactUsModuleForm } from './subs/contact-us-module-form';

export async function ContactUsModule() {
  const { outerContainerTv, topContainerTv, topInnerContainerTv, headersContainerTv, formContainerTv, h1Tv, subH1Tv } =
    styleTv();
  return (
    <div className={outerContainerTv()}>
      <div className={topContainerTv()}>
        <ContentContainer>
          <div className={topInnerContainerTv()}>
            <div className={headersContainerTv()}>
              <h1 className={h1Tv()}>Contact us</h1>
            </div>
          </div>
        </ContentContainer>
      </div>
      <div className='w-full relative'>
        <div className='w-full max-w-10xl grid grid-cols-[3fr_2fr] shadow-2xl relative -top-20 rounded-2xl overflow-hidden mx-auto z-10'>
          <div className='contain-size'>
            <img
              alt='test'
              src='https://cdn.sanity.io/images/8gia4a8i/production/28f5f20c855adcbe96456510b6bf060eee931967-1200x922.webp'
              className='object-cover size-full'
            />
          </div>
          <div className={formContainerTv()}>
            <p className={subH1Tv()}>
              Not sure what you are looking for? Let us know and we will help you find the perfect solution.
            </p>
            <ContactUsModuleForm />
          </div>
        </div>
        <img
          alt='test'
          src='https://cdn.sanity.io/images/8gia4a8i/production/28f5f20c855adcbe96456510b6bf060eee931967-1200x922.webp'
          className='object-cover size-full absolute top-0 z-0 brightness-[25%]'
        />
      </div>
    </div>
  );
}

const styleTv = tv({
  slots: {
    outerContainerTv: 'flex flex-col',
    topContainerTv: 'pt-10 pb-30 bg-bg text-primary',
    topInnerContainerTv: 'h-full w-full flex justify-between',
    innerContainerTv:
      'relative z-10 pt-20 grid grid-cols-[1fr_1fr] justify-center items-center gap-40 text-primary-text',
    headersContainerTv: 'flex flex-col w-full gap-4',
    h1Tv: 'text-9xl text-center',
    subH1Tv: 'prose-2xl',
    formContainerTv: 'bg-primary text-primary-text p-10 flex flex-col gap-10'
  }
});
