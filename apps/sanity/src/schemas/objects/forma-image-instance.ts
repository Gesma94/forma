import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../common/constants';

export const formaImageInstanceObjectType = defineType({
  type: 'object',
  name: OBJECT_SCHEMA_TYPES.formaImageInstance,
  preview: {
    select: {
      image: 'formaImage',
      overrideAltText: 'overrideAltText'
    },
    prepare: ({ overrideAltText, image }) => ({
      title: overrideAltText ?? image.altText,
      media: image.ImageIcon
    })
  },
  fields: [
    defineField({
      name: 'formaImage',
      title: 'Forma Image',
      type: 'reference',
      to: [{ type: DOCUMENT_SCHEMA_TYPES.formaImageAsset }]
    }),
    defineField({
      type: 'string',
      title: 'Override AltText',
      name: 'overrideAltText'
    }),
    defineField({
      title: 'Brightness (%)',
      name: 'brightness',
      type: 'number',
      initialValue: 100,
      validation: rule => rule.min(0).max(100)
    })
  ]
});
