import { RectangleHorizontalIcon } from 'lucide-react';
import { defineType } from 'sanity';
import { OBJECT_SCHEMA_TYPES } from '../../common/constants';
import { getFormaImageAssetName, getVariantTitle } from '../../common/utils';
import { defineFormaImageField, defineModuleVariantField } from '../../fields';

export const imagePairObjectType = defineType({
  type: 'object',
  icon: RectangleHorizontalIcon,
  name: OBJECT_SCHEMA_TYPES.imagePair,
  preview: {
    select: {
      variant: 'variant',
      media: 'leftImage.formaImage.image',
      leftFormaImageTitle: 'leftImage.formaImage.imageTitle',
      leftFormaImageClientName: 'leftImage.formaImage.clientName',
      rightFormaImageTitle: 'rightImage.formaImage.imageTitle',
      rightFormaImageClientName: 'rightImage.formaImage.clientName'
    },
    prepare: ({
      leftFormaImageClientName,
      leftFormaImageTitle,
      rightFormaImageClientName,
      rightFormaImageTitle,
      media,
      variant
    }) => ({
      media,
      title: `Image Pair - ${getVariantTitle(variant)}`,
      subtitle: `${getFormaImageAssetName(leftFormaImageTitle, leftFormaImageClientName)} || ${getFormaImageAssetName(rightFormaImageTitle, rightFormaImageClientName)}`
    })
  },
  fields: [
    defineModuleVariantField(),
    defineFormaImageField({
      name: 'leftImage',
      title: 'Left Image',
      validation: rule => rule.required()
    }),
    defineFormaImageField({
      name: 'rightImage',
      title: 'Right Image',
      validation: rule => rule.required()
    })
  ]
});
