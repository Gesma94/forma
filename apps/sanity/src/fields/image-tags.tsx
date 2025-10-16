import { IMAGE_TAG } from '@forma/common';
import { defineField } from 'sanity';

type TProps = {
  name?: string;
  title?: string;
};

export function defineImageTagsField({
  name = 'imageTags',
  title = 'Image Tags'
}: TProps = {}): ReturnType<typeof defineField> {
  return defineField({
    title,
    name,
    type: 'array',
    of: [{ type: 'string' }],
    validation: rule => rule.required(),
    options: {
      list: [
        { title: 'Architectural Stills', value: IMAGE_TAG.ARCHITECTURAL_STILLS },
        { title: 'Video & Animations', value: IMAGE_TAG.VIDEO_ANIMATIONS },
        { title: '360 VR', value: IMAGE_TAG.VR_360 }
      ]
    }
  });
}
