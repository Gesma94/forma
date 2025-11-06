import { tv, type VariantProps } from 'tailwind-variants';

export const iconButtonStyle = tv({
  base: 'rounded-full flex items-center justify-center transition-colors duration-300',
  variants: {
    size: {
      extrasmall: 'size-6',
      small: 'size-8',
      medium: 'size-10',
      large: 'size-12'
    },
    variant: {
      primary: '',
      outline: ''
    },
    surface: {
      bg: '',
      primary: ''
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
    {
      variant: 'primary',
      surface: 'primary',
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
    },
    {
      variant: 'primary',
      surface: 'primary',
      isDisabled: false,
      isLoading: false,
      className: `
                bg-bg text-primary
                hover:bg-bg-hover
                active:bg-bg-active
                focus-visible:outline-bg focus-visible:outline focus-visible:outline-offset-4
                `
    },
    {
      variant: 'outline',
      surface: 'primary',
      isDisabled: false,
      isLoading: false,
      className: `
                border border-bg text-bg bg-primary
                hover:bg-primary-hover
                active:bg-primary-active
                focus-visible:outline-bg focus-visible:outline focus-visible:outline-offset-4
                `
    }
  ]
});

export type TIconButtonStyle = VariantProps<typeof iconButtonStyle>;
