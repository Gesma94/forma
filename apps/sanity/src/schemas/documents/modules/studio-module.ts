import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { getFormaMediaMedia, getFormaMediaSelectProps, textBlockToPlainText } from '../../../common/utils';
import { defineRichEditorField } from '../../../fields';
import { defineFormaMediaField } from '../../../fields/media';
import { defineSpacingField } from '../../../fields/spacing';

export const studioModuleDocumentType = defineType({
  type: 'document',
  title: 'Studio Module',
  name: DOCUMENT_SCHEMA_TYPES.studioModule,
  preview: {
    select: {
      content: 'content',
      title: 'subHeading',
      ...getFormaMediaSelectProps('media')
    },
    prepare: ({ title, content, ...formaMediaProps }) => ({
      title: textBlockToPlainText(title),
      media: getFormaMediaMedia(formaMediaProps),
      subtitle: textBlockToPlainText(content, 30)
    })
  },
  fieldsets: [
    {
      name: 'CTA',
      title: 'Call to Action'
    }
  ],
  fields: [
    defineSpacingField(),
    defineRichEditorField({
      name: 'subHeading',
      title: 'Subheading',
      note: 'This text will be red by default',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'content',
      title: 'Content',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineFormaMediaField({
      name: 'media',
      title: 'Media',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: OBJECT_SCHEMA_TYPES.cta,
      validation: rule => rule.required()
    })
  ]
});
