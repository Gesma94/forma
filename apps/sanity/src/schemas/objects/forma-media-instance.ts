import { defineField, defineType } from 'sanity';
import type { ScrollGalleryModuleDocumentType } from '../../../generated/types/sanity-types-generated';
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
    { name: 'videoProperties', title: 'Video Properties', options: { collapsible: true, collapsed: true } },
    { name: 'imageProperties', title: 'Image Properties', options: { collapsible: true, collapsed: true } },
    { name: '360Properties', title: '360 Properties', options: { collapsible: true, collapsed: true } }
  ],
  fields: [
    defineField({
      name: 'formaMedia',
      title: 'Forma Media',
      type: 'reference',
      options: {
        filter: ({ document }) => {
          if (document._type === DOCUMENT_SCHEMA_TYPES.scrollGalleryModule) {
            const scrollGalleryModuleDocument = document as ScrollGalleryModuleDocumentType;
            const selectedFormaMedia = scrollGalleryModuleDocument.scrollGalleryImages
              .map(x => x.formaMedia?.formaMedia?._ref)
              .filter(Boolean);

            return {
              filter: '!(_id in $selectedFormaMedia)',
              params: { selectedFormaMedia }
            };
          }
          return {};
        }
      },
      to: [
        { type: DOCUMENT_SCHEMA_TYPES.formaImageAsset },
        { type: DOCUMENT_SCHEMA_TYPES.formaVideoAsset },
        { type: DOCUMENT_SCHEMA_TYPES.forma360Asset }
      ]
    }),
    defineField({
      title: 'Show Media Title',
      name: 'showMediaTitle',
      type: 'boolean',
      initialValue: true,
      fieldset: 'commonProperties',
      validation: rule => rule.required()
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
    }),
    defineField({
      title: 'Is Zoom Enabled',
      name: 'isZoomEnabled',
      type: 'boolean',
      initialValue: true,
      fieldset: '360Properties'
    }),
    defineField({
      title: 'Initial Zoom',
      name: 'initialZoom',
      type: 'number',
      initialValue: 0,
      fieldset: '360Properties'
    }),
    defineField({
      title: 'Is Autoplay Enabled',
      name: 'is360AutoplayEnabled',
      type: 'boolean',
      initialValue: false,
      fieldset: '360Properties'
    }),
    defineField({
      title: 'Is 360 Hint be Shown',
      name: 'is360HintShown',
      type: 'boolean',
      initialValue: true,
      fieldset: '360Properties'
    })
  ]
});
