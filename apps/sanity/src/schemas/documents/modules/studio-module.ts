import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineRichEditorField } from '../../../fields';

export const studioModuleDocumentType = defineType({
  type: 'document',
  title: 'Studio Module',
  name: DOCUMENT_SCHEMA_TYPES.studioModule,
  preview: {
    select: {
      title: 'subHeading',
      media: 'image'
    },
    prepare: ({ title, media }) => ({ title: textBlockToPlainText(title), media, subtitle: 'Studio Module' })
  },
  fields: [
    defineRichEditorField({
      name: 'subHeading',
      title: 'Subheading',
      note: 'This text will be red by default',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'content',
      title: 'Content',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'showCta',
      title: 'Show CTA',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'CtaLabel',
      title: 'CTA Label',
      type: 'string',
      validation: rule => rule.required()
    })
  ]
});
