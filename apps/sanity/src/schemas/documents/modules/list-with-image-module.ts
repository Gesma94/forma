import { ELEMENT_X_POSITION } from '@forma/common';
import { ListXIcon } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, FORMA_MEDIA_SELECT_PROPS, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { getFormaMediaMedia, getModuleTitleWithFriendlyName, getVariantTitle } from '../../../common/utils';
import { defineModuleVariantField, defineRichEditorField } from '../../../fields';
import { defineFormaMediaField } from '../../../fields/media';
import { defineSpacingField } from '../../../fields/spacing';

export const listWithImageModuleDocumentType = defineType({
  type: 'document',
  title: 'List with Image Module',
  name: DOCUMENT_SCHEMA_TYPES.listWithImageModule,
  icon: ListXIcon,
  preview: {
    select: {
      items: 'items',
      title: 'heading',
      variant: 'variant',
      friendlyName: 'friendlyName',
      ...FORMA_MEDIA_SELECT_PROPS
    },
    prepare: ({ title, friendlyName, variant, items, ...formaMediaProps }) => ({
      media: getFormaMediaMedia(formaMediaProps),
      title: getModuleTitleWithFriendlyName(title, friendlyName),
      subtitle: `List with Image Module - ${getVariantTitle(variant)}`
    })
  },
  fields: [
    defineModuleVariantField(),
    defineSpacingField(),
    defineField({
      type: 'string',
      name: 'imagePosition',
      title: 'Image Position',
      validation: rule => rule.required(),
      initialValue: ELEMENT_X_POSITION.RIGHT,
      options: {
        layout: 'radio',
        list: [
          { title: 'Left', value: ELEMENT_X_POSITION.LEFT },
          { title: 'Right', value: ELEMENT_X_POSITION.RIGHT }
        ]
      }
    }),
    defineField({
      name: 'friendlyName',
      title: 'Friendly Name',
      type: 'string',
      description: 'used only to identify the module when heading is not defined'
    }),
    defineRichEditorField({
      name: 'heading',
      title: 'Heading',
      allowColorMarkDecorator: false
    }),
    defineFormaMediaField({
      validation: rule => rule.required()
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [defineArrayMember({ type: OBJECT_SCHEMA_TYPES.listTextItem })],
      validation: rule => rule.required().min(1)
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
