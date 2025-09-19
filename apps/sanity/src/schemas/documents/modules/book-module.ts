import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineImageField, defineRichEditorField } from '../../../fields';

export const bookModuleDocumentType = defineType({
  type: 'document',
  title: 'Book Module',
  name: DOCUMENT_SCHEMA_TYPES.bookModule,
  preview: {
    select: {
      title: 'heading',
      description: 'subHeading',
      media: 'backgroundImage'
    },
    prepare: ({ title, media, description }) => ({ title: textBlockToPlainText(title), media, subtitle: textBlockToPlainText(description, 30) })
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
    defineImageField({
      name: 'backgroundImage',
      title: 'Background Image',
      validation: rule => rule.required()
    }),
    // defineField({
    //   name: 'nameInputLabel',
    //   title: 'Name Input Label',
    //   type: 'string',
    //   validation: rule => rule.required()
    // }),
    // defineField({
    //   name: 'phoneNumberInputLabel',
    //   title: 'Phone Number Input Label',
    //   type: 'string',
    //   validation: rule => rule.required()
    // }),
    // defineField({
    //   name: 'emailInputLabel',
    //   title: 'Email Input Label',
    //   type: 'string',
    //   validation: rule => rule.required()
    // }),
    // defineField({
    //   name: 'appointmentDateInputLabel',
    //   title: 'Appointment Date Input Label',
    //   type: 'string',
    //   validation: rule => rule.required()
    // }),
    // defineField({
    //   name: 'appointmentSlotInputLabel',
    //   title: 'Appointment Slot Input Label',
    //   type: 'string',
    //   validation: rule => rule.required()
    // }),
    // defineField({
    //   name: 'studioNameInputLabel',
    //   title: 'Studio Name Input Label',
    //   type: 'string',
    //   validation: rule => rule.required()
    // }),
    // defineField({
    //   name: 'projectAboutInputLabel',
    //   title: 'Project About Input Label',
    //   type: 'string',
    //   validation: rule => rule.required()
    // }),
    // defineField({
    //   name: 'deadlineDateInputLabel',
    //   title: 'Deadline Date Input Label',
    //   type: 'string',
    //   validation: rule => rule.required()
    // }),
    // defineField({
    //   name: 'projectPhaseInputLabel',
    //   title: 'Project Phase Input Label',
    //   type: 'string',
    //   validation: rule => rule.required()
    // }),
  ]
});
