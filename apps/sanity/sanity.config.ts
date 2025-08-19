import { visionTool } from '@sanity/vision';
import { HomeIcon, WavesIcon } from 'lucide-react';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { DOCUMENT_SCHEMA_TYPES, SINGLETON_DOCUMENT_IDS } from './src/common/constants';
import { schemaTypes } from './src/schemas';
import { moduleDocumentSchemaTypes } from './src/schemas/documents/modules';

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
              .id(SINGLETON_DOCUMENT_IDS.homepage)
              .schemaType(DOCUMENT_SCHEMA_TYPES.pageLayout)
              .title('Homepage')
              .child(
                S.editor()
                  .title('Homepage')
                  .id(SINGLETON_DOCUMENT_IDS.homepage)
                  .schemaType(DOCUMENT_SCHEMA_TYPES.pageLayout)
                  .documentId(SINGLETON_DOCUMENT_IDS.homepage)
              ),
            S.divider().title('Singletons'),
            S.listItem()
              .icon(WavesIcon)
              .id(SINGLETON_DOCUMENT_IDS.footer)
              .schemaType(DOCUMENT_SCHEMA_TYPES.footer)
              .title('Footer')
              .child(
                S.editor()
                  .id(SINGLETON_DOCUMENT_IDS.footer)
                  .schemaType(DOCUMENT_SCHEMA_TYPES.footer)
                  .documentId(SINGLETON_DOCUMENT_IDS.footer)
              ),
            S.divider().title('Modules'),
            ...moduleDocumentSchemaTypes.map(x =>
              S.listItem()
                .title(x.title ?? `Module ${x.name}`)
                .child(S.documentList().schemaType(x.name).filter(`_type == "${x.name}"`).id(x.name))
            )
          ])
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes
  }
});
