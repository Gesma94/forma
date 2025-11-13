import { tv } from 'tailwind-variants';
import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';
import { BasePortableText, type TBasePortableTextConsumerProps } from '@/ui/portable-text/base-portable-text';

export function Subtitle({ value }: TBasePortableTextConsumerProps) {
  const { container, paragraph } = style({});
  return (
    <div className={container()}>
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
    container: 'flex flex-col gap-4 max-w-xl mx-auto',
    paragraph: 'prose-xl md:prose-2xl prose-p:my-0 text-center text-primary-text px-4 md:px-8'
  }
});
