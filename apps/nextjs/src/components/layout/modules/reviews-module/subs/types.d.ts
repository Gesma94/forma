import { IFormImageInstance } from 'common/utils/get-forma-image';
import { ReviewDocumentType } from 'types/generated/sanity-types-generated';

export type TFullReview = ReviewDocumentType & {
  reviewImageUrl: string;
  authorAvatarUrl: string;
  brandImageUrl: string;
  brand: BrandDocumentType;
};

export type TReview = {
  id: string;
  image: ReviewDocumentType['image'];
  statement: TBasePortableTextValue;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  authorAvatar: ReviewDocumentType['authorAvatar'];
  brand: BrandDocumentType;
  reviewImageData: IFormImageInstance;
  authorAvatarUrl: string;
  brandImageUrl: string;
};
