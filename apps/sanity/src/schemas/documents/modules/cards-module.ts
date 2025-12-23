import { TouchpadIcon } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';
import type { CardObjectType } from '../../../../generated/types/sanity-types-generated';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { getFormaMediaMedia, getFormaMediaSelectProps, textBlockToPlainText } from '../../../common/utils';
import { defineRichEditorField } from '../../../fields';
import { defineSpacingField } from '../../../fields/spacing';

export const cardsModuleDocumentType = defineType({
  type: 'document',
  title: 'Cards Module',
  name: DOCUMENT_SCHEMA_TYPES.cardsModule,
  icon: TouchpadIcon,
  preview: {
    select: {
      cards: 'cards',
      title: 'heading',
      ...getFormaMediaSelectProps('backgroundMedia')
    },
    prepare: ({ title, cards, ...formaMediaProps }) => ({
      title: textBlockToPlainText(title),
      media: getFormaMediaMedia(formaMediaProps),
      subtitle: cards.map((c: CardObjectType) => c.title).join(', ')
    })
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
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [defineArrayMember({ type: OBJECT_SCHEMA_TYPES.card })],
      validation: rule => rule.required().min(2)
    })
  ]
});
