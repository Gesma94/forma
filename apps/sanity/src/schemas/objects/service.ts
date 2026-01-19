import { defineField, defineType } from 'sanity';
import { FORMA_MEDIA_SELECT_PROPS, OBJECT_SCHEMA_TYPES } from '../../common/constants';
import { getFormaMediaMedia, textBlockToPlainText } from '../../common/utils';
import { defineRichEditorField } from '../../fields';
import { defineFormaMediaField } from '../../fields/media';

export const serviceObjectType = defineType({
  type: 'object',
  name: OBJECT_SCHEMA_TYPES.service,
  preview: {
    select: {
      title: 'title',
      description: 'description',
      ...FORMA_MEDIA_SELECT_PROPS
    },
    prepare: ({ title, description, ...formaMediaProps }) => ({
      title: textBlockToPlainText(title),
      media: getFormaMediaMedia(formaMediaProps),
      subtitle: textBlockToPlainText(description, 30)
    })
  },
  fields: [
    defineRichEditorField({
      name: 'title',
      title: 'Title',
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'description',
      title: 'Description',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      name: 'serviceUrl',
      title: 'Service URL',
      validation: rule => rule.required()
    }),
    defineFormaMediaField()
  ]
});
