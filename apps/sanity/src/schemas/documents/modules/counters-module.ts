import { ArrowUp10Icon } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineRichEditorField } from '../../../fields';
import { defineSpacingField } from '../../../fields/spacing';

export const countersModuleDocumentType = defineType({
  type: 'document',
  title: 'Counters Module',
  icon: ArrowUp10Icon,
  name: DOCUMENT_SCHEMA_TYPES.countersModule,
  preview: {
    select: {
      title: 'heading'
    },
    prepare: ({ title }) => ({ title: textBlockToPlainText(title) })
  },
  fields: [
    defineSpacingField(),
    defineRichEditorField({
      name: 'heading',
      title: 'Heading',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineField({
      type: 'array',
      name: 'counters',
      title: 'Counters',
      of: [defineArrayMember({ type: OBJECT_SCHEMA_TYPES.counter })]
    })
  ]
});
