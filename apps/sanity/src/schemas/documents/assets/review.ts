import { MessageSquareQuoteIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { getFormaMediaMedia, getFormaMediaSelectProps, textBlockToPlainText } from '../../../common/utils';
import { defineImageField, defineRichEditorField } from '../../../fields';
import { defineFormaMediaField } from '../../../fields/media';
import { defineShadeColorField } from '../../../fields/shade-color';

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
      ...getFormaMediaSelectProps('media')
    },
    prepare: ({ title, authorName, authorRole, authorCompany, ...formaMediaProps }) => ({
      media: getFormaMediaMedia(formaMediaProps),
      title: textBlockToPlainText(title, 30),
      subtitle: `${authorName}, ${authorRole}, ${authorCompany}`
    })
  },
  fields: [
    defineFormaMediaField({
      name: 'media',
      title: 'Media',
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
    defineShadeColorField({
      name: 'brandShade',
      title: 'Brand Shade'
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
