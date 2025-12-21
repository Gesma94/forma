import { ELEMENT_X_POSITION } from '@forma/common';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { defineModuleVariantField } from '../../../fields';
import { defineSpacingField } from '../../../fields/spacing';

export const parallaxImagesModuleDocumentType = defineType({
  type: 'document',
  title: 'Parallax Images Module',
  name: DOCUMENT_SCHEMA_TYPES.parallaxImagesModule,
  preview: {
    select: {
      title: 'friendlyName'
    },
    prepare: ({ title }) => ({ title })
  },
  fields: [
    defineSpacingField(),
    defineModuleVariantField(),
    defineField({
      type: 'string',
      name: 'bigImagePosition',
      description: 'Defines where the big image is positioned',
      title: 'Big Image Position',
      validation: rule => rule.required(),
      initialValue: ELEMENT_X_POSITION.LEFT,
      options: {
        layout: 'radio',
        list: [
          { title: 'Left', value: ELEMENT_X_POSITION.LEFT },
          { title: 'Right', value: ELEMENT_X_POSITION.RIGHT }
        ]
      }
    }),
    defineField({
      type: 'string',
      name: 'friendlyName',
      title: 'Friendly Name',
      description: 'Used only to identify the module in the CMS',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'imagePair',
      title: 'Image Pair',
      type: OBJECT_SCHEMA_TYPES.imagePair,
      validation: rule => rule.required()
    })
  ]
});
