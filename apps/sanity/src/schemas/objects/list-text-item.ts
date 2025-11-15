import { ListIcon } from 'lucide-react';
import { defineType } from 'sanity';
import { OBJECT_SCHEMA_TYPES } from '../../common/constants';
import { textBlockToPlainText } from '../../common/utils';
import { defineRichEditorField } from '../../fields';

export const listTextItemObjectType = defineType({
  type: 'object',
  name: OBJECT_SCHEMA_TYPES.listTextItem,
  preview: {
    select: {
      heading: 'heading',
      caption: 'caption'
    },
    prepare: ({ heading, caption }) => ({
      title: textBlockToPlainText(heading),
      subtitle: textBlockToPlainText(caption),
      media: ListIcon
    })
  },
  fields: [
    defineRichEditorField({
      title: 'Heading',
      name: 'heading',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      title: 'Caption',
      name: 'caption',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    })
  ]
});
