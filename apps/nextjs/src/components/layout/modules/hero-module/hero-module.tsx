import Image from 'next/image';
import type { HeroModuleDocumentType } from 'types/generated/sanity-types-generated';
import { LinkButton } from '@/ui/buttons/link-button/link-button';
import { ContentContainer } from '@/ui/content-container/content-container';
import { getSanityImageUrl } from '@/utils/groqd-client';
import { HeroModuleSubHeadingPortableText } from './subs/hero-module-subheading-portable-text';
import { HeroModuleHeadingPortableText } from './subs/hero-module-heading-portable-text';

type TProps = {
  module: HeroModuleDocumentType;
};

export function HeroModule({ module }: TProps) {
  const imageUrl = getSanityImageUrl(module.backgroundImage);

  return (
    <div className='w-full h-dvh min-h-min-hero relative'>
      <Image
        alt='test'
        fill={true}
        src={imageUrl}
        priority={true}
        className='object-cover object-bottom bg-linear-30 brightness-[0.32]'
      />

      <div className='h-full grid grid-rows-[1fr] relative'>
        <div>
          <ContentContainer>
            <div className='h-full flex flex-col'>
              <div className='grow flex flex-col items-center justify-center'>
                <div className='mt-10'>
                  <HeroModuleHeadingPortableText value={module.heading} />
                </div>
                <div className='mt-10 grid grid-cols-2 gap-5'>
                  <LinkButton href='/book' variant='primary' surface='bg' size='large'>
                    {module.CtaLabel}
                  </LinkButton>
                  <LinkButton href='/gallery' variant='primary' surface='primary' size='large'>
                    {module.SecondaryCtaLabel}
                  </LinkButton>
                </div>
                <div className='mt-5'>
                  <HeroModuleSubHeadingPortableText value={module.subHeading} />
                </div>
              </div>
              <div className='h-[220px] grow-0 shrink-0'>
                <div className='flex flex-col items-center'>
                  <p className='pt-8 text-text-muted text-md font-body'>{module.firmsText}</p>
                  <div className='mt-2 flex gap-4 h-16' style={{ filter: 'invert(1) brightness(0.4)' }}>
                    {module.firmImages.map(x => (
                      <img className='h-full w-auto' key={x._key} src={getSanityImageUrl(x)} alt={x._key} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ContentContainer>
        </div>
        <div className='absolute bottom-4 w-full flex justify-center'>{/* <ScrollDown /> */}</div>
      </div>
    </div>
  );
}
