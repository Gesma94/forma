import { tv } from 'tailwind-variants';

export const topbarTv = tv({
  slots: {
    container: 'w-full h-20 relative',
    link: 'text-lg hover:underline underline-offset-4',
    servicesContainer: 'hidden lg:block absolute left-0 top-0 pt-24 pb-4 w-full bg-primary'
  },
  variants: {
    variant: {
      solid: { container: 'bg-primary', link: 'text-primary-text' },
      solidWhite: { container: 'bg-bg', link: 'text-bg-text' },
      floating: { container: 'absolute top-0 z-50', link: 'text-primary-text' }
    }
  }
});
