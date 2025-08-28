import { BRANDS_MODULE_VARIANTS } from '@forma/common';
import { MOTION_ANIMATION } from 'common/enums/motion-animation';
import type { BrandsModuleDocumentType } from 'types/generated/sanity-types-generated';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { ContentContainer } from '@/ui/content-container/content-container';
import { MotionUl } from '@/ui/motion/motion-ul';
import { ParagraphPortableText, type TParagraphPortableTextProps } from '@/ui/portable-text/paragraph-portable-text';
import { q, runQuery } from '@/utils/groqd-client';
import { BrandListItem } from './subs/brand-list-item';

type TProps = {
  module: BrandsModuleDocumentType;
};

type TSanityQueryParams = {
  brandIds: string[];
};

export async function BrandsModule({ module }: TProps) {
  const brands = await runQuery(
    q.parameters<TSanityQueryParams>().star.filterByType('brandDocumentType').filterRaw('_id in $brandIds'),
    { parameters: { brandIds: module.brands.map(x => x._ref) } }
  );

  const paragraphSurface: TParagraphPortableTextProps['surface'] =
    module.variant === BRANDS_MODULE_VARIANTS.ON_PRIMARY ? 'primary' : 'bg';

  return (
    <ModuleContentContainer surface='primary' title={module.heading} skipContentContainer={true}>
      <ContentContainer>
        <div className='max-w-5xl mx-auto'>
          <ParagraphPortableText value={module.content} surface={paragraphSurface} className='text-center' />
        </div>
      </ContentContainer>
      <div className='mt-4 w-full overflow-hidden'>
        <MotionUl animation={MOTION_ANIMATION.SCROLL_X_INFINITY} className='flex gap-4 w-fit'>
          {brands.map(x => (
            <BrandListItem key={`${x._id}-1`} brand={x} variant={module.variant} />
          ))}
          {brands.map(x => (
            <BrandListItem key={`${x._id}-2`} brand={x} variant={module.variant} />
          ))}
        </MotionUl>
      </div>
    </ModuleContentContainer>
  );
}
