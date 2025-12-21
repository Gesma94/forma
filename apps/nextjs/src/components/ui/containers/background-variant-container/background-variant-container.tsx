import { MODULE_VARIANTS, type TModuleVariants } from '@forma/common';
import type { PropsWithChildren } from 'react';
import { tv } from 'tailwind-variants';

type TProps = {
  variant: TModuleVariants;
};

export function BackgroundVariantContainer({ children, variant }: PropsWithChildren<TProps>) {
  return <div className={styleTv({ variant })}>{children}</div>;
}

const styleTv = tv({
  base: '',
  variants: {
    variant: {
      [MODULE_VARIANTS.ON_BG]: 'bg-bg  text-bg-text',
      [MODULE_VARIANTS.ON_PRIMARY]: 'bg-primary text-primary-text'
    }
  }
});
