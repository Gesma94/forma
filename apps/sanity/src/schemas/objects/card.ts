import { RectangleHorizontalIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { OBJECT_SCHEMA_TYPES } from '../../common/constants';
import { textBlockToPlainText } from '../../common/utils';
import { defineFormaImageField, defineRichEditorField } from '../../fields';

export const cardObjectType = defineType({
  type: 'object',
  icon: RectangleHorizontalIcon,
  name: OBJECT_SCHEMA_TYPES.card,
  preview: {
    select: {
      title: 'title',
      description: 'description',
      media: 'image.formaImage.image'
    },
    prepare: ({ title, description, media }) => ({
      media,
      title,
      subtitle: textBlockToPlainText(description, 30)
    })
  },
  fields: [
    defineField({
      type: 'string',
      title: 'Title',
      name: 'title',
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      title: 'Description',
      name: 'description',
      validation: rule => rule.required(),
      allowColorMarkDecorator: false
    }),
    defineFormaImageField({
      name: 'image',
      title: 'Image',
      validation: rule => rule.required()
    })
  ]
});
