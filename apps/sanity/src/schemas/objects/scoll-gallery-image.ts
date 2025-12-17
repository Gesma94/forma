import { ImageIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../common/constants';
import { defineImageTagsField } from '../../fields/image-tags';

export const scrollGalleryImageObjectType = defineType({
  type: 'object',
  icon: ImageIcon,
  name: OBJECT_SCHEMA_TYPES.scrollGalleryImage,
  preview: {
    select: {
      title: 'image.clientName',
      imageTags: 'imageTags',
      media: 'image.image'
    },
    prepare: ({ title, imageTags, media }) => ({
      title,
      media,
      subtitle: (imageTags ?? []).join(', ')
    })
  },
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'reference',
      to: { type: DOCUMENT_SCHEMA_TYPES.formaImageAsset },
      validation: rule => rule.required()
    }),
    defineImageTagsField()
  ]
});
