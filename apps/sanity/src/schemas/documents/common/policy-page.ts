import { TextInitialIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { defineRichEditorField } from '../../../fields';

export const policyPageDocumentType = defineType({
  type: 'document',
  title: 'Policy Page',
  name: DOCUMENT_SCHEMA_TYPES.policyPage,
  icon: TextInitialIcon,
  fields: [
    defineField({
      name: 'pageMetadata',
      title: 'Page Metadata',
      type: OBJECT_SCHEMA_TYPES.pageMetadata,
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      name: 'heading',
      title: 'Heading',
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'content',
      title: 'Content',
      allowColorMarkDecorator: true,
      allowBulletPoint: true,
      allowOrderedPoint: true,
      allowH1: true,
      allowLink: true,
      allowH2: true,
      validation: rule => rule.required()
    })
  ]
});
