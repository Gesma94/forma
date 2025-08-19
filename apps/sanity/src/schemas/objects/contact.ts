import { MailIcon, PhoneIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { OBJECT_SCHEMA_TYPES } from '../../common/constants';

export const contactObjectType = defineType({
  type: 'object',
  name: OBJECT_SCHEMA_TYPES.contact,
  preview: {
    select: {
      label: 'label',
      value: 'value',
      type: 'type'
    },
    prepare: ({ label, type, value }) => ({
      title: label,
      subtitle: `${type === 'email' ? 'Email' : 'Phone'} (${value})`,
      media: type === 'email' ? MailIcon : PhoneIcon
    })
  },
  fields: [
    defineField({
      type: 'string',
      title: 'Value',
      name: 'value',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      title: 'Label',
      name: 'label',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      title: 'Type',
      name: 'type',
      validation: rule => rule.required(),
      initialValue: 'phone',
      options: {
        layout: 'radio',
        list: [
          { title: 'Email', value: 'email' },
          { title: 'Phone', value: 'phone' }
        ]
      }
    })
  ]
});
