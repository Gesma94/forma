import { defineField, type StringRule, type ValidationBuilder } from 'sanity';

type TProps = {
  validation?: ValidationBuilder<StringRule, string>;
};

export function defineFriendlyNameField({ validation }: TProps = {}): ReturnType<typeof defineField> {
  return defineField({
    type: 'string',
    name: 'friendlyName',
    title: 'Friendly Name',
    description: 'Used only to identify the module in the CMS',
    validation
  });
}
