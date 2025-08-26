import { COUNTER_POSTFIX } from '@forma/common';
import { PercentIcon, PlusIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { OBJECT_SCHEMA_TYPES } from '../../common/constants';
import { defineRichEditorField } from '../../fields';

export const counterObjectType = defineType({
  type: 'object',
  name: OBJECT_SCHEMA_TYPES.counter,
  preview: {
    select: {
      value: 'value',
      postfix: 'postfix'
    },
    prepare: ({ postfix, value }) => ({
      title: `${value}${postfix}`,
      media: postfix === COUNTER_POSTFIX.plus ? PlusIcon : PercentIcon
    })
  },
  fields: [
    defineField({
      type: 'number',
      title: 'Value',
      name: 'value',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      title: 'Postfix',
      name: 'postfix',
      validation: rule => rule.required(),
      initialValue: COUNTER_POSTFIX.plus,
      options: {
        layout: 'radio',
        list: [
          { title: 'Plus', value: COUNTER_POSTFIX.plus },
          { title: 'Percent', value: COUNTER_POSTFIX.percent }
        ]
      }
    }),
    defineRichEditorField({
      name: 'content',
      title: 'Content',
      validation: rule => rule.required(),
      allowColorMarkDecorator: false
    })
  ]
});
