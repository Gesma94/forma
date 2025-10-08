import { SANITY_DOCUMENT_IDS } from '@forma/common';
import { visionTool } from '@sanity/vision';
import {
  BookKeyIcon,
  HomeIcon,
  type LucideProps,
  NotebookPenIcon,
  RouteIcon,
  SparklesIcon,
  WavesIcon
} from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { DOCUMENT_SCHEMA_TYPES } from './src/common/constants';
import { schemaTypes } from './src/schemas';
import { assetDocumentTypes } from './src/schemas/documents/assets';
import { moduleDocumentSchemaTypes } from './src/schemas/documents/modules';

type TPageItem = {
  id: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  title: string;
};
const pageItems: TPageItem[] = [
  {
    id: SANITY_DOCUMENT_IDS.homepage,
    icon: HomeIcon,
    title: 'Homepage'
  },
  {
    id: SANITY_DOCUMENT_IDS.bookpage,
    icon: NotebookPenIcon,
    title: 'Book'
  },
  {
    id: SANITY_DOCUMENT_IDS.processpage,
    icon: RouteIcon,
    title: 'Process'
  }
];

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
            ...pageItems.map(pageItem =>
              S.listItem()
                .icon(pageItem.icon)
                .id(pageItem.id)
                .schemaType(DOCUMENT_SCHEMA_TYPES.pageLayout)
                .title(pageItem.title)
                .child(
                  S.editor()
                    .title(pageItem.title)
                    .id(pageItem.id)
                    .schemaType(DOCUMENT_SCHEMA_TYPES.pageLayout)
                    .documentId(pageItem.id)
                )
            ),
            S.listItem()
              .title('Client Secret Pages')
              .icon(BookKeyIcon)
              .child(S.documentTypeList(DOCUMENT_SCHEMA_TYPES.clientSecretPage).title('Client Secret Pages')),
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
            )
          ])
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes
  }
});
