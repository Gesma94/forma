import type { Icon } from '@phosphor-icons/react';
import { Button as AriaButton, type ButtonProps } from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';
import { getAriaCustomClassName } from '@/utils/style';

type TProps = VariantProps<typeof style> &
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
    <AriaButton className={getAriaCustomClassName(className, style({ variant, surface, size, isDisabled }))} {...rest}>
      <Icon className='size-1/2' />
    </AriaButton>
  );
}
const style = tv({
  base: 'rounded-full flex items-center  justify-center',
  variants: {
    size: {
      small: 'size-8',
      medium: 'size-10',
      large: 'size-12'
    },
    variant: {
      primary: ''
    },
    surface: {
      bg: ''
    },
    isDisabled: {
      true: '',
      false: 'cursor-pointer'
    }
  },
  compoundVariants: [
    // Disabled states
    {
      variant: 'primary',
      surface: 'bg',
      isDisabled: true,
      className: 'bg-primary-disabled text-primary-text-disabled'
    },

    // Default primary states
    {
      variant: 'primary',
      surface: 'bg',
      isDisabled: false,
      isLoading: false,
      className: `
                bg-primary text-primary-text
                hover:bg-primary-hover
                active:bg-primary-active
                focus-visible:outline-bg focus-visible:outline focus-visible:outline-offset-4
                `
    }
  ]
});
