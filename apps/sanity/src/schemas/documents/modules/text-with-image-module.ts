import { ELEMENT_X_POSITION } from '@forma/common';
import { ListXIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { getFormaMediaMedia, getFormaMediaSelectProps, textBlockToPlainText } from '../../../common/utils';
import { defineModuleVariantField, defineRichEditorField } from '../../../fields';
import { defineFormaMediaField } from '../../../fields/media';
import { defineSpacingField } from '../../../fields/spacing';

export const textWithImageModuleDocumentType = defineType({
  type: 'document',
  title: 'Text with Image Module',
  name: DOCUMENT_SCHEMA_TYPES.textWithImageModule,
  icon: ListXIcon,
  preview: {
    select: {
      title: 'heading',
      content: 'content',
      variant: 'variant',
      ...getFormaMediaSelectProps('media')
    },
    prepare: ({ title, content, variant, ...formaMediaProps }) => ({
      media: getFormaMediaMedia(formaMediaProps),
      title: textBlockToPlainText(content, 30)
    })
  },
  fields: [
    defineModuleVariantField(),
    defineSpacingField(),
    defineRichEditorField({
      name: 'content',
      title: 'Content',
      allowColorMarkDecorator: true,
      allowBulletPoint: true,
      allowH1: true,
      allowH2: true,
      validation: rule => rule.required()
    }),
    defineFormaMediaField({
      name: 'media',
      title: 'Media',
      validation: rule => rule.required()
    }),
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
