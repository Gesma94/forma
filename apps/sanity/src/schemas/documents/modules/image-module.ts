import { BACKGROUND_COLOR, IMAGE_SIZE } from '@forma/common';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { defineImageField } from '../../../fields';

export const imageModuleDocumentType = defineType({
  type: 'document',
  title: 'Image Module',
  name: DOCUMENT_SCHEMA_TYPES.imageModule,
  preview: {
    select: {
      title: 'title',
      media: 'backgroundImage'
    },
    prepare: ({ title, media }) => ({ title, media, subtitle: 'Image Module' })
  },
  fields: [
    defineImageField({
      skipAltText: true,
      name: 'backgroundImage',
      title: 'Background Image',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      title: 'Title',
      name: 'title',
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
    }),
    defineField({
      type: 'string',
      title: 'Upper Background',
      name: 'upperBackground',
      validation: rule => rule.required(),
      initialValue: BACKGROUND_COLOR.BG,
      options: {
        layout: 'radio',
        list: [
          { title: 'Background', value: BACKGROUND_COLOR.BG },
          { title: 'Primary', value: BACKGROUND_COLOR.PRIMARY }
        ]
      }
    }),
    defineField({
      type: 'string',
      title: 'Lower Background',
      name: 'lowerBackground',
      validation: rule => rule.required(),
      initialValue: BACKGROUND_COLOR.BG,
      options: {
        layout: 'radio',
        list: [
          { title: 'Background', value: BACKGROUND_COLOR.BG },
          { title: 'Primary', value: BACKGROUND_COLOR.PRIMARY }
        ]
      }
    })
  ]
});
