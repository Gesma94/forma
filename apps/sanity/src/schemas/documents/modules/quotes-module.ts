import { MessageSquareQuoteIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineRichEditorField } from '../../../fields';
import { defineSpacingField } from '../../../fields/spacing';

export const quotesModuleDocumentType = defineType({
  type: 'document',
  title: 'Quotes Module',
  name: DOCUMENT_SCHEMA_TYPES.quotesModule,
  icon: MessageSquareQuoteIcon,
  preview: {
    select: {
      title: 'heading',
      quotes: 'quotes',
      friendlyName: 'friendlyName'
    },
    prepare: ({ title, quotes, friendlyName }) => ({
      title: title ? textBlockToPlainText(title) : (friendlyName ?? 'Unnamed Quotes Module'),
      subtitle: `Selected ${quotes.length} quote(s)`
    })
  },
  fields: [
    defineSpacingField(),
    defineField({
      name: 'friendlyName',
      title: 'Friendly Name',
      type: 'string',
      description: 'used only to identify the module when heading is not defined'
    }),
    defineRichEditorField({
      name: 'heading',
      title: 'Heading',
      allowColorMarkDecorator: false
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
