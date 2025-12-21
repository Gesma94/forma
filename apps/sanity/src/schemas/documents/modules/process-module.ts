import { RouteIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { getFormaMediaMedia, getFormaMediaSelectProps, textBlockToPlainText } from '../../../common/utils';
import { defineModuleVariantField, defineRichEditorField } from '../../../fields';
import { defineImagePositionField } from '../../../fields/image-position';
import { defineFormaMediaField } from '../../../fields/media';
import { defineSpacingField } from '../../../fields/spacing';

export const processModuleDocumentType = defineType({
  type: 'document',
  title: 'Process Module',
  name: DOCUMENT_SCHEMA_TYPES.processModule,
  icon: RouteIcon,
  preview: {
    select: {
      order: 'order',
      heading: 'heading',
      description: 'description',
      ...getFormaMediaSelectProps('image')
    },
    prepare: ({ heading, description, order, ...formaMediaProps }) => ({
      title: `${order} - ${textBlockToPlainText(heading)}`,
      media: getFormaMediaMedia(formaMediaProps),
      subtitle: textBlockToPlainText(description, 30)
    })
  },
  fields: [
    defineModuleVariantField(),
    defineSpacingField(),
    defineImagePositionField(),
    defineField({
      type: 'number',
      title: 'Order',
      name: 'order',
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      title: 'Heading',
      name: 'heading',
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      title: 'Description',
      name: 'description',
      validation: rule => rule.required(),
      allowColorMarkDecorator: false
    }),
    defineField({
      type: 'number',
      title: 'Estimated days',
      name: 'estimatedDays',
      validation: rule => rule.required()
    }),
    defineFormaMediaField({
      name: 'image',
      title: 'Image',
      validation: rule => rule.required()
    })
  ]
});
