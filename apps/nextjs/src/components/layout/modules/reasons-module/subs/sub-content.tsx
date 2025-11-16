import type { HTMLProps } from 'react';
import { tv } from 'tailwind-variants';
import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';
import { BasePortableText, type TBasePortableTextConsumerProps } from '@/ui/portable-text/base-portable-text';

export type TParagraphPortableTextProps = TBasePortableTextConsumerProps &
  Pick<HTMLProps<typeof HTMLDivElement>, 'className'>;

export function SubContent({ value, className }: TParagraphPortableTextProps) {
  const { container, paragraph } = style();
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
    paragraph: 'prose-xl md:prose-xl prose-p:my-0'
  }
});
