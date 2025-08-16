import { createClient } from '@sanity/client';
import { createGroqBuilder, makeSafeQueryRunner } from 'groqd';

import type * as SanityTypes from './../types/generated/sanity-types';

type SchemaConfig = {
  schemaTypes: SanityTypes.AllSanitySchemaTypes;
  referenceSymbol: typeof SanityTypes.internalGroqTypeReferenceTo;
};

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_PROJECT_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false
});

export const q = createGroqBuilder<SchemaConfig>({});
export const runQuery = makeSafeQueryRunner(query => sanityClient.fetch(query));
