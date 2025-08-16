import { defineField, defineType } from 'sanity';
import { LINK_OBJECT_SCHEMA_TYPE } from '../../utils/sanity-types';
import { LinkIcon } from 'lucide-react';

export const linkObjectType = defineType({
  type: 'object',
  name: LINK_OBJECT_SCHEMA_TYPE,
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
