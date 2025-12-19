import { SparkleIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { getVariantTitle, textBlockToPlainText } from '../../../common/utils';
import { defineModuleVariantField, defineRichEditorField } from '../../../fields';
import { defineSpacingField } from '../../../fields/spacing';

export const brandsModuleDocumentType = defineType({
  type: 'document',
  title: 'Brands Module',
  name: DOCUMENT_SCHEMA_TYPES.brandsModule,
  icon: SparkleIcon,
  preview: {
    select: {
      title: 'heading',
      variant: 'variant'
    },
    prepare: ({ title, variant }) => ({
      title: textBlockToPlainText(title),
      subtitle: `Brands Module - ${getVariantTitle(variant)}`
    })
  },
  fields: [
    defineModuleVariantField(),
    defineSpacingField(),
    defineRichEditorField({
      name: 'heading',
      title: 'Heading',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'content',
      title: 'Content',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineField({
      name: 'brands',
      title: 'Brands',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: DOCUMENT_SCHEMA_TYPES.brand }
        }
      ],
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
