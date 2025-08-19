import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { getPageTitleFromId } from '../../../common/utils';
import { moduleDocumentSchemaTypes } from '../modules';

export const pageLayoutDocumentType = defineType({
  type: 'document',
  name: DOCUMENT_SCHEMA_TYPES.pageLayout,
  preview: {
    select: {
      id: '_id'
    },
    prepare: ({ id }) => ({ title: getPageTitleFromId(id) })
  },
  fields: [
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: moduleDocumentSchemaTypes.map(x => ({ type: x.name }))
        }
      ],
      validation: rule => rule.required()
    })
  ]
});
