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
      reviews: 'reviews'
    },
    prepare: ({ title, reviews }) => ({
      title: textBlockToPlainText(title),
      subtitle: `Selected ${reviews.length} review(s)`
    })
  },
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
