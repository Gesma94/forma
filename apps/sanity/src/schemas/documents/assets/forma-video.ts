import { VideoIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { getFormaImageAssetName } from '../../../common/utils';

export const formaVideoDocumentType = defineType({
  type: 'document',
  title: 'Forma Video',
  icon: VideoIcon,
  name: DOCUMENT_SCHEMA_TYPES.formaVideoAsset,
  preview: {
    select: {
      videoTitle: 'videoTitle',
      clientName: 'clientName',
      media: 'thumbnail'
    },
    prepare: ({ clientName, videoTitle, media }) => ({
      title: getFormaImageAssetName(videoTitle, clientName) ?? media.asset._ref ?? 'Unnamed Video',
      subtitle: '🎥 Forma Video',
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
      title: 'Video Title',
      name: 'videoTitle',
      type: 'string'
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      validation: rule => rule.required()
    })
  ]
});
