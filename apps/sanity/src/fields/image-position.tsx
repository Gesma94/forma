import { ELEMENT_X_POSITION } from '@forma/common';
import { defineField } from 'sanity';

export function defineImagePositionField(): ReturnType<typeof defineField> {
  return defineField({
    type: 'string',
    name: 'imagePosition',
    title: 'Image Position',
    validation: rule => rule.required(),
    initialValue: ELEMENT_X_POSITION.RIGHT,
    options: {
      layout: 'radio',
      list: [
        { title: 'Left', value: ELEMENT_X_POSITION.LEFT },
        { title: 'Right', value: ELEMENT_X_POSITION.RIGHT }
      ]
    }
  });
}
