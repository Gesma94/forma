import { defineField, type FieldDefinition, type SchemaValidationValue } from 'sanity';
import { OBJECT_SCHEMA_TYPES } from '../common/constants';

type TProps = {
  name?: string;
  title?: string;
  note?: string;
  fieldset?: string;
  fields?: FieldDefinition[];
  validation?: SchemaValidationValue;
  skipAltText?: boolean;
  skipBrightness?: boolean;
};

export function defineFormaMediaField(
  { name = 'formaMedia', title = 'Forma Media', fieldset, validation }: TProps = {
    name: 'formaMedia',
    title: 'Forma Media'
  }
) {
  return defineField({
    name,
    title,
    fieldset,
    validation,
    type: OBJECT_SCHEMA_TYPES.formaMediaInstance
  });
}
