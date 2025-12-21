import { RectangleEllipsisIcon } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineRichEditorField } from '../../../fields';
import { defineSpacingField } from '../../../fields/spacing';

export const howItWorksModuleDocumentType = defineType({
  type: 'document',
  title: 'How It Works Module',
  name: DOCUMENT_SCHEMA_TYPES.howItWorksModule,
  icon: RectangleEllipsisIcon,
  preview: {
    select: {
      title: 'heading',
      subHeading: 'subHeading'
    },
    prepare: ({ title, subHeading }) => ({
      title: textBlockToPlainText(title),
      subtitle: textBlockToPlainText(subHeading, 30)
    })
  },
  fields: [
    defineSpacingField(),
    defineRichEditorField({
      name: 'heading',
      title: 'Heading',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'subHeading',
      title: 'Subheading',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineField({
      type: 'array',
      name: 'steps',
      title: 'Steps',
      of: [defineArrayMember({ type: OBJECT_SCHEMA_TYPES.howItWorksStep })]
    })
  ]
});
