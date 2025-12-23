import { RectangleHorizontalIcon } from 'lucide-react';
import { defineType } from 'sanity';
import { OBJECT_SCHEMA_TYPES } from '../../common/constants';
import { defineFormaMediaField } from '../../fields/media';

export const imagePairObjectType = defineType({
  type: 'object',
  icon: RectangleHorizontalIcon,
  name: OBJECT_SCHEMA_TYPES.imagePair,
  fields: [
    defineFormaMediaField({
      name: 'leftMedia',
      title: 'Left media',
      validation: rule => rule.required()
    }),
    defineFormaMediaField({
      name: 'rightMedia',
      title: 'Right media',
      validation: rule => rule.required()
    })
  ]
});
