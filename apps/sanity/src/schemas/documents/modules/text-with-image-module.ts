import { IMAGE_X_POSITION } from '@forma/common';
import { ListXIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { getVariantTitle, textBlockToPlainText } from '../../../common/utils';
import { defineImageField, defineModuleVariantField, defineRichEditorField } from '../../../fields';

export const textWithImageModuleDocumentType = defineType({
  type: 'document',
  title: 'Text with Image Module',
  name: DOCUMENT_SCHEMA_TYPES.textWithImageModule,
  icon: ListXIcon,
  preview: {
    select: {
      title: 'heading',
      media: 'image',
      variant: 'variant'
    },
    prepare: ({ title, media, variant }) => ({
      title: textBlockToPlainText(title),
      media,
      subtitle: `Text with Image Module- ${getVariantTitle(variant)}`
    })
  },
  fields: [
    defineModuleVariantField({}),
    defineRichEditorField({
      name: 'heading',
      title: 'Heading',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'content',
      title: 'Content',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineImageField({
      name: 'image',
      title: 'Image',
      validation: rule => rule.required(),
      fields: [
        {
          type: 'string',
          title: 'Type',
          name: 'imagePosition',
          validation: rule => rule.required(),
          initialValue: IMAGE_X_POSITION.RIGHT,
          options: {
            layout: 'radio',
            list: [
              { title: 'Left', value: IMAGE_X_POSITION.LEFT },
              { title: 'Right', value: IMAGE_X_POSITION.RIGHT }
            ]
          }
        }
      ]
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
