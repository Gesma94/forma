export const DOCUMENT_SCHEMA_TYPES = {
  footer: 'footerDocumentType',
  howItWorksModule: 'howItWorksModuleDocumentType',
  heroModule: 'heroModuleDocumentType',
  halfHeroModule: 'halfHeroModuleDocumentType',
  studioModule: 'studioModuleDocumentType',
  bookModule: 'bookModuleDocumentType',
  countersModule: 'countersModuleDocumentType',
  brandsModule: 'brandsModuleDocumentType',
  quotesModule: 'quotesModuleDocumentType',
  reviewsModule: 'reviewsModuleDocumentType',
  textWithImageModule: 'textWithImageModuleDocumentType',
  servicesModule: 'servicesModuleDocumentType',
  cardsModule: 'cardsModuleDocumentType',
  pageLayout: 'pageLayoutDocumentType',
  imageModule: 'imageModuleDocumentType',
  brand: 'brandDocumentType',
  quote: 'quoteDocumentType',
  review: 'reviewDocumentType',
  clientSecretPage: 'clientSecretPageDocumentType',
  clientSecretPageVersion: 'clientSecretPageVersionDocumentType'
} as const;

export const OBJECT_SCHEMA_TYPES = {
  link: 'linkObjectType',
  cta: 'ctaObjectType',
  contact: 'contactObjectType',
  card: 'cardObjectType',
  counter: 'counterObjectType',
  howItWorksStep: 'howItWorksStepObjectType'
} as const;
