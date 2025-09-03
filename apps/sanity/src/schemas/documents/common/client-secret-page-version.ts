import { GitCommitVerticalIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { defineImageField } from '../../../fields';

export const clientSecretPageVersionDocumentType = defineType({
  type: 'document',
  icon: GitCommitVerticalIcon,
  name: DOCUMENT_SCHEMA_TYPES.clientSecretPageVersion,
  preview: {
    select: {
      version: 'version',
      images: 'images'
    },
    prepare: ({ version, images }) => ({ title: `v${version}`, subtitle: `Contains ${images.length} image(s)` })
  },
  fields: [
    defineField({
      name: 'version',
      title: 'Version',
      type: 'number',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'password',
      title: 'Password',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineImageField({
          name: 'images',
          title: 'Images',
          validation: rule => rule.required()
        })
      ]
    })
  ]
});
