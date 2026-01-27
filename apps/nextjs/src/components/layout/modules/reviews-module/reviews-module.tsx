import { getFormaMediaData } from 'common/utils/get-forma-media';
import type { ReviewsModuleDocumentType } from 'types/generated/sanity-types-generated';
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
        media: sub.field('media'),
        statement: sub.field('statement[]'),
        authorName: sub.field('authorName'),
        authorRole: sub.field('authorRole'),
        authorCompany: sub.field('authorCompany'),
        authorAvatar: sub.field('authorAvatar'),
        brandShade: sub.field('brandShade'),
        brand: sub.field('brand').deref()
      })),
    { parameters: { reviewIds: module.reviews.map(x => x._ref) } }
  );
  const reviewsWithImages = await Promise.all(
    reviews.map<Promise<TReview>>(async review => ({
      ...review,
      brandImageUrl: getSanityImageUrl(review.brand.logo),
      formaMediaData: await getFormaMediaData(review.media),
      authorAvatarUrl: getSanityImageUrl(review.authorAvatar)
    }))
  );

  return (
    <div>
      <ReviewsCarousel reviews={reviewsWithImages} moduleTitle={module.heading} imagePosition={module.imagePosition} />
    </div>
  );
}
