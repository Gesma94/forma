import { tv } from 'tailwind-variants';
import { ContentContainer } from '@/ui/content-container/content-container';
import { ContactUsModuleForm } from './subs/contact-us-module-form';
import { Header } from './subs/header';

export async function ContactUsModule() {
  const { outerContainerTv, bgImageTv, floatingContainerTv, floatingInnerContainerTv, formContainerTv, subH1Tv } =
    styleTv();
  return (
    <div className={outerContainerTv()}>
      <img className={bgImageTv()} src='https://cdn.sanity.io/images/8gia4a8i/production/28f5f20c855adcbe96456510b6bf060eee931967-1200x922.webp' />
      <div className={floatingContainerTv()}>
        <ContentContainer>
          <div className={floatingInnerContainerTv()}>
            <div className='contain-size'>
              <img
                alt='test'
                src='https://cdn.sanity.io/images/8gia4a8i/production/28f5f20c855adcbe96456510b6bf060eee931967-1200x922.webp'
                className='object-cover size-full'
              />
            </div>
            <div className={formContainerTv()}>
              <div className='mb-4'>
                <Header value="Contact us" />
              </div>
              <p className={subH1Tv()}>
                Not sure what you are looking for? Let us know and we will help you find the perfect solution.
              </p>
              <ContactUsModuleForm />
            </div>
      </div>
      </ContentContainer>
      </div>
    </div>
  );
}

const styleTv = tv({
  slots: {
    outerContainerTv: 'min-h-dvh relative grid grid-rows-[minmax(7.5rem,_auto)_1fr_minmax(7.5rem,_auto)] items-center-safe',
    bgImageTv: 'absolute size-full inset-0 object-cover brightness-[25%]',
    floatingContainerTv: 'row-start-2 w-full z-10',
    floatingInnerContainerTv: 'size-full grid grid-cols-[3fr_2fr]  rounded-2xl overflow-hidden',
    formContainerTv: 'bg-primary text-primary-text p-10 flex flex-col',
    subH1Tv: 'prose-xl mb-4',
  }
});
