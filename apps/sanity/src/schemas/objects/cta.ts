import { Link2Icon, Link2OffIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { OBJECT_SCHEMA_TYPES } from '../../common/constants';

export const ctaObjectType = defineType({
  type: 'object',
  name: OBJECT_SCHEMA_TYPES.cta,
  preview: {
    select: {
      caption: 'caption',
      url: 'url',
      isEnabled: 'showCta'
    },
    prepare: ({ caption, url, isEnabled }) => ({
      title: caption,
      subtitle: url,
      media: isEnabled ? Link2Icon : Link2OffIcon
    })
  },
  fields: [
    defineField({
      name: 'showCta',
      title: 'Show CTA',
      type: 'boolean',
      initialValue: true,
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      title: 'Caption',
      name: 'caption',
      validation: rule =>
        rule.custom((val, ctx) => {
          const { parent } = ctx as ValidationContext;
          if (parent.showCta && !val) {
            return 'Caption is required when CTA is enabled';
          }
          return true;
        })
    }),
    defineField({
      type: 'string',
      title: 'URL',
      name: 'url',
      validation: rule =>
        rule.custom((val, ctx) => {
          const { parent } = ctx as ValidationContext;
          if (parent.showCta && !val) {
            return 'URL is required when CTA is enabled';
          }
          return true;
        })
    })
  ]
});

type ValidationContext = {
  parent: {
    showCta: boolean;
  };
};
