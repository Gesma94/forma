import { LinkIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { OBJECT_SCHEMA_TYPES } from '../../common/constants';

export const linkObjectType = defineType({
  type: 'object',
  name: OBJECT_SCHEMA_TYPES.link,
  preview: {
    select: {
      url: 'url',
      caption: 'caption'
    },
    prepare: ({ url, caption }) => ({
      title: caption,
      subtitle: url,
      media: LinkIcon
    })
  },
  fields: [
    defineField({
      type: 'string',
      title: 'URL',
      name: 'url',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      title: 'Caption',
      name: 'caption',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'boolean',
      title: 'Open in new tab?',
      name: 'openInNewTab',
      initialValue: false
    })
  ]
});
