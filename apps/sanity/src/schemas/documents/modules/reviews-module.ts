import { MessageSquareQuoteIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { getModuleTitleWithFriendlyName } from '../../../common/utils';
import { defineRichEditorField } from '../../../fields';
import { defineFriendlyNameField } from '../../../fields/friendly-name';
import { defineImagePositionField } from '../../../fields/image-position';

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
      title: getModuleTitleWithFriendlyName(title, friendlyName),
      subtitle: `Selected ${reviews.length} review(s)`
    })
  },
  fields: [
    defineFriendlyNameField(),
    defineRichEditorField({
      name: 'heading',
      title: 'Heading',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineImagePositionField(),
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
