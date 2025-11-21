import { MODULE_VARIANTS } from '@forma/common';
import { getImageAltText } from 'common/utils/get-image-alt-text';
import type { StudioModuleDocumentType } from 'types/generated/sanity-types-generated';
import { Button } from '@/ui/buttons/button/button';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { ParagraphPortableText } from '@/ui/portable-text/paragraph-portable-text';
import { getSanityImageUrl } from '@/utils/groqd-client';
import { ListTextItem } from './subs/list-text-item';
import { StudioModuleSubHeading } from './subs/studio-module-subheading';

type TProps = {
  module: StudioModuleDocumentType;
};

export function StudioModule({ module }: TProps) {
  const imageUrl = getSanityImageUrl(module.image);
  const problemsImageUrl = getSanityImageUrl(module.problemsImage);

  return (
    <ModuleContentContainer variant={MODULE_VARIANTS.ON_BG}>
      <div className='grid grid-rows-2 gap-20'>
        <div className='grid gap-20 grid-rows-[auto_auto] xl:grid-rows-1  grid-cols-1 xl:grid-cols-[1fr_2fr]'>
          <div className='flex flex-col min-w-0'>
            <h2 className='text-7xl md:text-8xl text-primary flex flex-col'>
              <span className='text-5xl md:text-6xl'>This is</span>
              <span className='flex flex-col font-bold'>
                Forma
              </span>
            </h2>
            <div className='mt-2'>
              <StudioModuleSubHeading value={module.subHeading} />
            </div>
            <div className='mt-8'>
              <ParagraphPortableText value={module.content} variant={MODULE_VARIANTS.ON_BG} />
            </div>
            {module.showCta && (
              <div className='mt-8 grid xs:block md:mx-auto xl:mx-[unset] xs:mr-auto'>
                <Button size='large' variant='primary' surface='bg'>
                  {module.CtaLabel}
                </Button>
              </div>
            )}
          </div>
          <div className='relative contain-size'>
            <img
              className='max-h-96 size-full xl:max-h-dvh object-cover rounded-2xl'
              alt={module.image.altText}
              src={imageUrl}
            />
          </div>
        </div>
        <div className='grid gap-20 grid-rows-[auto_auto] xl:grid-rows-1 grid-cols-1 xl:grid-cols-[2fr_1fr]'>
          <div className='contain-size'>
            <img
              className='max-h-96 size-full xl:max-h-dvh object-cover rounded-2xl'
              alt={getImageAltText(module.problemsImage)}
              src={problemsImageUrl}
            />
          </div>
          <div className='flex flex-col gap-10'>
            <div>
              <StudioModuleSubHeading value={module.forClientSubHeading} />
            </div>
            <div className='flex gap-8 my-auto flex-col'>
              {module.problems.map(item => (
                <ListTextItem key={item._key} caption={item.caption} heading={item.heading} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModuleContentContainer>
  );
}
