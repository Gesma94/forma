import type { HTMLProps } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import type { SetRequired } from 'type-fest';
import { PortableTextEmComponent, PortableTextStrongComponent } from './base-components';
import { BasePortableText, type TBasePortableTextConsumerProps } from './base-portable-text';

export type TParagraphPortableTextProps = SetRequired<VariantProps<typeof style>, 'surface'> &
  TBasePortableTextConsumerProps &
  Pick<HTMLProps<typeof HTMLDivElement>, 'className'>;

export function ParagraphPortableText({ value, surface, className }: TParagraphPortableTextProps) {
  const { container, paragraph } = style({ surface });
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
    container: 'flex flex-col gap-4',
    paragraph: 'prose-xl md:prose-2xl prose-p:my-0 font-base font-light'
  },
  variants: {
    surface: {
      bg: {
        paragraph: 'text-bg-text'
      },
      primary: {
        paragraph: 'text-primary-text'
      }
    }
  }
});
