import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineFormaImageField, defineRichEditorField } from '../../../fields';

export const contactUsDocumentType = defineType({
  type: 'document',
  title: 'Contact Us Module',
  name: DOCUMENT_SCHEMA_TYPES.contactUsModule,
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subHeading',
      media: 'backgroundImage.formaImage.image'
    },
    prepare: ({ title, subtitle, media }) => ({
      media,
      title: textBlockToPlainText(title),
      subtitle: textBlockToPlainText(subtitle)
    })
  },
  fields: [
    defineFormaImageField({
      name: 'backgroundImage',
      title: 'Background Image',
      validation: rule => rule.required()
    }),
    defineFormaImageField({
      name: 'cardBackgroundImage',
      title: 'Card Background Image',
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
