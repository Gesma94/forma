import Link from 'next/link';
import type { ComponentProps, PropsWithChildren } from 'react';
import { buttonStyle, type TButtonStyleProps } from '@/styles/button';

type TProps = ComponentProps<typeof Link> & TButtonStyleProps & PropsWithChildren;

export function LinkButton({ size, surface, variant, isDisabled, isFullWidth, isLoading, className, ...rest }: TProps) {
  return (
    <Link
      className={buttonStyle({ size, surface, variant, isDisabled, isFullWidth, isLoading, className })}
      {...rest}
    />
  );
}
