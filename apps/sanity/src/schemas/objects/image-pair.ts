import { RectangleHorizontalIcon } from 'lucide-react';
import { defineType } from 'sanity';
import { OBJECT_SCHEMA_TYPES } from '../../common/constants';
import { getVariantTitle } from '../../common/utils';
import { defineImageField, defineModuleVariantField } from '../../fields';

export const imagePairObjectType = defineType({
  type: 'object',
  icon: RectangleHorizontalIcon,
  name: OBJECT_SCHEMA_TYPES.imagePair,
  preview: {
    select: {
      leftImage: 'leftImage',
      rightImage: 'rightImage',
      variant: 'variant'
    },
    prepare: ({ leftImage, rightImage, variant }) => ({
      title: `Image Pair - ${getVariantTitle(variant)}`,
      subtitle: `${leftImage.altText} and ${rightImage.altText}`,
      media: leftImage
    })
  },
  fields: [
    defineModuleVariantField(),
    defineImageField({
      name: 'leftImage',
      title: 'Left Image',
      validation: rule => rule.required()
    }),
    defineImageField({
      name: 'rightImage',
      title: 'Right Image',
      validation: rule => rule.required()
    })
  ]
});
