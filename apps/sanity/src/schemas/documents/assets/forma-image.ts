import { ImageIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { getFormaImageAssetName } from '../../../common/utils';

export const formaImageDocumentType = defineType({
  type: 'document',
  title: 'Forma Image',
  icon: ImageIcon,
  name: DOCUMENT_SCHEMA_TYPES.formaImageAsset,
  preview: {
    select: {
      imageTitle: 'imageTitle',
      clientName: 'clientName',
      media: 'image'
    },
    prepare: ({ clientName, imageTitle, media }) => ({
      title: getFormaImageAssetName(imageTitle, clientName) ?? media.asset._ref ?? 'Unnamed Image',
      subtitle: '🌄 Forma Image',
      media
    })
  },
  fields: [
    defineField({
      title: 'Client Name',
      name: 'clientName',
      type: 'string'
    }),
    defineField({
      title: 'Image Title',
      name: 'imageTitle',
      type: 'string'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: rule => rule.required()
    })
  ]
});
