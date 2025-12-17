import { MessageSquareQuoteIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineFormaImageField, defineImageField, defineRichEditorField } from '../../../fields';

export const reviewDocumentType = defineType({
  type: 'document',
  title: 'Review',
  icon: MessageSquareQuoteIcon,
  name: DOCUMENT_SCHEMA_TYPES.review,
  preview: {
    select: {
      title: 'statement',
      authorName: 'authorName',
      authorRole: 'authorRole',
      authorCompany: 'authorCompany',
      media: 'image.formaImage.image'
    },
    prepare: ({ title, authorName, media, authorRole, authorCompany }) => ({
      media,
      title: textBlockToPlainText(title, 30),
      subtitle: `${authorName}, ${authorRole}, ${authorCompany}`
    })
  },
  fields: [
    defineFormaImageField({
      name: 'image',
      title: 'Image',
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'statement',
      title: 'Statement',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      title: 'Author Name',
      name: 'authorName',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      title: 'Author Role',
      name: 'authorRole',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      title: 'Author Company',
      name: 'authorCompany',
      validation: rule => rule.required()
    }),
    defineImageField({
      name: 'authorAvatar',
      title: 'Author Avatar',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      validation: rule => rule.required(),
      to: [{ type: DOCUMENT_SCHEMA_TYPES.brand }]
    })
  ]
});
