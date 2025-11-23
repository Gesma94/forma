import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { createGroqBuilder, makeSafeQueryRunner } from 'groqd';
import type * as SanityTypes from './../types/generated/sanity-types-generated';

type SchemaConfig = {
  schemaTypes: SanityTypes.AllSanitySchemaTypes;
  referenceSymbol: typeof SanityTypes.internalGroqTypeReferenceTo;
};

console.log(process.env.ENV);
console.log(process.env.USE_PREVIEW);

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_PROJECT_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  ...(process.env.USE_PREVIEW === 'true') ? {
    perspective: 'drafts',
    token: process.env.SANITY_TOKEN
  } : {}
});

const sanityImageUrlBuilder = imageUrlBuilder(sanityClient);

export const q = createGroqBuilder<SchemaConfig>({});
export const runQuery = makeSafeQueryRunner((query, options) =>
  sanityClient.fetch(query, options.parameters, {
    next: {
      revalidate:  process.env.USE_PREVIEW === 'true' ? 1 : 3600
    }
  })
);

export function getSanityImageUrlBuilder(source: SanityImageSource): ImageUrlBuilder {
  return sanityImageUrlBuilder.image(source);
}

export function getSanityImageUrl(source: SanityImageSource): string {
  return getSanityImageUrlBuilder(source).url();
}
