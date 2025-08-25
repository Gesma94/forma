import type { Icon } from '@phosphor-icons/react';
import { DesktopIcon, FlowArrowIcon, SlideshowIcon } from '@phosphor-icons/react/dist/ssr';

export const topbarCommonNavLinks: Array<{ label: string; url: string; icon: Icon }> = [
  { label: 'Process', url: '/process', icon: FlowArrowIcon },
  { label: 'Studio', url: '/studio', icon: DesktopIcon },
  { label: 'Gallery', url: '/gallery', icon: SlideshowIcon }
];
