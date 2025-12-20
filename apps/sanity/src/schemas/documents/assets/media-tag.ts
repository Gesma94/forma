import { TagIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';

export const mediaTagDocumentType = defineType({
  type: 'document',
  title: 'Media Tag',
  icon: TagIcon,
  name: DOCUMENT_SCHEMA_TYPES.mediaTagAsset,
  preview: {
    select: {
      displayName: 'displayName',
      shortDisplayName: 'shortDisplayName'
    },
    prepare: ({ displayName, shortDisplayName }) => ({
      title: `${displayName} (${shortDisplayName})`
    })
  },

  fields: [
    defineField({
      title: 'Display Name',
      name: 'displayName',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      title: 'Short Display Name',
      name: 'shortDisplayName',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      title: 'Hide',
      name: 'isHidden',
      type: 'boolean',
      initialValue: false,
      description: 'When true, this tag will not be visible on the website',
      validation: rule => rule.required()
    })
  ]
});
