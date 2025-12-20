import { PADDING_SIZE } from '@forma/common';
import { defineField } from 'sanity';

type TProps = {
  fieldset?: string;
};

export function defineSpacingField({ fieldset }: TProps = {}) {
  return defineField({
    fieldset,
    type: 'object',
    name: 'paddings',
    title: 'Paddings',
    validation: rule => rule.required(),
    fields: [
      {
        type: 'string',
        name: 'paddingTop',
        title: 'Padding Top',
        initialValue: PADDING_SIZE.MD,
        validation: rule => rule.required(),
        options: {
          layout: 'dropdown',
          list: [
            { title: 'None', value: PADDING_SIZE.NONE },
            { title: 'Small', value: PADDING_SIZE.SM },
            { title: 'Medium', value: PADDING_SIZE.MD },
            { title: 'Large', value: PADDING_SIZE.LG }
          ]
        }
      },
      {
        type: 'string',
        name: 'paddingBottom',
        title: 'Padding Bottom',
        initialValue: PADDING_SIZE.MD,
        validation: rule => rule.required(),
        options: {
          layout: 'dropdown',
          list: [
            { title: 'None', value: PADDING_SIZE.NONE },
            { title: 'Small', value: PADDING_SIZE.SM },
            { title: 'Medium', value: PADDING_SIZE.MD },
            { title: 'Large', value: PADDING_SIZE.LG }
          ]
        }
      }
    ]
  });
}
