import { FormIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../common/constants';

export const pageMetadataObjectType = defineType({
  type: 'object',
  icon: FormIcon,
  name: OBJECT_SCHEMA_TYPES.pageMetadata,
  fields: [
    defineField({
      type: 'string',
      title: 'Page Title',
      name: 'pageTitle',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'text',
      title: 'Page Description',
      name: 'pageDescription',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'object',
      title: 'Open Graph',
      name: 'openGraph',
      validation: rule => rule.required(),
      fields: [
        defineField({
          type: 'string',
          title: 'Open Graph Title',
          name: 'openGraphTitle',
          validation: rule => rule.required()
        }),
        defineField({
          type: 'text',
          title: 'Open Graph Description',
          name: 'openGraphDescription',
          validation: rule => rule.required()
        }),
        defineField({
          name: 'openGraphImage',
          title: 'Open Graph Image',
          type: 'reference',
          to: [{ type: DOCUMENT_SCHEMA_TYPES.formaImageAsset }]
        })
      ]
    })
  ]
});
