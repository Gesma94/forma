import { TShadeColor } from '@forma/common';
import { IFormImageInstance } from 'common/utils/get-forma-image';
import { TFormaMediaUnwrapped } from 'common/utils/get-forma-media';
import { ReviewDocumentType } from 'types/generated/sanity-types-generated';

export type TFullReview = ReviewDocumentType & {
  reviewImageUrl: string;
  authorAvatarUrl: string;
  brandImageUrl: string;
  brand: BrandDocumentType;
};

export type TReview = {
  id: string;
  statement: TBasePortableTextValue;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  authorAvatar: ReviewDocumentType['authorAvatar'];
  brand: BrandDocumentType;
  formaMediaData: TFormaMediaUnwrapped;
  authorAvatarUrl: string;
  brandImageUrl: string;
  brandShade: TShadeColor;
};
