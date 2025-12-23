import { ELEMENT_X_POSITION } from '@forma/common';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { getFormaMediaMedia, getFormaMediaTitle } from '../../../common/utils';
import { defineModuleVariantField } from '../../../fields';
import { defineSpacingField } from '../../../fields/spacing';

export const parallaxImagesModuleDocumentType = defineType({
  type: 'document',
  title: 'Parallax Images Module',
  name: DOCUMENT_SCHEMA_TYPES.parallaxImagesModule,
  preview: {
    select: {
      title: 'friendlyName',
      leftFormaMediaType: 'imagePair.leftMedia.formaMedia._type',
      leftFormaImageClientName: 'imagePair.leftMedia.formaMedia.clientName',
      leftFormaVideoClientName: 'imagePair.leftMedia.formaMedia.clientName',
      leftFormaImageTitle: 'imagePair.leftMedia.formaMedia.imageTitle',
      leftFormaVideoTitle: 'imagePair.leftMedia.formaMedia.videoTitle',
      leftFormaMediaOverrideAltText: 'imagePair.leftMedia.overrideAltText',
      leftFormaMediaImage: 'imagePair.leftMedia.formaMedia.image',
      leftFormaMediaVideoThumbnail: 'imagePair.leftMedia.formaMedia.thumbnail',
      rightFormaMediaType: 'imagePair.rightMedia.formaMedia._type',
      rightFormaImageClientName: 'imagePair.rightMedia.formaMedia.clientName',
      rightFormaVideoClientName: 'imagePair.rightMedia.formaMedia.clientName',
      rightFormaImageTitle: 'imagePair.rightMedia.formaMedia.imageTitle',
      rightFormaVideoTitle: 'imagePair.rightMedia.formaMedia.videoTitle',
      rightFormaMediaOverrideAltText: 'imagePair.rightMedia.overrideAltText'
    },
    prepare: ({
      title,
      leftFormaMediaType,
      leftFormaImageClientName,
      leftFormaVideoClientName,
      leftFormaImageTitle,
      leftFormaVideoTitle,
      leftFormaMediaOverrideAltText,
      leftFormaMediaImage,
      leftFormaMediaVideoThumbnail,
      rightFormaMediaType,
      rightFormaImageClientName,
      rightFormaVideoClientName,
      rightFormaImageTitle,
      rightFormaVideoTitle,
      rightFormaMediaOverrideAltText
    }) => ({
      title,
      media: getFormaMediaMedia({
        formaMediaImage: leftFormaMediaImage,
        formaMediaType: leftFormaMediaType,
        formaMediaVideoThumbnail: leftFormaMediaVideoThumbnail
      }),
      subtitle: `${getFormaMediaTitle({
        formaMediaType: leftFormaMediaType,
        formaImageClientName: leftFormaImageClientName,
        formaImageTitle: leftFormaImageTitle,
        formaMediaOverrideAltText: leftFormaMediaOverrideAltText,
        formaVideoClientName: leftFormaVideoClientName,
        formaVideoTitle: leftFormaVideoTitle
      })} || ${getFormaMediaTitle({
        formaMediaType: rightFormaMediaType,
        formaImageClientName: rightFormaImageClientName,
        formaImageTitle: rightFormaImageTitle,
        formaMediaOverrideAltText: rightFormaMediaOverrideAltText,
        formaVideoClientName: rightFormaVideoClientName,
        formaVideoTitle: rightFormaVideoTitle
      })}`
    })
  },
  fields: [
    defineSpacingField(),
    defineModuleVariantField(),
    defineField({
      type: 'string',
      name: 'bigImagePosition',
      description: 'Defines where the big image is positioned',
      title: 'Big Image Position',
      validation: rule => rule.required(),
      initialValue: ELEMENT_X_POSITION.LEFT,
      options: {
        layout: 'radio',
        list: [
          { title: 'Left', value: ELEMENT_X_POSITION.LEFT },
          { title: 'Right', value: ELEMENT_X_POSITION.RIGHT }
        ]
      }
    }),
    defineField({
      type: 'string',
      name: 'friendlyName',
      title: 'Friendly Name',
      description: 'Used only to identify the module in the CMS',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'imagePair',
      title: 'Image Pair',
      type: OBJECT_SCHEMA_TYPES.imagePair,
      validation: rule => rule.required()
    })
  ]
});
