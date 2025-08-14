import { defineType } from 'sanity';
import { FOOTER_SCHEMA_TYPE } from '../../utils/sanity-types';

export const footerDocumentType = defineType({
  type: 'document',
  name: FOOTER_SCHEMA_TYPE,
  preview: {
    prepare: () => ({ title: 'Footer Settings' })
  },
  title: 'Footer',
  fields: [
    {
      name: 'footerHeading',
      title: 'Footer Heading',
      type: 'string'
    }
  ]
});
