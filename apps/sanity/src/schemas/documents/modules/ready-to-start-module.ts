import { CirclePlayIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineFormaImageField, defineRichEditorField } from '../../../fields';

export const readyToStartModuleDocumentType = defineType({
  type: 'document',
  title: 'Ready to Start Module',
  name: DOCUMENT_SCHEMA_TYPES.readyToStartModule,
  icon: CirclePlayIcon,
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'backgroundImage.formaImage.image'
    },
    prepare: ({ title, subtitle, media }) => ({
      title,
      media,
      subtitle: textBlockToPlainText(subtitle, 30)
    })
  },
  fields: [
    defineFormaImageField({
      name: 'backgroundImage',
      title: 'Background Image',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
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
