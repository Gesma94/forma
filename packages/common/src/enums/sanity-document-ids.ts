import type { ValueOf } from 'type-fest';

export const SANITY_DOCUMENT_IDS = {
  footer: 'footerDocumentId',
  maintananceScreen: 'maintananceScreenDocumentId',
  homepage: 'homePageDocumentId',
  bookpage: 'bookPageDocumentId',
  processpage: 'processPageDocumentId',
  gallerypage: 'galleryPageDocumentId',
  contactUsPage: 'contactUsPageDocumentId'
} as const;

export type TSanityDocumentId = ValueOf<typeof SANITY_DOCUMENT_IDS>;
