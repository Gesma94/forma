import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';
import { BasePortableText, type TBasePortableTextConsumerProps } from '@/ui/portable-text/base-portable-text';

export function ModuleContentContainerTitle({ value }: TBasePortableTextConsumerProps) {
  return (
    <BasePortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => <h2 className='text-8xl font-accent text-center'>{children}</h2>
        },
        marks: {
          em: PortableTextEmComponent,
          strong: PortableTextStrongComponent
        }
      }}
    />
  );
}
