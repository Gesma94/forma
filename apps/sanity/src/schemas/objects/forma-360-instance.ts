import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../common/constants';

export const forma360InstanceObjectType = defineType({
  type: 'object',
  name: OBJECT_SCHEMA_TYPES.forma360Instance,
  preview: {
    select: {
      image: 'forma360',
      overrideAltText: 'overrideAltText'
    },
    prepare: ({ overrideAltText, image }) => ({
      title: overrideAltText ?? image.altText,
      media: image
    })
  },
  fields: [
    defineField({
      name: 'forma360',
      title: 'Forma 360',
      type: 'reference',
      to: [{ type: DOCUMENT_SCHEMA_TYPES.forma360Asset }]
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
