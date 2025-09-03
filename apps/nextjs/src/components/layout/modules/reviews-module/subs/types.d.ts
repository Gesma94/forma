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
  reviewImageUrl: string;
  authorAvatarUrl: string;
  brandImageUrl: string;
};
