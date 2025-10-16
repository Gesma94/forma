import { ImageIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { OBJECT_SCHEMA_TYPES } from '../../common/constants';
import { defineImageField } from '../../fields';
import { defineImageTagsField } from '../../fields/image-tags';

export const scrollGalleryImageObjectType = defineType({
  type: 'object',
  icon: ImageIcon,
  name: OBJECT_SCHEMA_TYPES.scrollGalleryImage,
  preview: {
    select: {
      title: 'title',
      imageTags: 'imageTags',
      media: 'image'
    },
    prepare: ({ title, imageTags, media }) => ({
      title,
      media,
      subtitle: (imageTags ?? []).join(', ')
    })
  },
  fields: [
    defineImageField({
      name: 'image',
      title: 'Image',
      skipAltText: true,
      skipBrightness: true,
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      title: 'Title',
      name: 'title',
      validation: rule => rule.required()
    }),
    defineImageTagsField()
  ]
});
