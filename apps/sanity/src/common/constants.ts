export const DOCUMENT_SCHEMA_TYPES = {
  footer: 'footerDocumentType',
  heroModule: 'heroModuleDocumentType',
  halfHeroModule: 'halfHeroModuleDocumentType',
  studioModule: 'studioModuleDocumentType',
  bookModule: 'bookModuleDocumentType',
  countersModule: 'countersModuleDocumentType',
  brandsModule: 'brandsModuleDocumentType',
  quotesModule: 'quotesModuleDocumentType',
  textWithImageModule: 'textWithImageModuleDocumentType',
  pageLayout: 'pageLayoutDocumentType',
  brand: 'brandDocumentType',
  quote: 'quoteDocumentType'
} as const;

export const OBJECT_SCHEMA_TYPES = {
  link: 'linkObjectType',
  cta: 'ctaObjectType',
  contact: 'contactObjectType',
  counter: 'counterObjectType'
} as const;
