'use client'

import { getAriaCustomClassName } from '@/utils/style';
import { Button as AriaButton, ButtonProps } from 'react-aria-components';
import { buttonStyle } from '@/styles/button';

export function Button({ className, ...rest}: ButtonProps) {
    return <AriaButton className={getAriaCustomClassName(className, buttonStyle())} {...rest} />;
}
