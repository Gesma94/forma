import { GalleryHorizontalIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { defineImageField } from '../../../fields';

export const inlineGalleryModuleDocumentType = defineType({
  type: 'document',
  title: 'Inline Gallery Module',
  name: DOCUMENT_SCHEMA_TYPES.inlineGalleryModule,
  icon: GalleryHorizontalIcon,
  preview: {
    select: {
      title: 'heading',
      images: 'images'
    },
    prepare: ({ title, images }) => ({
      title,
      subtitle: `Selected ${images.length} image(s)`
    })
  },
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          ...defineImageField({
            name: 'image',
            title: 'Image',
            fields: [
              defineField({
                title: 'Title',
                name: 'title',
                type: 'string',
                validation: rule => rule.required()
              }),
              defineField({
                title: 'Subtitle',
                name: 'subtitle',
                type: 'string',
                validation: rule => rule.required()
              })
            ]
          })
        }
      ],
      validation: rule => rule.required()
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: OBJECT_SCHEMA_TYPES.cta,
      validation: rule => rule.required()
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: OBJECT_SCHEMA_TYPES.cta,
      validation: rule => rule.required()
    })
  ]
});
