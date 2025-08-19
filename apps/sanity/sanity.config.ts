import { visionTool } from '@sanity/vision';
import { HomeIcon, WavesIcon } from 'lucide-react';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/schemas';
import { moduleDocumentSchemaTypes } from './src/schemas/documents/modules';
import {
  FOOTER_DOCUMENT_ID,
  FOOTER_SCHEMA_TYPE,
  HOME_PAGE_DOCUMENT_ID,
  PAGE_LAYOUT_SCHEMA_TYPE
} from './src/utils/sanity-types';

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
              .id(HOME_PAGE_DOCUMENT_ID)
              .schemaType(PAGE_LAYOUT_SCHEMA_TYPE)
              .title('Homepage')
              .child(
                S.editor()
                  .title('Homepage')
                  .id(HOME_PAGE_DOCUMENT_ID)
                  .schemaType(PAGE_LAYOUT_SCHEMA_TYPE)
                  .documentId(HOME_PAGE_DOCUMENT_ID)
              ),
            S.divider().title('Singletons'),
            S.listItem()
              .icon(WavesIcon)
              .id(FOOTER_DOCUMENT_ID)
              .schemaType(FOOTER_SCHEMA_TYPE)
              .title('Footer')
              .child(S.editor().id(FOOTER_DOCUMENT_ID).schemaType(FOOTER_SCHEMA_TYPE).documentId(FOOTER_DOCUMENT_ID)),
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
