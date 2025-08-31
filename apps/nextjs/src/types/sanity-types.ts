import type {
  BrandsModuleDocumentType,
  CountersModuleDocumentType,
  HalfHeroModuleDocumentType,
  HeroModuleDocumentType,
  QuotesModuleDocumentType,
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
  | HalfHeroModuleDocumentType;
