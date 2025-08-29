import { MessageSquareQuoteIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineRichEditorField } from '../../../fields';

export const quotesModuleDocumentType = defineType({
  type: 'document',
  title: 'Quotes Module',
  name: DOCUMENT_SCHEMA_TYPES.quotesModule,
  icon: MessageSquareQuoteIcon,
  preview: {
    select: {
      title: 'heading',
      quotes: 'quotes'
    },
    prepare: ({ title, quotes }) => ({
      title: textBlockToPlainText(title),
      subtitle: `Selected ${quotes.length} quote(s)`
    })
  },
  fields: [
    defineRichEditorField({
      name: 'heading',
      title: 'Heading',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineField({
      name: 'quotes',
      title: 'Quotes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: DOCUMENT_SCHEMA_TYPES.quote }
        }
      ],
      validation: rule => rule.required()
    })
  ]
});
