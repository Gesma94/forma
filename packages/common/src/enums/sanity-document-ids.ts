import type { ValueOf } from 'type-fest';

export const SANITY_DOCUMENT_IDS = {
  footer: 'footerDocumentId',
  topbar: 'topbarDocumentId',
  maintananceScreen: 'maintananceScreenDocumentId',
  homepage: 'homePageDocumentId',
  bookpage: 'bookPageDocumentId',
  processpage: 'processPageDocumentId',
  gallerypage: 'galleryPageDocumentId',
  contactUsPage: 'contactUsPageDocumentId',
  architecturalStillsPage: 'architecturalStillsPageDocumentId',
  videoAnimationsPage: 'videoAnimationsPageDocumentId',
  virtualToursPage: 'virtualToursPageDocumentId',
  cookiePolicyPage: 'cookiePolicyPageDocumentId',
  privacyPolicyPage: 'privacyPolicyPageDocumentId',
} as const;

export type TSanityDocumentId = ValueOf<typeof SANITY_DOCUMENT_IDS>;
