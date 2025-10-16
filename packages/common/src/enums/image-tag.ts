import type { ValueOf } from 'type-fest';

export const IMAGE_TAG = {
  ARCHITECTURAL_STILLS: 'architectural-stills',
  VIDEO_ANIMATIONS: 'video-animations',
  VR_360: 'vr-360'
} as const;

export type TImageTag = ValueOf<typeof IMAGE_TAG>;
