import { defineField } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../common/constants';
import { AsyncSelect } from '../components/async-select';

type TProps = {
  name?: string;
  title?: string;
};

export function defineImageTagsField({
  name = 'imageTags',
  title = 'Image Tags'
}: TProps = {}): ReturnType<typeof defineField> {
  return defineField({
    title,
    name,
    type: 'array',
    of: [{ type: DOCUMENT_SCHEMA_TYPES.mediaTagAsset }],
    validation: rule => rule.required(),
    options: {},
    components: {
      input: AsyncSelect
    }
  });
}
