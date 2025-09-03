import { BookKeyIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';

export const clientSecretPageDocumentType = defineType({
  type: 'document',
  icon: BookKeyIcon,
  name: DOCUMENT_SCHEMA_TYPES.clientSecretPage,
  preview: {
    select: {
      title: 'clientName',
      versions: 'versions'
    },
    prepare: ({ title, versions }) => ({ title, subtitle: `Contains ${versions.length} version(s)` })
  },
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'versions',
      title: 'Versions',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: DOCUMENT_SCHEMA_TYPES.clientSecretPageVersion }
        }
      ]
    })
  ]
});
