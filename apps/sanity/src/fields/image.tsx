import { defineField, type FieldDefinition, type ImageRule, type ImageValue, type ValidationBuilder } from 'sanity';

type TProps = {
  name: string;
  title: string;
  note?: string;
  fieldset?: string;
  fields?: FieldDefinition[];
  validation?: ValidationBuilder<ImageRule, ImageValue>;
};

export function defineImageField({
  name,
  title,
  fieldset,
  fields,
  validation
}: TProps): ReturnType<typeof defineField> {
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
      },
      {
        title: 'Brightness (%)',
        name: 'brightness',
        type: 'number',
        initialValue: 100,
        validation: rule => rule.min(0).max(100).required()
      },
      ...(fields ?? [])
    ],
    validation
  });
}
