import { tv, type VariantProps } from 'tailwind-variants';

export const buttonStyle = tv({
  base: 'flex items-center font-normal justify-center transition-colors duration-300',
  variants: {
    size: {
      small: 'gap-2 h-8 px-2 text-xs rounded',
      default: 'gap-2 h-10 px-4 text-sm rounded-md',
      large: 'gap-3 h-12 px-8 text-lg rounded-lg'
    },
    variant: {
      primary: '',
      ghost:
        'relative after:absolute after:h-0.5 after:bg-primary-text after:bottom-1 after:transition-opacity after:duration-300',
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
      false: 'cursor-pointer'
    },
    isLoading: {
      true: '',
      false: ''
    }
  },
  compoundVariants: [
    // underline ghost per size
    {
      size: 'small',
      variant: 'ghost',
      class: 'after:w-[calc(100%_-_1rem)]'
    },
    {
      size: 'default',
      variant: 'ghost',
      class: 'after:w-[calc(100%_-_2rem)]'
    },
    {
      size: 'large',
      variant: 'ghost',
      class: 'after:w-[calc(100%_-_4rem)]'
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

    // Default primary states
    {
      variant: 'primary',
      surface: 'bg',
      isDisabled: false,
      isLoading: false,
      className: `
                border-primary
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
                border-bg
                bg-bg text-primary
                hover:bg-bg-hover
                active:bg-bg-active
                focus-visible:outline-bg focus-visible:outline focus-visible:outline-offset-4
                `
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
                focus-visible:outline-bg focus-visible:outline focus-visible:outline-offset-4
                `
    },

    // Default ghost states
    {
      variant: 'ghost',
      surface: 'primary',
      isDisabled: false,
      isLoading: false,
      className: `
                border-primary
                bg-primary text-primary-text
                hover:bg-primary-hover hover:after:opacity-0
                active:bg-primary-active
                focus-visible:outline-bg focus-visible:outline focus-visible:outline-offset-4
                `
    },
    {
      variant: 'ghost',
      surface: 'bg',
      isDisabled: false,
      isLoading: false,
      className: `
                border-bg
                bg-bg text-primary
                hover:bg-bg-hover hover:after:opacity-0
                active:bg-bg-active
                focus-visible:outline-primary focus-visible:outline focus-visible:outline-offset-4
                `
    }
  ]
});

export type TButtonStyleProps = VariantProps<typeof buttonStyle>;
