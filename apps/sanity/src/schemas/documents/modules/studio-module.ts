import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineImageField, defineRichEditorField } from '../../../fields';

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
  fieldsets: [
    {
      name: 'CTA',
      title: 'Call to Action'
    }
  ],
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
    defineImageField({
      name: 'image',
      title: 'Image',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'showCta',
      title: 'Show CTA',
      type: 'boolean',
      fieldset: 'CTA',
      initialValue: true,
      validation: rule => rule.required()
    }),
    defineField({
      name: 'CtaLabel',
      title: 'CTA Label',
      fieldset: 'CTA',
      type: 'string',
      validation: rule => rule.required()
    })
  ]
});
