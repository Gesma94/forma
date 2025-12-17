import { MODULE_VARIANTS } from '@forma/common';
import { getFormaImageData } from 'common/utils/get-forma-image';
import { isNotNil } from 'es-toolkit';
import { tv } from 'tailwind-variants';
import type { ReviewsModuleDocumentType } from 'types/generated/sanity-types-generated';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { ContentContainer } from '@/ui/content-container/content-container';
import { ParagraphPortableText } from '@/ui/portable-text/paragraph-portable-text';
import { getSanityImageUrl, q, runQuery } from '@/utils/groqd-client';
import { ReviewsCarousel } from './subs/reviews-carousel';
import type { TReview } from './subs/types';

type TProps = {
  module: ReviewsModuleDocumentType;
};

type TSanityQueryParams = {
  reviewIds: string[];
};

export async function ReviewsModule({ module }: TProps) {
  const { containerTv } = stylesTv({ hasTitle: isNotNil(module.heading) });
  const reviews = await runQuery(
    q
      .parameters<TSanityQueryParams>()
      .star.filterByType('reviewDocumentType')
      .filterRaw('_id in $reviewIds')
      .project(sub => ({
        id: sub.field('_id'),
        image: sub.field('image'),
        statement: sub.field('statement[]'),
        authorName: sub.field('authorName'),
        authorRole: sub.field('authorRole'),
        authorCompany: sub.field('authorCompany'),
        authorAvatar: sub.field('authorAvatar'),
        brand: sub.field('brand').deref()
      })),
    { parameters: { reviewIds: module.reviews.map(x => x._ref) } }
  );

  const reviewsWithImages = await Promise.all(
    reviews.map<Promise<TReview>>(async review => ({
      ...review,
      brandImageUrl: getSanityImageUrl(review.brand.logo),
      reviewImageData: await getFormaImageData(review.image),
      authorAvatarUrl: getSanityImageUrl(review.authorAvatar)
    }))
  );

  return (
    <div className={containerTv()}>
      <ModuleContentContainer title={module.heading} skipContentContainer={true} skipYPadding={true}>
        <div>
          <div>
            <ContentContainer>
              <ParagraphPortableText value={module.content} variant={MODULE_VARIANTS.ON_BG} className='text-center' />
            </ContentContainer>
          </div>
          <div className='relative'>
            <ReviewsCarousel reviews={reviewsWithImages} />
          </div>
        </div>
      </ModuleContentContainer>
    </div>
  );
}

const stylesTv = tv({
  slots: {
    containerTv: ''
  },
  variants: {
    hasTitle: {
      true: {
        containerTv: 'pt-10 md:pt-20'
      }
    }
  }
});
