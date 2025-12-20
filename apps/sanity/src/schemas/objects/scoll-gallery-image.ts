import { ImageIcon } from 'lucide-react';
import { defineType } from 'sanity';
import { OBJECT_SCHEMA_TYPES } from '../../common/constants';
import { getFormaMediaMedia, getFormaMediaTitle } from '../../common/utils';
import { defineImageTagsField } from '../../fields/image-tags';
import { defineFormaMediaField } from '../../fields/media';

export const scrollGalleryImageObjectType = defineType({
  type: 'object',
  icon: ImageIcon,
  name: OBJECT_SCHEMA_TYPES.scrollGalleryImage,
  preview: {
    select: {
      formaMediaType: 'formaMedia.formaMedia._type',
      formaImageClientName: 'formaMedia.formaMedia.clientName',
      formaVideoClientName: 'formaMedia.formaMedia.clientName',
      formaImageTitle: 'formaMedia.formaMedia.imageTitle',
      formaVideoTitle: 'formaMedia.formaMedia.videoTitle',
      formaMediaOverrideAltText: 'formaMedia.overrideAltText',
      formaMediaImage: 'formaMedia.formaMedia.image',
      formaMediaVideoThumbnail: 'formaMedia.formaMedia.thumbnail',
      imageTags: 'imageTags'
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
  fields: [defineFormaMediaField(), defineImageTagsField()]
});
