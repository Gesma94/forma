import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../common/constants';

export const formaMediaInstanceObjectType = defineType({
  type: 'object',
  name: OBJECT_SCHEMA_TYPES.formaMediaInstance,
  preview: {
    select: {
      media: 'formaMedia',
      overrideAltText: 'overrideAltText'
    },
    prepare: ({ overrideAltText, media }) => ({
      title: overrideAltText ?? media.altText,
      media: media
    })
  },
  fieldsets: [
    { name: 'commonProperties', title: 'Common Properties' },
    { name: 'videoProperties', title: 'Video Properties', options: { collapsible: true, collapsed: true } }
  ],
  fields: [
    defineField({
      name: 'formaMedia',
      title: 'Forma Media',
      type: 'reference',
      to: [{ type: DOCUMENT_SCHEMA_TYPES.formaImageAsset }, { type: DOCUMENT_SCHEMA_TYPES.formaVideoAsset }]
    }),
    defineField({
      type: 'string',
      title: 'Override AltText',
      name: 'overrideAltText',
      fieldset: 'commonProperties'
    }),
    defineField({
      title: 'Brightness (%)',
      name: 'brightness',
      type: 'number',
      initialValue: 100,
      validation: rule => rule.min(0).max(100),
      fieldset: 'commonProperties'
    }),
    defineField({
      title: 'Autoplay Enabled',
      name: 'isAutoplayEnabled',
      type: 'boolean',
      initialValue: true,
      fieldset: 'videoProperties'
    }),
    defineField({
      title: 'Loop Enabled',
      name: 'isLoopEnabled',
      type: 'boolean',
      initialValue: true,
      fieldset: 'videoProperties'
    }),
    defineField({
      title: 'Muted',
      name: 'isMuted',
      type: 'boolean',
      initialValue: true,
      fieldset: 'videoProperties'
    }),
    defineField({
      title: 'Controls Enabled',
      name: 'areControlsEnabled',
      type: 'boolean',
      initialValue: false,
      fieldset: 'videoProperties'
    })
  ]
});
