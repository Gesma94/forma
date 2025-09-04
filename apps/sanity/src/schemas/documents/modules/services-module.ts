import { BoxesIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineRichEditorField } from '../../../fields';

export const servicesModuleDocumentType = defineType({
  type: 'document',
  title: 'Services Module',
  name: DOCUMENT_SCHEMA_TYPES.servicesModule,
  icon: BoxesIcon,
  preview: {
    select: {
      title: 'heading',
      subHeading: 'subHeading'
    },
    prepare: ({ title, subHeading }) => ({
      title: textBlockToPlainText(title),
      subtitle: textBlockToPlainText(subHeading, 30)
    })
  },
  fieldsets: [
    {
      title: 'Still Image Service',
      name: 'stillImageService',
      options: {
        collapsible: false,
        collapsed: false
      }
    },
    {
      title: 'Animations Service',
      name: 'animationsService',
      options: {
        collapsible: false,
        collapsed: false
      }
    },
    {
      title: '360VR Service',
      name: 'vrService',
      options: {
        collapsible: false,
        collapsed: false
      }
    }
  ],
  fields: [
    defineRichEditorField({
      name: 'heading',
      title: 'Heading',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'subHeading',
      title: 'Subheading',
      allowColorMarkDecorator: false,
      validation: rule => rule.required()
    }),
    defineField({
      name: 'stillImageServiceTitle',
      title: 'Still Image Service Title',
      type: 'string',
      validation: rule => rule.required(),
      fieldset: 'stillImageService'
    }),
    defineRichEditorField({
      name: 'stillImageServiceContent',
      title: 'Still Image Service Content',
      allowColorMarkDecorator: false,
      validation: rule => rule.required(),
      fieldset: 'stillImageService'
    }),
    defineField({
      name: 'stillImageServiceVideo',
      title: 'Still Image Service Video',
      type: 'file',
      validation: rule => rule.required(),
      fieldset: 'stillImageService'
    }),
    defineField({
      name: 'animationsServiceTitle',
      title: 'Animations Service Title',
      type: 'string',
      validation: rule => rule.required(),
      fieldset: 'animationsService'
    }),
    defineRichEditorField({
      name: 'animationsServiceContent',
      title: 'Animations Service Content',
      allowColorMarkDecorator: false,
      validation: rule => rule.required(),
      fieldset: 'animationsService'
    }),
    defineField({
      name: 'animationsServiceVideo',
      title: 'Animations Service Video',
      type: 'file',
      validation: rule => rule.required(),
      fieldset: 'animationsService'
    }),
    defineField({
      name: 'vrServiceTitle',
      title: '360 VR Service Title',
      type: 'string',
      validation: rule => rule.required(),
      fieldset: 'vrService'
    }),
    defineRichEditorField({
      name: 'vrServiceContent',
      title: '360 VR Service Content',
      allowColorMarkDecorator: false,
      validation: rule => rule.required(),
      fieldset: 'vrService'
    }),
    defineField({
      name: 'vrServiceVideo',
      title: '360 VR Service Video',
      type: 'file',
      validation: rule => rule.required(),
      fieldset: 'vrService'
    })
  ]
});
