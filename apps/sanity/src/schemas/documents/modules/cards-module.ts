import { TouchpadIcon } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineFormaImageField, defineRichEditorField } from '../../../fields';

export const cardsModuleDocumentType = defineType({
  type: 'document',
  title: 'Cards Module',
  name: DOCUMENT_SCHEMA_TYPES.cardsModule,
  icon: TouchpadIcon,
  preview: {
    select: {
      title: 'heading',
      cards: 'cards',
      media: 'backgroundImage.formaImage.image'
    },
    prepare: ({ title, cards, media }) => ({
      media,
      title: textBlockToPlainText(title),
      subtitle: `Contained ${cards.length} card(s)`
    })
  },
  fields: [
    defineRichEditorField({
      name: 'heading',
      title: 'Heading',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineFormaImageField({
      name: 'backgroundImage',
      title: 'Background Image',
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
