import { tv } from 'tailwind-variants';
import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';
import { BasePortableText, type TBasePortableTextConsumerProps } from '@/ui/portable-text/base-portable-text';

export function Title({ value }: TBasePortableTextConsumerProps) {
  const { container, paragraph } = style({});
  return (
    <div className={container()}>
      <BasePortableText
        value={value}
        components={{
          types: {},
          block: {
            normal: ({ children }) => <h3 className={paragraph()}>{children}</h3>
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
    paragraph: 'text-6xl md:text-7xl text-bg font-bold text-center'
  }
});
