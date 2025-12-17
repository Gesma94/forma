import { MessageSquareQuoteIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineRichEditorField } from '../../../fields';

export const reviewsModuleDocumentType = defineType({
  type: 'document',
  title: 'Reviews Module',
  name: DOCUMENT_SCHEMA_TYPES.reviewsModule,
  icon: MessageSquareQuoteIcon,
  preview: {
    select: {
      title: 'heading',
      reviews: 'reviews',
      friendlyName: 'friendlyName'
    },
    prepare: ({ title, reviews, friendlyName }) => ({
      title: title ? textBlockToPlainText(title) : (friendlyName ?? 'Unnamed Reviews Module'),
      subtitle: `Selected ${reviews.length} review(s)`
    })
  },
  fields: [
    defineField({
      name: 'friendlyName',
      title: 'Friendly Name',
      type: 'string',
      description: 'used only to identify the module when heading is not defined'
    }),
    defineRichEditorField({
      name: 'heading',
      title: 'Heading',
      allowColorMarkDecorator: false,
    }),
    defineRichEditorField({
      name: 'content',
      title: 'Content',
      allowColorMarkDecorator: false,
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: DOCUMENT_SCHEMA_TYPES.review }
        }
      ],
      validation: rule => rule.required()
    })
  ]
});
