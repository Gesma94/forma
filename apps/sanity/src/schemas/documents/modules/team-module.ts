import { UsersIcon } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineModuleVariantField, defineRichEditorField } from '../../../fields';

export const teamModuleDocumentType = defineType({
  type: 'document',
  title: 'Team Module',
  name: DOCUMENT_SCHEMA_TYPES.teamModule,
  icon: UsersIcon,
  preview: {
    select: {
      title: 'heading',
      teamMembers: 'teamMembers'
    },
    prepare: ({ title, teamMembers }) => ({
      title: textBlockToPlainText(title),
      subtitle: `Contained ${teamMembers.length} team member(s)`
    })
  },
  fields: [
    defineModuleVariantField(),
    defineRichEditorField({
      name: 'heading',
      title: 'Heading',
      validation: rule => rule.required()
    }),
    defineRichEditorField({
      name: 'subHeading',
      title: 'Subheading',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [defineArrayMember({ type: OBJECT_SCHEMA_TYPES.teamMember })],
      validation: rule => rule.required().min(1)
    })
  ]
});
