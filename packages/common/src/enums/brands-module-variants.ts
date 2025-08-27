import type { ValueOf } from 'type-fest';

export const BRANDS_MODULE_VARIANTS = {
  ON_BG: 'on-bg',
  ON_PRIMARY: 'on-primary'
} as const;

export type TBrandsModuleVariants = ValueOf<typeof BRANDS_MODULE_VARIANTS>;
