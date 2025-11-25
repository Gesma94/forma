import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineRichEditorField } from '../../../fields';

export const contactUsDocumentType = defineType({
  type: 'document',
  title: 'Contact Us Module',
  name: DOCUMENT_SCHEMA_TYPES.contactUsModule,
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subHeading',
      media: 'backgroundImage'
    },
    prepare: ({ title, subtitle, media }) => ({ title: textBlockToPlainText(title), media, subtitle: textBlockToPlainText(subtitle) })
  },
  fields: [
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: OBJECT_SCHEMA_TYPES.formaImageInstance,
      validation: rule => rule.required()
    }),
    defineField({
      name: 'cardBackgroundImage',
      title: 'Card Background Image',
      type: OBJECT_SCHEMA_TYPES.formaImageInstance,
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'heading',
      title: 'Heading',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'subHeading',
      title: 'Sub Heading',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineField({
      name: 'CtaLabel',
      title: 'CTA Label',
      type: 'string',
      validation: rule => rule.required()
    })
  ]
});
