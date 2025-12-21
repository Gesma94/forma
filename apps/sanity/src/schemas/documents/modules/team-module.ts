import { ELEMENT_X_POSITION } from '@forma/common';
import { UsersIcon } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, OBJECT_SCHEMA_TYPES } from '../../../common/constants';
import { textBlockToPlainText } from '../../../common/utils';
import { defineModuleVariantField, defineRichEditorField } from '../../../fields';
import { defineSpacingField } from '../../../fields/spacing';

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
    defineSpacingField(),
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
      type: 'string',
      name: 'teamMembersPosition',
      description: 'Defines where the members images are positioned',
      title: 'Team Members Position',
      validation: rule => rule.required(),
      initialValue: ELEMENT_X_POSITION.RIGHT,
      options: {
        layout: 'radio',
        list: [
          { title: 'Left', value: ELEMENT_X_POSITION.LEFT },
          { title: 'Right', value: ELEMENT_X_POSITION.RIGHT }
        ]
      }
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
