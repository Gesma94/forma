import { defineField, type FieldDefinition, type ImageRule, type ImageValue, type ValidationBuilder } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../common/constants';

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
  validation
}: TProps): ReturnType<typeof defineField> {
  const computedFields: FieldDefinition[] = [];

  computedFields.push({
    title: 'Alternative Text',
    name: 'altText',
    type: 'string',
    validation: rule => rule
  });

  computedFields.push({
    title: 'Brightness (%)',
    name: 'brightness',
    type: 'number',
    initialValue: 100,
    validation: rule => rule.min(0).max(100)
  });

  return defineField({
    name,
    title,
    fieldset,
    type: 'image',
    fields: [...computedFields, ...(fields ?? [])],
    validation
  });
}

export function defineImageField2({ name, title, fieldset }: TProps) {
  return defineField({
    name,
    title,
    fieldset,
    type: 'reference',
    to: [{ type: DOCUMENT_SCHEMA_TYPES.formaImageAsset }]
  });
}
