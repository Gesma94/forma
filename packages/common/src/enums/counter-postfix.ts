import type { ValueOf } from 'type-fest';

export const COUNTER_POSTFIX = {
  plus: '+',
  percent: '%'
} as const;

export type TCounterPostfix = ValueOf<typeof COUNTER_POSTFIX>;
