import { MODULE_VARIANTS, type TModuleVariants } from '@forma/common';
import { tv } from 'tailwind-variants';
import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';
import { BasePortableText, type TBasePortableTextConsumerProps } from '@/ui/portable-text/base-portable-text';

type TProps = TBasePortableTextConsumerProps & {
  variant: TModuleVariants;
};

export function Heading({ value, variant }: TProps) {
  return (
    <BasePortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => <h3 className={styleTv({ variant })}>{children}</h3>
        },
        marks: {
          em: PortableTextEmComponent,
          strong: PortableTextStrongComponent
        }
      }}
    />
  );
}

const styleTv = tv({
  base: 'uppercase text-7xl font-bold 2xl:mt-16',
  variants: {
    variant: {
      [MODULE_VARIANTS.ON_PRIMARY]: 'text-primary-text',
      [MODULE_VARIANTS.ON_BG]: 'text-primary'
    }
  }
});
