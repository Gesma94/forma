import { MODULE_VARIANTS } from '@forma/common';
import { defineField } from 'sanity';
import { getVariantTitle } from '../common/utils';

type TProps = {
  name?: string;
  title?: string;
};

export function defineModuleVariantField({
  name = 'variant',
  title = 'Variant'
}: TProps = {}): ReturnType<typeof defineField> {
  return defineField({
    type: 'string',
    title,
    name,
    validation: rule => rule.required(),
    initialValue: MODULE_VARIANTS.ON_BG,
    options: {
      layout: 'radio',
      list: Object.values(MODULE_VARIANTS).map(x => ({
        title: getVariantTitle(x),
        value: x
      }))
    }
  });
}
