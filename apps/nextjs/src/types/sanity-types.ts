import type {
  BrandsModuleDocumentType,
  CountersModuleDocumentType,
  HalfHeroModuleDocumentType,
  HeroModuleDocumentType,
  QuoteModuleDocumentType,
  StudioModuleDocumentType,
  TextWithImageModuleDocumentType
} from './generated/sanity-types-generated';

export type TAllSanityModuleSchemas =
  | StudioModuleDocumentType
  | HeroModuleDocumentType
  | CountersModuleDocumentType
  | BrandsModuleDocumentType
  | QuoteModuleDocumentType
  | TextWithImageModuleDocumentType
  | HalfHeroModuleDocumentType;
