import { MODULE_VARIANTS } from '@forma/common';
import { tv, type VariantProps } from 'tailwind-variants';
import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';
import { BasePortableText, type TBasePortableTextConsumerProps } from '@/ui/portable-text/base-portable-text';

type TProps = TBasePortableTextConsumerProps & VariantProps<typeof style>;

export function Header({ value, variant = 'on-bg' }: TProps) {
  return (
    <BasePortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => <h2 className={style({ variant })}>{children}</h2>
        },
        marks: {
          em: PortableTextEmComponent,
          strong: PortableTextStrongComponent
        }
      }}
    />
  );
}

const style = tv({
  base: 'text-5xl md:text-8xl font-bold',
  variants: {
    variant: {
      [MODULE_VARIANTS.ON_BG]: 'text-primary',
      [MODULE_VARIANTS.ON_PRIMARY]: 'text-primary-text'
    }
  }
});
