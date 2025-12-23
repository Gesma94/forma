import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { getFormaMediaMedia, getFormaMediaSelectProps, textBlockToPlainText } from '../../../common/utils';
import { defineRichEditorField } from '../../../fields';
import { defineFormaMediaField } from '../../../fields/media';

export const heroModuleDocumentType = defineType({
  type: 'document',
  title: 'Hero Module',
  name: DOCUMENT_SCHEMA_TYPES.heroModule,
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subHeading',
      ...getFormaMediaSelectProps('backgroundMedia')
    },
    prepare: ({ title, subtitle, ...formaMediaProps }) => ({
      title: textBlockToPlainText(title),
      subtitle: textBlockToPlainText(subtitle),
      media: getFormaMediaMedia(formaMediaProps)
    })
  },
  fieldsets: [
    {
      name: 'heading',
      title: 'Heading',
      options: {
        collapsible: false
      }
    }
  ],
  fields: [
    defineFormaMediaField({
      name: 'backgroundMedia',
      title: 'Background Media',
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'heading',
      title: 'Heading',
      fieldset: 'heading',
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'mobileHeading',
      title: 'Mobile Heading',
      fieldset: 'heading',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'CtaLabel',
      title: 'CTA Label',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'SecondaryCtaLabel',
      title: 'Secondary CTA Label',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'subHeading',
      title: 'Sub Heading',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineField({
      name: 'firmsText',
      title: 'Firms text',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'firmImages',
      title: 'Firm Images',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: DOCUMENT_SCHEMA_TYPES.brand }
        }
      ],
      validation: rule => rule.required()
    }),
    defineField({
      name: 'scrollText',
      title: 'Scroll Text',
      type: 'string',
      validation: rule => rule.required()
    })
  ]
});
