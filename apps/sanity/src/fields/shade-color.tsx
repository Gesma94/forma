import { SHADE_COLOR } from '@forma/common';
import { defineField } from 'sanity';

type TProps = {
  name: string;
  title: string;
};

export function defineShadeColorField({ name, title }: TProps): ReturnType<typeof defineField> {
  return defineField({
    name,
    title,
    type: 'string',
    validation: rule => rule.required(),
    initialValue: SHADE_COLOR.LIGHT,
    options: {
      layout: 'radio',
      list: [
        { title: 'Light', value: SHADE_COLOR.LIGHT },
        { title: 'Dark', value: SHADE_COLOR.DARK }
      ]
    }
  });
}
