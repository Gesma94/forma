import type {
  BrandsModuleDocumentType,
  CountersModuleDocumentType,
  HalfHeroModuleDocumentType,
  HeroModuleDocumentType,
  QuotesModuleDocumentType,
  ReviewsModuleDocumentType,
  StudioModuleDocumentType,
  TextWithImageModuleDocumentType
} from './generated/sanity-types-generated';

export type TAllSanityModuleSchemas =
  | StudioModuleDocumentType
  | HeroModuleDocumentType
  | CountersModuleDocumentType
  | BrandsModuleDocumentType
  | QuotesModuleDocumentType
  | TextWithImageModuleDocumentType
  | ReviewsModuleDocumentType
  | HalfHeroModuleDocumentType;
