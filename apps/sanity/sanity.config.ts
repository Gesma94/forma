import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { FOOTER_DOCUMENT_ID, FOOTER_SCHEMA_TYPE } from './src/utils/sanity-types';
import { schemaTypes } from './src/schemes';
import { WavesIcon } from 'lucide-react';

export default defineConfig({
  name: 'default',
  title: 'forma',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
  dataset: process.env.SANITY_STUDIO_PROJECT_DATASET ?? '',

  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Singletons')
          .items([
            S.listItem()
              .icon(WavesIcon)
              .id(FOOTER_DOCUMENT_ID)
              .schemaType(FOOTER_SCHEMA_TYPE)
              .title('Footer')
              .child(S.editor().id(FOOTER_DOCUMENT_ID).schemaType(FOOTER_SCHEMA_TYPE).documentId(FOOTER_DOCUMENT_ID))
          ])
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes
  }
});
