import { RectangleHorizontalIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { OBJECT_SCHEMA_TYPES } from '../../common/constants';
import { getFormaMediaMedia, getFormaMediaSelectProps, textBlockToPlainText } from '../../common/utils';
import { defineRichEditorField } from '../../fields';
import { defineFormaMediaField } from '../../fields/media';

export const cardObjectType = defineType({
  type: 'object',
  icon: RectangleHorizontalIcon,
  name: OBJECT_SCHEMA_TYPES.card,
  preview: {
    select: {
      title: 'title',
      description: 'description',
      ...getFormaMediaSelectProps('media')
    },
    prepare: ({ title, description, ...formaMediaProps }) => ({
      title,
      media: getFormaMediaMedia(formaMediaProps),
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
    defineFormaMediaField({
      name: 'media',
      title: 'Media',
      validation: rule => rule.required()
    })
  ]
});
