import { CircleDotIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { OBJECT_SCHEMA_TYPES } from '../../common/constants';
import { textBlockToPlainText } from '../../common/utils';
import { defineRichEditorField } from '../../fields';

export const howItWorksObjectType = defineType({
  type: 'object',
  icon: CircleDotIcon,
  name: OBJECT_SCHEMA_TYPES.howItWorksStep,
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
      type: 'string',
      title: 'Day range',
      name: 'dayRange',
      description: 'E.g. "1-3"',
      validation: rule => rule.required().regex(/^\d+-\d+$/, { name: 'x-y' })
    })
  ]
});
