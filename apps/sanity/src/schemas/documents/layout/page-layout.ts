import { defineArrayMember, defineField, defineType } from 'sanity';
import { getPageTitleFromId } from '../../../utils/editor';
import { PAGE_LAYOUT_SCHEMA_TYPE } from '../../../utils/sanity-types';
import { moduleDocumentSchemaTypes } from '../modules';

export const pageLayoutDocumentType = defineType({
  type: 'document',
  name: PAGE_LAYOUT_SCHEMA_TYPE,
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
