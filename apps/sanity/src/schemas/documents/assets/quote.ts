import { MessageSquareQuoteIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineImageField, defineRichEditorField } from '../../../fields';

export const quoteDocumentType = defineType({
  type: 'document',
  title: 'Quote',
  icon: MessageSquareQuoteIcon,
  name: DOCUMENT_SCHEMA_TYPES.quote,
  preview: {
    select: {
      title: 'statement',
      authorName: 'authorName',
      authorRole: 'authorRole',
      authorCompany: 'authorCompany'
    },
    prepare: ({ title, authorName, authorRole, authorCompany }) => ({
      title: textBlockToPlainText(title, 30),
      subtitle: `${authorName}, ${authorRole}, ${authorCompany}`
    })
  },
  fields: [
    defineField({
      type: 'string',
      title: 'Title',
      name: 'title',
      initialValue: 'prova',
      hidden: true
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
    })
  ]
});
