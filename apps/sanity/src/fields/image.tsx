import { defineField, type ImageRule, type ImageValue, type ValidationBuilder } from 'sanity';

type TProps = {
  name: string;
  title: string;
  note?: string;
  fieldset?: string;
  allowColorMarkDecorator?: boolean;
  validation?: ValidationBuilder<ImageRule, ImageValue>;
};

export function defineImageField({ name, title, fieldset, validation }: TProps): ReturnType<typeof defineField> {
  return defineField({
    name,
    title,
    fieldset,
    type: 'image',
    fields: [
      {
        title: 'Alternative Text',
        name: 'altText',
        type: 'string',
        validation: rule => rule.required()
      }
    ],
    validation
  });
}
