import { ImageIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { getFormaImageAssetName } from '../../../common/utils';

export const forma360DocumentType = defineType({
  type: 'document',
  title: 'Forma 360',
  icon: ImageIcon,
  name: DOCUMENT_SCHEMA_TYPES.forma360Asset,
  preview: {
    select: {
      imageTitle: 'imageTitle',
      clientName: 'clientName',
      media: 'image'
    },
    prepare: ({ clientName, imageTitle, media }) => ({
      title: getFormaImageAssetName(imageTitle, clientName) ?? media.asset._ref ?? 'Unnamed Image',
      subtitle: '🌐 Forma 360',
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
