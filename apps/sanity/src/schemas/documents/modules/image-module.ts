import { IMAGE_SIZE } from '@forma/common';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineImageField } from '../../../fields';

export const imageModuleDocumentType = defineType({
  type: 'document',
  title: 'Image Module',
  name: DOCUMENT_SCHEMA_TYPES.imageModule,
  preview: {
    select: {
      media: 'backgroundImage'
    },
    prepare: ({ media }) => ({ title: media.altText, media, subtitle: 'Image Module' })
  },
  fields: [
    defineImageField({
      name: 'backgroundImage',
      title: 'Background Image',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      title: 'Size',
      name: 'size',
      validation: rule => rule.required(),
      initialValue: IMAGE_SIZE.MD,
      options: {
        layout: 'radio',
        list: [
          { title: 'Small', value: IMAGE_SIZE.XS },
          { title: 'Medium', value: IMAGE_SIZE.MD },
          { title: 'Large', value: IMAGE_SIZE.LG },
          { title: 'Extra Large', value: IMAGE_SIZE.XL },
          { title: 'Viewport Height', value: IMAGE_SIZE.VH }
        ]
      }
    })
  ]
});
