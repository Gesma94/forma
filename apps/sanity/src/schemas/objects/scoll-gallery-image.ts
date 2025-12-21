import { ImageIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, FORMA_MEDIA_SELECT_PROPS, OBJECT_SCHEMA_TYPES } from '../../common/constants';
import { getFormaMediaMedia, getFormaMediaTitle } from '../../common/utils';
import { defineFormaMediaField } from '../../fields/media';

export const scrollGalleryImageObjectType = defineType({
  type: 'object',
  icon: ImageIcon,
  name: OBJECT_SCHEMA_TYPES.scrollGalleryImage,
  preview: {
    select: {
      ...FORMA_MEDIA_SELECT_PROPS,
      imageTags: 'imageTags.displayName'
    },
    prepare: ({
      imageTags,
      formaMediaImage,
      formaMediaVideoThumbnail,
      formaVideoClientName,
      formaMediaType,
      formaImageClientName,
      formaImageTitle,
      formaMediaOverrideAltText,
      formaVideoTitle
    }) => {
      return {
        title: getFormaMediaTitle({
          formaMediaType,
          formaImageClientName,
          formaImageTitle,
          formaMediaOverrideAltText,
          formaVideoClientName,
          formaVideoTitle
        }),
        media: getFormaMediaMedia({ formaMediaImage, formaMediaType, formaMediaVideoThumbnail }),
        subtitle: (imageTags ?? []).join(', ')
      };
    }
  },
  fields: [
    defineFormaMediaField(),
    defineField({
      title: 'Media Tags',
      name: 'mediaTags',
      type: 'array',
      of: [{ type: 'reference', to: { type: DOCUMENT_SCHEMA_TYPES.mediaTagAsset } }],
      validation: rule => rule.required()
    })
  ]
});
