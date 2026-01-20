import type { BrandDocumentType } from 'types/generated/sanity-types-generated';

export type TClientBrand = BrandDocumentType & {
  logoUrl: string;
};
