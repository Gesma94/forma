import { FormIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { OBJECT_SCHEMA_TYPES } from '../../common/constants';

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
      type: 'string',
      title: 'Keywords',
      description: 'Comma separated keywords for SEO (e.g. "Forma, Architecture, Design")',
      name: 'keywords'
    }),
    defineField({
      type: OBJECT_SCHEMA_TYPES.openGraph,
      title: 'Open Graph',
      name: 'openGraph',
      validation: rule => rule.required()
    })
  ]
});
