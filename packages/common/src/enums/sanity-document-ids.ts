import type { ValueOf } from 'type-fest';

export const SANITY_DOCUMENT_IDS = {
  footer: 'footerDocumentId',
  homepage: 'homePageDocumentId',
  bookpage: 'bookPageDocumentId'
} as const;

export type TSanityDocumentId = ValueOf<typeof SANITY_DOCUMENT_IDS>;
