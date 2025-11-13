import type { Icon } from '@phosphor-icons/react';
import { FlowArrowIcon, PaperPlaneTiltIcon, SlideshowIcon } from '@phosphor-icons/react/dist/ssr';

export const topbarCommonNavLinks: Array<{ label: string; url: string; icon: Icon }> = [
  { label: 'Contact us', url: '/contact-us', icon: PaperPlaneTiltIcon  },
  { label: 'Process', url: '/process', icon: FlowArrowIcon },
  { label: 'Gallery', url: '/gallery', icon: SlideshowIcon },
];
