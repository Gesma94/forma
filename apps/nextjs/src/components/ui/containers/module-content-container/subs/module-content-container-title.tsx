import { MODULE_VARIANTS } from '@forma/common';
import { tv, type VariantProps } from 'tailwind-variants';
import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';
import { BasePortableText, type TBasePortableTextConsumerProps } from '@/ui/portable-text/base-portable-text';

type TProps = TBasePortableTextConsumerProps & VariantProps<typeof style>;

export function ModuleContentContainerTitle({ value, variant = 'on-bg', alignment = 'center' }: TProps) {
  return (
    <BasePortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => <h2 className={style({ alignment, variant })}>{children}</h2>
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
  base: 'text-5xl md:text-8xl font-bold text-center',
  variants: {
    variant: {
      [MODULE_VARIANTS.ON_BG]: 'text-primary',
      [MODULE_VARIANTS.ON_PRIMARY]: 'text-primary-text'
    },
    alignment: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right'
    }
  }
});
