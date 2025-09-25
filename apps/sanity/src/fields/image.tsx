import { defineField, type FieldDefinition, type ImageRule, type ImageValue, type ValidationBuilder } from 'sanity';

type TProps = {
  name: string;
  title: string;
  note?: string;
  fieldset?: string;
  fields?: FieldDefinition[];
  validation?: ValidationBuilder<ImageRule, ImageValue>;
  skipAltText?: boolean;
  skipBrightness?: boolean;
};

export function defineImageField({
  name,
  title,
  fieldset,
  fields,
  validation,
  skipAltText = false,
  skipBrightness = false
}: TProps): ReturnType<typeof defineField> {
  const computedFields: FieldDefinition[] = [];

  if (!skipAltText) {
    computedFields.push({
      title: 'Alternative Text',
      name: 'altText',
      type: 'string',
      validation: rule => rule.required()
    });
  }
  if (!skipBrightness) {
    computedFields.push({
      title: 'Brightness (%)',
      name: 'brightness',
      type: 'number',
      initialValue: 100,
      validation: rule => rule.min(0).max(100).required()
    });
  }

  return defineField({
    name,
    title,
    fieldset,
    type: 'image',
    fields: [...computedFields, ...(fields ?? [])],
    validation
  });
}
