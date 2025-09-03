import { MODULE_VARIANTS } from '@forma/common';
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
  const reviewsWithImages = reviews.map<TReview>(review => ({
    ...review,
    brandImageUrl: getSanityImageUrl(review.brand.logo),
    reviewImageUrl: getSanityImageUrl(review.image),
    authorAvatarUrl: getSanityImageUrl(review.authorAvatar)
  }));

  return (
    <ModuleContentContainer title={module.heading} skipContentContainer={true}>
      <div>
        <div>
          <ContentContainer>
            <ParagraphPortableText value={module.content} variant={MODULE_VARIANTS.ON_BG} className='text-center' />
          </ContentContainer>
        </div>
        <div className='mt-10 relative'>
          <div className='relative z-20'>
            <ReviewsCarousel reviews={reviewsWithImages} />
          </div>
          <div className='absolute w-full h-[calc(82%_+_2.5rem)] md:h-[calc(82%_+_5rem)] bg-primary -bottom-10 md:-bottom-20 z-10'></div>
        </div>
      </div>
    </ModuleContentContainer>
  );
}
