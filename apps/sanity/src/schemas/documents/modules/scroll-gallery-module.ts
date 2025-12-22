import { UsersIcon } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { defineShadeColorField } from '../../../fields/shade-color';

export const scrollGalleryModuleDocumentType = defineType({
  type: 'document',
  title: 'Scroll Gallery Module',
  name: DOCUMENT_SCHEMA_TYPES.scrollGalleryModule,
  icon: UsersIcon,
  preview: {
    select: {
      title: 'friendlyName',
      scrollGalleryImages: 'scrollGalleryImages'
    },
    prepare: ({ title, scrollGalleryImages }) => ({
      title,
      subtitle: `Contained ${scrollGalleryImages.length} image(s)`
    })
  },
  fields: [
    defineField({
      type: 'string',
      name: 'friendlyName',
      title: 'Friendly Name',
      description: 'Used only to identify the module in the CMS',
      validation: rule => rule.required()
    }),
    defineShadeColorField({
      name: 'backgroundShadeColor',
      title: 'Background Shade Color'
    }),
    defineField({
      name: 'scrollGalleryImages',
      title: 'Scroll Gallery Images',
      type: 'array',
      of: [defineArrayMember({ type: OBJECT_SCHEMA_TYPES.scrollGalleryImage })],
      validation: rule => rule.required().min(1)
    })
  ]
});
