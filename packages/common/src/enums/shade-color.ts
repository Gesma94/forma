import type { ValueOf } from 'type-fest';

export const SHADE_COLOR = {
  LIGHT: 'light',
  DARK: 'dark'
} as const;

export type TShadeColor = ValueOf<typeof SHADE_COLOR>;
