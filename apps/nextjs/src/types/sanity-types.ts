import type {
  BrandsModuleDocumentType,
  CountersModuleDocumentType,
  HalfHeroModuleDocumentType,
  HeroModuleDocumentType,
  ImageWithTextModuleDocumentType,
  QuoteModuleDocumentType,
  StudioModuleDocumentType
} from './generated/sanity-types-generated';

export type TAllSanityModuleSchemas =
  | StudioModuleDocumentType
  | HeroModuleDocumentType
  | CountersModuleDocumentType
  | BrandsModuleDocumentType
  | QuoteModuleDocumentType
  | ImageWithTextModuleDocumentType
  | HalfHeroModuleDocumentType;
