import { GalleryHorizontalIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { defineModuleVariantField } from '../../../fields';
import { defineSpacingField } from '../../../fields/spacing';

export const inlineGalleryModuleDocumentType = defineType({
  type: 'document',
  title: 'Inline Gallery Module',
  name: DOCUMENT_SCHEMA_TYPES.inlineGalleryModule,
  icon: GalleryHorizontalIcon,
  preview: {
    select: {
      title: 'heading',
      medias: 'medias',
      friendlyName: 'friendlyName'
    },
    prepare: ({ title, medias, friendlyName }) => ({
      title: title ?? friendlyName ?? 'Unnamed Inline Gallery Module',
      subtitle: `Selected ${medias.length} media(s)`
    })
  },
  fields: [
    defineModuleVariantField(),
    defineSpacingField(),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string'
    }),
    defineField({
      name: 'friendlyName',
      title: 'Friendly Name',
      type: 'string',
      description: 'used only to identify the module when heading is not defined'
    }),
    defineField({
      name: 'medias',
      title: 'Medias',
      type: 'array',
      of: [
        { type: 'reference', name: 'formaImageReference', to: [{ type: DOCUMENT_SCHEMA_TYPES.formaImageAsset }] },
        { type: 'reference', name: 'formaVideoReference', to: [{ type: DOCUMENT_SCHEMA_TYPES.formaVideoAsset }] }
      ],
      validation: rule => rule.required()
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: OBJECT_SCHEMA_TYPES.cta,
      validation: rule => rule.required()
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: OBJECT_SCHEMA_TYPES.cta,
      validation: rule => rule.required()
    })
  ]
});
