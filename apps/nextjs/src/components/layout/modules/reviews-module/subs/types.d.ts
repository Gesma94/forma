import { TShadeColor } from '@forma/common';
import { TFormaMediaUnwrapped } from 'types/forma-media';
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
