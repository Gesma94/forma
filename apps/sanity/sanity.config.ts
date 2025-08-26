import { SANITY_DOCUMENT_IDS } from '@forma/common';
import { visionTool } from '@sanity/vision';
import { HomeIcon, SparklesIcon, WavesIcon } from 'lucide-react';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { DOCUMENT_SCHEMA_TYPES } from './src/common/constants';
import { schemaTypes } from './src/schemas';
import { moduleDocumentSchemaTypes } from './src/schemas/documents/modules';
import { assetDocumentTypes } from './src/schemas/documents/assets';

export default defineConfig({
  name: 'default',
  title: 'forma',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
  dataset: process.env.SANITY_STUDIO_PROJECT_DATASET ?? '',

  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Content')
          .items([
            S.divider().title('Pages'),
            S.listItem()
              .icon(HomeIcon)
              .id(SANITY_DOCUMENT_IDS.homepage)
              .schemaType(DOCUMENT_SCHEMA_TYPES.pageLayout)
              .title('Homepage')
              .child(
                S.editor()
                  .title('Homepage')
                  .id(SANITY_DOCUMENT_IDS.homepage)
                  .schemaType(DOCUMENT_SCHEMA_TYPES.pageLayout)
                  .documentId(SANITY_DOCUMENT_IDS.homepage)
              ),
            S.divider().title('Singletons'),
            S.listItem()
              .icon(WavesIcon)
              .id(SANITY_DOCUMENT_IDS.footer)
              .schemaType(DOCUMENT_SCHEMA_TYPES.footer)
              .title('Footer')
              .child(
                S.editor()
                  .id(SANITY_DOCUMENT_IDS.footer)
                  .schemaType(DOCUMENT_SCHEMA_TYPES.footer)
                  .documentId(SANITY_DOCUMENT_IDS.footer)
              ),
            S.divider().title('Modules'),
            ...moduleDocumentSchemaTypes.map(x =>
              S.listItem()
                .title(x.title ?? `Module ${x.name}`)
                .child(S.documentList().schemaType(x.name).filter(`_type == "${x.name}"`).id(x.name))
            ),
            S.divider().title('Assets'),
            ...assetDocumentTypes.map(x =>
              S.listItem()
                .icon(SparklesIcon)
                .title(x.title ?? x.name)
                .child(S.documentList().schemaType(x.name).filter(`_type == "${x.name}"`).id(x.name))
            ),
          ])
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes
  }
});
