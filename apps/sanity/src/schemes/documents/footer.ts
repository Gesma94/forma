import { defineArrayMember, defineField, defineType } from 'sanity';
import { CONTACT_OBJECT_SCHEMA_TYPE, FOOTER_SCHEMA_TYPE, LINK_OBJECT_SCHEMA_TYPE } from '../../utils/sanity-types';

export const footerDocumentType = defineType({
  type: 'document',
  name: FOOTER_SCHEMA_TYPE,
  preview: {
    prepare: () => ({ title: 'Footer Settings' })
  },
  title: 'Footer',
  fieldsets: [
    {
      name: 'socialLinks',
      title: 'Social Links',
      options: {
        collapsible: false,
      }
    },
    {
      name: 'linkSection',
      title: 'Link Section',
      options: {
        collapsible: false,
      }
    },
    {
      name: 'addressSection',
      title: 'Address Section',
      options: {
        collapsible: false,
      }
    },
    {
      name: 'contactSection',
      title: 'Contact Section',
      options: {
        collapsible: false,
      }
    }
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'CtaLabel',
      title: 'CTA Label',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'linkGroupTitle',
      title: 'Link Group Title',
      type: 'string',
      fieldset: 'linkSection',
      validation: rule => rule.required()
    }),    
    defineField({
      type: 'array',
      name: 'links',
      title: 'Links',
      fieldset: 'linkSection',
      of: [defineArrayMember({ type: LINK_OBJECT_SCHEMA_TYPE })]
    }),
    defineField({
      name: 'addressTitle',
      title: 'Address Title',
      type: 'string',
      fieldset: 'addressSection',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      fieldset: 'addressSection',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'addressActionLabel',
      title: 'Address Action Label',
      type: 'string',
      fieldset: 'addressSection',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      name: 'addressMapUrl',
      title: 'Address Map URL',
      fieldset: 'addressSection',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'contactTitle',
      title: 'Contact Title',
      type: 'string',
      fieldset: 'contactSection',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'array',
      name: 'contacts',
      title: 'Contacts',
      fieldset: 'contactSection',
      of: [defineArrayMember({ type: CONTACT_OBJECT_SCHEMA_TYPE })]
    }),
    defineField({
      type: 'string',
      name: 'facebookLink',
      title: 'Facebook Link',
      fieldset: 'socialLinks',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      name: 'instagramLink',
      title: 'Instagram Link',
      fieldset: 'socialLinks',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      name: 'linkedinLink',
      title: 'LinkedIn Link',
      fieldset: 'socialLinks',
      validation: rule => rule.required()
    })
  ]
});
