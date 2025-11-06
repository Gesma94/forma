import { defineArrayMember, defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';

export const parallaxImagesModuleDocumentType = defineType({
  type: 'document',
  title: 'Parallax Images Module',
  name: DOCUMENT_SCHEMA_TYPES.parallaxImagesModule,
  preview: {
    select: {
      title: 'friendlyName',
      pairs: 'imagePairs'
    },
    prepare: ({ title, pairs }) => ({ title, subtitle: `${pairs.length} pair(s)` })
  },
  fields: [
    defineField({
      type: 'string',
      name: 'friendlyName',
      title: 'Friendly Name',
      description: 'Used only to identify the module in the CMS',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'imagePairs',
      title: 'Image Pairs',
      type: 'array',
      of: [defineArrayMember({ type: OBJECT_SCHEMA_TYPES.imagePair })],
      validation: rule => rule.required().min(2)
    })
  ]
});
