import type { HeroModuleDocumentType } from 'types/generated/sanity-types-generated';
import { Scrolldown } from '@/layout/scrolldown/scrolldown';
import { LinkButton } from '@/ui/buttons/link-button/link-button';
import { ContentContainer } from '@/ui/content-container/content-container';
import { FormaMedia } from '@/ui/forma-media/forma-media';
import { getSanityImageUrl, q, runQuery } from '@/utils/groqd-client';
import { HeroModuleHeadingPortableText } from './subs/hero-module-heading-portable-text';
import { HeroModuleSubHeadingPortableText } from './subs/hero-module-subheading-portable-text';

type TProps = {
  module: HeroModuleDocumentType;
};

type TSanityQueryParams = {
  firmIds: string[];
};

export async function HeroModule({ module }: TProps) {
  const firms = await runQuery(
    q.parameters<TSanityQueryParams>().star.filterByType('brandDocumentType').filterRaw('_id in $firmIds'),
    { parameters: { firmIds: module.firmImages.map(x => x._ref) } }
  );

  return (
    <div className='w-full min-h-dvh relative flex justify-center'>
      <div className='absolute inset-0'>
        <FormaMedia formaMedia={module.backgroundMedia} className='object-cover object-bottom size-full' />
      </div>

      <div className='grid grid-rows-[1fr] relative pt-20 pb-4'>
        <div>
          <ContentContainer>
            <div className='h-full flex flex-col'>
              <div className='grow flex flex-col xs:items-center justify-center'>
                <div className='hidden lg:block'>
                  <HeroModuleHeadingPortableText value={module.heading} />
                </div>
                <div className='block lg:hidden'>
                  <HeroModuleHeadingPortableText value={module.mobileHeading} />
                </div>
                <div className='mt-4 block md:hidden'>
                  <HeroModuleSubHeadingPortableText value={module.subHeading} />
                </div>
                <div className='mt-10 grid gap-5 grid-rows-2 md:mt-10 md:grid-rows-1 md:grid-cols-2'>
                  <LinkButton href='/book' variant='primary' surface='bg' size='large'>
                    {module.CtaLabel}
                  </LinkButton>
                  <LinkButton href='/gallery' variant='primary' surface='primary' size='large'>
                    {module.SecondaryCtaLabel}
                  </LinkButton>
                </div>
                <div className='hidden md:block md:mt-5'>
                  <HeroModuleSubHeadingPortableText value={module.subHeading} />
                </div>
              </div>
              <div className='h-[178px] grow-0 shrink-0 hidden lg:block'>
                <div className='flex flex-col items-center'>
                  <p className='pt-8 text-text-muted text-md font-body'>{module.firmsText}</p>
                  <div className='mt-2 flex gap-4 h-16' style={{ filter: 'invert(1) brightness(0.4)' }}>
                    {firms.map(x => (
                      <img
                        fetchPriority='high'
                        className='h-full w-auto'
                        key={x._id}
                        src={getSanityImageUrl(x.logo)}
                        alt={x.logo.altText}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ContentContainer>
        </div>
        <div className='absolute bottom-4 w-full flex justify-center mt-4'>
          <Scrolldown label={module.scrollText} />
        </div>
      </div>
    </div>
  );
}
