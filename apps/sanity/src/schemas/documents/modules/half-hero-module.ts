import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineFormaImageField, defineRichEditorField } from '../../../fields';

export const halfHeroModuleDocumentType = defineType({
  type: 'document',
  title: 'Half Hero Module',
  name: DOCUMENT_SCHEMA_TYPES.halfHeroModule,
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subHeading',
      media: 'backgroundImage.formaImage.image'
    },
    prepare: ({ title, subtitle, media }) => ({
      title: textBlockToPlainText(title),
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
    defineRichEditorField({
      name: 'heading',
      title: 'Heading',
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'subHeading',
      title: 'Sub Heading',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: OBJECT_SCHEMA_TYPES.cta,
      validation: rule => rule.required()
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: OBJECT_SCHEMA_TYPES.cta,
      validation: rule => rule.required()
    })
  ]
});
