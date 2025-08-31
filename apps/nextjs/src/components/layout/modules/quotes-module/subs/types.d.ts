import { QuoteDocumentType } from 'types/generated/sanity-types-generated';

export type TQuoteWithAvatarUrl = QuoteDocumentType & {
  authorAvatarUrl: string;
};
