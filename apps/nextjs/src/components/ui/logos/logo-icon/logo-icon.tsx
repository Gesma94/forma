import { tv, type VariantProps } from 'tailwind-variants';

type Props = Required<VariantProps<typeof style>>;

export function LogoIcon({ variant }: Props) {
  const { path: pathStyle, svg: svgStyle } = style({ variant });

  return (
    <svg className={svgStyle()} viewBox='0 0 15 27' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <title>Forma Logo</title>
      <path
        d='M0 13.5024C0 20.9602 6.11791 27 13.6614 27C14.1108 27 14.5602 26.9761 15 26.9332V0.0668435C14.5602 0.0238727 14.1157 0 13.6614 0C6.11791 0 0 6.04456 0 13.5024Z'
        className={pathStyle()}
      />
    </svg>
  );
}

const style = tv({
  slots: {
    svg: 'h-full w-auto',
    path: ''
  },
  variants: {
    variant: {
      brand: {
        path: 'fill-primary'
      },
      'on-brand': {
        path: 'fill-primary-text'
      }
    }
  }
});
