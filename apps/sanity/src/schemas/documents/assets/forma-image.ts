import { ImageIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';

export const formaImageDocumentType = defineType({
  type: 'document',
  title: 'Forma Image',
  icon: ImageIcon,
  name: DOCUMENT_SCHEMA_TYPES.formaImageAsset,
  preview: {
    select: {
      title: 'altText',
      media: 'image'
    },
    prepare: ({ title, media }) => ({ title: title ?? media.asset._ref ?? 'Unnamed Image', media })
  },
  fields: [
    defineField({
      title: 'Alternative Text',
      name: 'altText',
      type: 'string'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: rule => rule.required()
    })
  ]
});
