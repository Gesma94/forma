import { SparkleIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { defineImageField } from '../../../fields';

export const brandDocumentType = defineType({
  type: 'document',
  title: 'Brand',
  icon: SparkleIcon,
  name: DOCUMENT_SCHEMA_TYPES.brand,
  preview: {
    select: {
      title: 'name',
      media: 'logo'
    },
    prepare: ({ title, media }) => ({ title, media })
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'shortName',
      title: 'Short Name',
      type: 'string'
    }),
    defineImageField({
      name: 'logo',
      title: 'Logo',
      validation: rule => rule.required()
    })
  ]
});
