import { IMAGE_TAG, type TImageTag } from '@forma/common';

export function getFilterTagLabel(tag: TImageTag) {
  switch (tag) {
    case IMAGE_TAG.ARCHITECTURAL_STILLS:
      return 'Architectural Stills';
    case IMAGE_TAG.VIDEO_ANIMATIONS:
      return 'Video & Animations';
    case IMAGE_TAG.VR_360:
      return '360 VR';
  }
}
