import { MessageSquareQuoteIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineImageField, defineRichEditorField } from '../../../fields';

export const quoteModuleDocumentType = defineType({
  type: 'document',
  title: 'Quote Module',
  name: DOCUMENT_SCHEMA_TYPES.quoteModule,
  icon: MessageSquareQuoteIcon,
  preview: {
    select: {
      title: 'heading',
      authorName: 'authorName'
    },
    prepare: ({ title, authorName }) => ({
      title: textBlockToPlainText(title),
      subtitle: `Quote Module - ${authorName}`
    })
  },
  fieldsets: [{ name: 'Author', title: 'Author', options: { collapsible: false } }],
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
      type: 'string',
      title: 'Author Name',
      name: 'authorName',
      fieldset: 'Author',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      title: 'Author Role',
      name: 'authorRole',
      fieldset: 'Author',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      title: 'Author Company',
      name: 'authorCompany',
      fieldset: 'Author',
      validation: rule => rule.required()
    }),
    defineImageField({
      name: 'authorAvatar',
      title: 'Author Avatar',
      fieldset: 'Author',
      validation: rule => rule.required()
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
