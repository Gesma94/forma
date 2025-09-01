'use client';

import { Button as AriaButton, type ButtonProps } from 'react-aria-components';
import { buttonStyle, type TButtonStyleProps } from '@/styles/button';
import { getAriaCustomClassName } from '@/utils/style';

export function Button({
  className,
  variant,
  surface,
  size = 'default',
  isDisabled,
  isFullWidth,
  isLoading,
  ...rest
}: ButtonProps & TButtonStyleProps) {
  return (
    <AriaButton
      className={value =>
        buttonStyle({
          variant,
          surface,
          size,
          isDisabled,
          isFullWidth,
          isLoading,
          className: getAriaCustomClassName(value, className)
        })
      }
      {...rest}
    />
  );
}
