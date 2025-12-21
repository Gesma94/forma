import { BoxesIcon } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineRichEditorField } from '../../../fields';
import { defineSpacingField } from '../../../fields/spacing';

export const servicesModuleDocumentType = defineType({
  type: 'document',
  title: 'Services Module',
  name: DOCUMENT_SCHEMA_TYPES.servicesModule,
  icon: BoxesIcon,
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
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [defineArrayMember({ type: OBJECT_SCHEMA_TYPES.service })],
      validation: rule => rule.required().min(3).max(3)
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: OBJECT_SCHEMA_TYPES.cta,
      validation: rule => rule.required()
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: OBJECT_SCHEMA_TYPES.cta,
      validation: rule => rule.required()
    })
  ]
});
