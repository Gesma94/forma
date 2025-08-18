import { tv } from 'tailwind-variants';

export const buttonStyle = tv({
  base: 'flex font-accent items-center font-medium justify-center transition-colors duration-300',
  variants: {
    size: {
      small: 'gap-2 h-8 px-2 text-xs rounded',
      default: 'gap-2 h-10 px-4 text-sm rounded-md',
      large: 'gap-3 h-12 px-8 text-lg rounded-lg'
    },
    variant: {
      primary: '',
      ghost: '',
      outline: 'border'
    },
    surface: {
      bg: '',
      primary: ''
    },
    isFullWidth: {
      true: 'w-full',
      false: ''
    },
    isDisabled: {
      true: '',
      false: ''
    },
    isLoading: {
      true: '',
      false: ''
    }
  },
  compoundVariants: [
    // Size states
    {
      variant: 'primary',
      size: ['default', 'large'],
      className: 'font-semibold'
    },

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
      className: 'bg-bg-disabled text-bg-text-disabled'
    },

    // Default outline states
    {
      variant: 'outline',
      surface: 'primary',
      isDisabled: false,
      isLoading: false,
      className: `
                border-bg 
                bg-primary text-primary-text
                hover:bg-primary-hover
                active:bg-primary-active
                focus:outline-bg focus:outline focus:outline-offset-4
                `
    }
  ]
});
