import type { ValueOf } from 'type-fest';

export const MODULE_VARIANTS = {
  ON_BG: 'on-bg',
  ON_PRIMARY: 'on-primary'
} as const;

export type TModuleVariants = ValueOf<typeof MODULE_VARIANTS>;
