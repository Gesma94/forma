import { tv } from 'tailwind-variants';
import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';
import { BasePortableText, type TBasePortableTextConsumerProps } from '@/ui/portable-text/base-portable-text';

export function StepDescription({ value }: TBasePortableTextConsumerProps) {
  const { container, paragraph } = style();

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
    container: 'flex flex-col gap-2 max-w-5xl mx-auto',
    paragraph: 'prose-xl prose-p:my-0'
  }
});
