import { RouteIcon } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';

export const processModuleDocumentType = defineType({
  type: 'document',
  title: 'Process Module',
  name: DOCUMENT_SCHEMA_TYPES.processModule,
  icon: RouteIcon,
  preview: {
    select: {
      title: 'friendlyName'
    }
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
      type: 'array',
      name: 'steps',
      title: 'Steps',
      of: [defineArrayMember({ type: OBJECT_SCHEMA_TYPES.processStep })]
    })
  ]
});
