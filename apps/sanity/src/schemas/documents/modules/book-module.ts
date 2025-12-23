import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { getFormaMediaMedia, getFormaMediaSelectProps, textBlockToPlainText } from '../../../common/utils';
import { defineRichEditorField } from '../../../fields';
import { defineFormaMediaField } from '../../../fields/media';

export const bookModuleDocumentType = defineType({
  type: 'document',
  title: 'Book Module',
  name: DOCUMENT_SCHEMA_TYPES.bookModule,
  preview: {
    select: {
      title: 'heading',
      description: 'subHeading',
      ...getFormaMediaSelectProps('backgroundMedia')
    },
    prepare: ({ title, description, ...formaMediaProps }) => ({
      title: textBlockToPlainText(title),
      media: getFormaMediaMedia(formaMediaProps),
      subtitle: textBlockToPlainText(description, 30)
    })
  },
  fields: [
    defineRichEditorField({
      name: 'heading',
      title: 'Heading',
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'subHeading',
      title: 'Subheading',
      note: 'This text will be red by default',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineFormaMediaField({
      name: 'backgroundMedia',
      title: 'Background Media',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'projectPhases',
      title: 'Project Phases',
      type: 'array',
      of: [{ type: 'string' }],
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
