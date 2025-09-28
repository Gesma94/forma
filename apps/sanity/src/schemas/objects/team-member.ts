import { UserLockIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { OBJECT_SCHEMA_TYPES } from '../../common/constants';
import { defineImageField } from '../../fields';

export const teamMemberObjectType = defineType({
  type: 'object',
  icon: UserLockIcon,
  name: OBJECT_SCHEMA_TYPES.teamMember,
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'role'
    },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle
    })
  },
  fields: [
    defineField({
      type: 'string',
      title: 'Full Name',
      name: 'fullName',
      validation: rule => rule.required()
    }),
    defineField({
      type: 'string',
      title: 'Role',
      name: 'role',
      validation: rule => rule.required()
    }),
    defineImageField({
      name: 'image',
      title: 'Image',
      validation: rule => rule.required(),
      skipAltText: true
    })
  ]
});
