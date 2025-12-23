import { CirclePlayIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { getFormaMediaMedia, getFormaMediaSelectProps, textBlockToPlainText } from '../../../common/utils';
import { defineRichEditorField } from '../../../fields';
import { defineFormaMediaField } from '../../../fields/media';

export const readyToStartModuleDocumentType = defineType({
  type: 'document',
  title: 'Ready to Start Module',
  name: DOCUMENT_SCHEMA_TYPES.readyToStartModule,
  icon: CirclePlayIcon,
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      ...getFormaMediaSelectProps('backgroundMedia')
    },
    prepare: ({ title, subtitle, ...formaMediaProps }) => ({
      title: textBlockToPlainText(title),
      subtitle: textBlockToPlainText(subtitle),
      media: getFormaMediaMedia(formaMediaProps)
    })
  },
  fields: [
    defineFormaMediaField({
      name: 'backgroundMedia',
      title: 'Background Media',
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'title',
      title: 'Title',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'subtitle',
      title: 'Subtitle',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      name: 'primaryCtaLabel',
      title: 'Primary CTA Label',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      name: 'emailCta',
      title: 'Email CTA',
      validation: rule => rule.required()
    })
  ]
});
