import { MOTION_ANIMATION } from 'common/enums/motion-animation';
import type { BrandsModuleDocumentType } from 'types/generated/sanity-types-generated';
import { BackgroundVariantContainer } from '@/ui/containers/background-variant-container/background-variant-container';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { VerticalPaddingContainer } from '@/ui/containers/vertical-padding-container/vertical-padding-container';
import { ContentContainer } from '@/ui/content-container/content-container';
import { MotionUl } from '@/ui/motion/motion-ul';
import { ParagraphPortableText } from '@/ui/portable-text/paragraph-portable-text';
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

  return (
    <BackgroundVariantContainer variant={module.variant}>
      <VerticalPaddingContainer {...module.paddings}>
        <ModuleContentContainer variant={module.variant} title={module.heading} skipContentContainer={true}>
          <ContentContainer>
            <div className='max-w-5xl mx-auto'>
              <ParagraphPortableText value={module.content} variant={module.variant} className='text-center' />
            </div>
          </ContentContainer>
          <div className='mt-16 w-full overflow-hidden'>
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
      </VerticalPaddingContainer>
    </BackgroundVariantContainer>
  );
}
