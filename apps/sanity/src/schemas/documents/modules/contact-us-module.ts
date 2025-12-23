import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { getFormaMediaMedia, getFormaMediaSelectProps, textBlockToPlainText } from '../../../common/utils';
import { defineRichEditorField } from '../../../fields';
import { defineFormaMediaField } from '../../../fields/media';

export const contactUsDocumentType = defineType({
  type: 'document',
  title: 'Contact Us Module',
  name: DOCUMENT_SCHEMA_TYPES.contactUsModule,
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
  fields: [
    defineFormaMediaField({
      name: 'backgroundMedia',
      title: 'Background Media',
      validation: rule => rule.required()
    }),
    defineFormaMediaField({
      name: 'cardBackgroundMedia',
      title: 'Card Background Media',
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
    }),
    defineField({
      name: 'scrollText',
      title: 'Scroll Text',
      type: 'string',
      validation: rule => rule.required()
    })
  ]
});
