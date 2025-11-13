import { MODULE_VARIANTS } from '@forma/common';
import type { HTMLProps } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { PortableTextEmComponent, PortableTextStrongComponent } from './base-components';
import { BasePortableText, type TBasePortableTextConsumerProps } from './base-portable-text';

export type TParagraphPortableTextProps = VariantProps<typeof style> &
  TBasePortableTextConsumerProps &
  Pick<HTMLProps<typeof HTMLDivElement>, 'className'>;

export function ParagraphPortableText({ value, variant = 'on-bg', className }: TParagraphPortableTextProps) {
  const { container, paragraph } = style({ variant });
  return (
    <div className={container({ className })}>
      <BasePortableText
        value={value}
        components={{
          types: {},
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
    container: 'flex flex-col gap-4 max-w-5xl mx-auto',
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
