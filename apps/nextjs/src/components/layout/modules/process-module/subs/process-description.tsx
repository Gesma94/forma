import { MODULE_VARIANTS, type TModuleVariants } from '@forma/common';
import { tv } from 'tailwind-variants';
import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';
import { BasePortableText, type TBasePortableTextConsumerProps } from '@/ui/portable-text/base-portable-text';

interface ICardDescriptionProps extends TBasePortableTextConsumerProps {
  variant: TModuleVariants;
}

export function ProcessDescription({ value, variant }: ICardDescriptionProps) {
  const { container, paragraph } = style({ variant });

  return (
    <div className={container()}>
      <BasePortableText
        value={value}
        components={{
          block: {
            normal: ({ children }) => <p className={paragraph()}>{children}</p>
          },
          marks: {
            em: PortableTextEmComponent,
            strong: PortableTextStrongComponent
          }
        }}
      />
    </div>
  );
}

const style = tv({
  slots: {
    container: 'flex flex-col gap-2 max-w-5xl',
    paragraph: 'prose-xl prose-p:my-0'
  },
  variants: {
    variant: {
      [MODULE_VARIANTS.ON_BG]: {
        paragraph: 'text-bg-text'
      },
      [MODULE_VARIANTS.ON_PRIMARY]: {
        paragraph: 'text-primary-text'
      }
    }
  }
});
