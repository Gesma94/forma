import imageUrlBuilder from '@sanity/image-url';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { createGroqBuilder, makeSafeQueryRunner } from 'groqd';
import { createClient } from 'next-sanity';
import type * as SanityTypes from './../types/generated/sanity-types-generated';

type SchemaConfig = {
  schemaTypes: SanityTypes.AllSanitySchemaTypes;
  referenceSymbol: typeof SanityTypes.internalGroqTypeReferenceTo;
};

export type TSanityImageUrlBuilderOptions = {
  width?: number;
  quality?: number;
};

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_PROJECT_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  ...(process.env.DEV_ENV === 'staging'
    ? {
        perspective: 'drafts',
        token: process.env.SANITY_TOKEN
      }
    : {})
});

const sanityImageUrlBuilder = imageUrlBuilder(sanityClient);

export const q = createGroqBuilder<SchemaConfig>({});
export const runQuery = makeSafeQueryRunner((query, options) =>
  sanityClient.fetch(query, options.parameters, {
    cache: 'force-cache',
    next: { tags: ['sanity'], revalidate: 259200 }
  })
);

export function getSanityImageUrlBuilder(
  source: SanityImageSource,
  options?: TSanityImageUrlBuilderOptions
): ImageUrlBuilder {
  return sanityImageUrlBuilder.image(source).auto('format').width(options?.width).quality(options?.quality);
}

export function getSanityImageUrl(source: SanityImageSource, options?: TSanityImageUrlBuilderOptions): string {
  return getSanityImageUrlBuilder(source, options).url();
}
