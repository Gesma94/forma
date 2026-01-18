import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../../../common/constants';
import { defineFormaMediaField } from '../../../fields/media';

export const topbarDocumentType = defineType({
  type: 'document',
  name: DOCUMENT_SCHEMA_TYPES.topbar,
  preview: {
    prepare: () => ({ title: 'Topbar Settings' })
  },
  title: 'Topbar',
  fields: [
    defineField({
      type: 'string',
      name: 'architecturalStillsCaption',
      title: 'Architectural Stills Caption',
      validation: rule => rule.required()
    }),
    defineFormaMediaField({
      name: 'architecturalStillsMedia',
      title: 'Architectural Stills Media',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      name: 'videoAnimationsCaption',
      title: 'Video Animations Caption',
      validation: rule => rule.required()
    }),
    defineFormaMediaField({
      name: 'videoAnimationsMedia',
      title: 'Video & Animations Media',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      name: 'virtualRealityCaption',
      title: 'Virtual Reality Caption',
      validation: rule => rule.required()
    }),
    defineFormaMediaField({
      name: 'virtualRealityMedia',
      title: 'Virtual Reality Media',
      validation: rule => rule.required()
    })
  ]
});
