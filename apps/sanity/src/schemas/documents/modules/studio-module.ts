import { defineArrayMember, defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineFormaImageField, defineRichEditorField } from '../../../fields';
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
      media: 'image.formaImage.image'
    },
    prepare: ({ title, media, content }) => ({
      title: textBlockToPlainText(title),
      media,
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
      name: 'CtaLabel',
      title: 'CTA Label',
      fieldset: 'CTA',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'forClientSubHeading',
      title: 'For Client Subheading',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineFormaImageField({
      name: 'problemsImage',
      title: 'Problems Image',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'problems',
      title: 'Problems',
      type: 'array',
      of: [defineArrayMember({ type: OBJECT_SCHEMA_TYPES.listTextItem })],
      validation: rule => rule.required().min(1)
    }),
    defineField({
      name: 'showCta',
      title: 'Show CTA',
      type: 'boolean',
      fieldset: 'CTA',
      initialValue: true,
      validation: rule => rule.required()
    })
  ]
});
