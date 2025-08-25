import { defineArrayMember, defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineRichEditorField } from '../../../fields';

export const heroModuleDocumentType = defineType({
  type: 'document',
  title: 'Hero Module',
  name: DOCUMENT_SCHEMA_TYPES.heroModule,
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage'
    },
    prepare: ({ title, media }) => ({ title: textBlockToPlainText(title), media, subtitle: 'Hero Module' })
  },
    fieldsets: [
    {
      name: 'heading',
      title: 'Heading',
      options: {
        collapsible: false
      }
    },
    ],
  fields: [
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
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
      type: 'array',
      name: 'firmImages',
      title: 'Firm Images',
      of: [defineArrayMember({ type: 'image' })]
    }),
    defineField({
      name: 'scrollText',
      title: 'Scroll Text',
      type: 'string',
      validation: rule => rule.required()
    })
  ]
});
