import { LayoutListIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineFormaImageField, defineRichEditorField } from '../../../fields';

export const reasonsModuleDocumentType = defineType({
  type: 'document',
  title: 'Reasons Module',
  name: DOCUMENT_SCHEMA_TYPES.reasonsModule,
  icon: LayoutListIcon,
  preview: {
    select: {
      title: 'heading',
      subtitle: 'content',
      media: 'leftImage.formaImage.image'
    },
    prepare: ({ title, media, subtitle }) => ({
      media,
      title: textBlockToPlainText(title),
      subtitle: textBlockToPlainText(subtitle, 30)
    })
  },
  fieldsets: [
    {
      name: 'leftGroup',
      title: 'Left Group'
    },
    {
      name: 'rightGroup',
      title: 'Right Group'
    }
  ],
  fields: [
    defineRichEditorField({
      name: 'heading',
      title: 'Heading',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'content',
      title: 'Content',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineFormaImageField({
      name: 'leftImage',
      title: 'Left Image',
      fieldset: 'leftGroup',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'firstSubHeading',
      title: 'First sub heading',
      type: 'string',
      fieldset: 'leftGroup',
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'firstSubContent',
      title: 'First sub content',
      fieldset: 'leftGroup',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'secondSubHeading',
      title: 'Second sub heading',
      type: 'string',
      fieldset: 'leftGroup',
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'secondSubContent',
      title: 'Second sub content',
      fieldset: 'leftGroup',
      validation: rule => rule.required()
    }),
    defineFormaImageField({
      name: 'rightImage',
      title: 'Right Image',
      fieldset: 'rightGroup',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'thirdSubHeading',
      title: 'Third sub heading',
      type: 'string',
      fieldset: 'rightGroup',
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'thirdSubContent',
      title: 'Third sub content',
      fieldset: 'rightGroup',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'fourthSubHeading',
      title: 'Fourth sub heading',
      type: 'string',
      fieldset: 'rightGroup',
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'fourthSubContent',
      title: 'Fourth sub content',
      fieldset: 'rightGroup',
      validation: rule => rule.required()
    })
  ]
});
