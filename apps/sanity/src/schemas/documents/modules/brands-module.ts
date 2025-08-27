import { BRANDS_MODULE_VARIANTS, type TBrandsModuleVariants } from '@forma/common';
import { SparkleIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineRichEditorField } from '../../../fields';

function getVariantTitle(variant: TBrandsModuleVariants) {
  switch (variant) {
    case BRANDS_MODULE_VARIANTS.ON_BG:
      return 'On BG';
    case BRANDS_MODULE_VARIANTS.ON_PRIMARY:
      return 'On Primary';
  }
}

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
    defineField({
      type: 'string',
      title: 'Variant',
      name: 'variant',
      validation: rule => rule.required(),
      initialValue: BRANDS_MODULE_VARIANTS.ON_BG,
      options: {
        layout: 'radio',
        list: Object.values(BRANDS_MODULE_VARIANTS).map(x => ({
          title: getVariantTitle(x),
          value: x
        }))
      }
    }),
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
