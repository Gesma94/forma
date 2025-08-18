'use client';

import { Button as AriaButton, type ButtonProps } from 'react-aria-components';
import { buttonStyle } from '@/styles/button';
import { getAriaCustomClassName } from '@/utils/style';

export function Button({ className, ...rest }: ButtonProps) {
  return <AriaButton className={getAriaCustomClassName(className, buttonStyle())} {...rest} />;
}
