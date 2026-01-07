import { defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { defineFormaImageField, defineRichEditorField } from '../../../fields';

export const maintananceScreenDocumentType = defineType({
  type: 'document',
  name: DOCUMENT_SCHEMA_TYPES.maintananceScreen,
  preview: {
    prepare: () => ({ title: 'Maintanance Screen Settings' })
  },
  title: 'Maintanance Screen',
  fields: [
    defineRichEditorField({
      name: 'heading',
      title: 'Heading',
      allowColorMarkDecorator: true,
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'subHeading',
      title: 'Sub Heading',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineFormaImageField({
      name: 'backgroundImage',
      title: 'Background Image',
      validation: rule => rule.required()
    })
  ]
});
