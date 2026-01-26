import type { BrandsModuleDocumentType } from 'types/generated/sanity-types-generated';
import { BackgroundVariantContainer } from '@/ui/containers/background-variant-container/background-variant-container';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { VerticalPaddingContainer } from '@/ui/containers/vertical-padding-container/vertical-padding-container';
import { ContentContainer } from '@/ui/content-container/content-container';
import { ParagraphPortableText } from '@/ui/portable-text/paragraph-portable-text';
import { getSanityImageUrl, q, runQuery } from '@/utils/groqd-client';
import { BrandCarousel } from './subs/brand-carousel';
import type { TClientBrand } from './subs/types';

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
  const clientBrands: TClientBrand[] = brands.map(b => ({
    ...b,
    logoUrl: getSanityImageUrl(b.logo, { quality: 50, width: 300 })
  }));

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
            <BrandCarousel brands={clientBrands} variant={module.variant} />
          </div>
        </ModuleContentContainer>
      </VerticalPaddingContainer>
    </BackgroundVariantContainer>
  );
}
