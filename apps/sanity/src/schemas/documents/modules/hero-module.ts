import { defineArrayMember, defineField, defineType } from 'sanity';
import { textBlockToPlainText } from '../../../utils/portable-text';
import { HERO_MODULE_SCHEMA_TYPE } from '../../../utils/sanity-types';
import { PaletteIcon } from 'lucide-react';
import { ColorDecorator } from '../../../components/portable-text-decorators/color-decorator';
import { ColorIcon } from '../../../components/portable-text-decorators/color-icon';

export const heroModuleDocumentType = defineType({
  type: 'document',
  title: 'Hero Module',
  name: HERO_MODULE_SCHEMA_TYPE,
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage'
    },
    prepare: ({ title, media }) => ({ title: textBlockToPlainText(title), media, subtitle: 'Hero Module' })
  },
  fields: [
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Color', value: 'color', icon: ColorIcon, component: ColorDecorator }
            ],
            annotations: [
            
            ]
          },
          lists: [],
          styles: []
        })
      ],
      validation: rule => rule.required()
    }),
    defineField({
      name: 'CtaLabel',
      title: 'CTA Label',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'SecondaryCtaLabel',
      title: 'Secondary CTA Label',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'firmsText',
      title: 'Firms text',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'array',
      name: 'firmImages',
      title: 'Firm Images',
      of: [defineArrayMember({ type: 'image' })]
    }),
    defineField({
      name: 'scrollText',
      title: 'Scroll Text',
      type: 'string',
      validation: rule => rule.required()
    })
  ]
});
