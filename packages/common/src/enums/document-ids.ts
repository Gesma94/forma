import type { ValueOf } from 'type-fest';

export const SINGLETON_DOCUMENT_IDS = {
  footer: 'footerDocumentId',
  homepage: 'homePageDocumentId'
} as const;

export type TDocumentId = ValueOf<typeof SINGLETON_DOCUMENT_IDS>;
