import type { Icon } from '@phosphor-icons/react';
import { Button as AriaButton, type ButtonProps } from 'react-aria-components';
import { getAriaCustomClassName } from '@/utils/style';
import { iconButtonStyle, TIconButtonStyle } from '@/styles/icon-button';

type TProps = TIconButtonStyle &
  Omit<ButtonProps, 'children'> & {
    icon: Icon;
  };

export function IconButton({
  icon,
  isDisabled = false,
  size = 'medium',
  surface = 'bg',
  variant = 'primary',
  className,
  ...rest
}: TProps) {
  const Icon = icon;

  return (
    <AriaButton className={(value) =>  iconButtonStyle({ variant, surface, size, isDisabled, className: getAriaCustomClassName(value, className) })} {...rest}>
      <Icon className='size-1/2' />
    </AriaButton>
  );
}