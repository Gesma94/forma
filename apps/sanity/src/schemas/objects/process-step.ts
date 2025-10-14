import { CircleDotIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { OBJECT_SCHEMA_TYPES } from '../../common/constants';
import { textBlockToPlainText } from '../../common/utils';
import { defineImageField, defineRichEditorField } from '../../fields';

export const processObjectType = defineType({
  type: 'object',
  icon: CircleDotIcon,
  name: OBJECT_SCHEMA_TYPES.processStep,
  preview: {
    select: {
      title: 'title',
      description: 'description'
    },
    prepare: ({ title, description }) => ({
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
    defineField({
      type: 'number',
      title: 'Estimated days',
      name: 'estimatedDays',
      validation: rule => rule.required()
    }),
    defineImageField({
      name: 'smallImage',
      title: 'smallImage',
      validation: rule => rule.required()
    })
  ]
});
