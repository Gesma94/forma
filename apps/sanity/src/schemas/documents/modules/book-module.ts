import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineFormaImageField, defineRichEditorField } from '../../../fields';

export const bookModuleDocumentType = defineType({
  type: 'document',
  title: 'Book Module',
  name: DOCUMENT_SCHEMA_TYPES.bookModule,
  preview: {
    select: {
      title: 'heading',
      description: 'subHeading',
      media: 'backgroundImage.formaImage.image'
    },
    prepare: ({ title, media, description }) => ({
      title: textBlockToPlainText(title),
      media,
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
    defineFormaImageField({
      name: 'backgroundImage',
      title: 'Background Image',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'projectPhases',
      title: 'Project Phases',
      type: 'array',
      of: [{ type: 'string' }],
      validation: rule => rule.required()
    })
  ]
});
