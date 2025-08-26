import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';
import { BasePortableText, type TBasePortableTextConsumerProps } from '@/ui/portable-text/base-portable-text';

export function CounterContent({ value }: TBasePortableTextConsumerProps) {
  return (
    <BasePortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => <p className='prose-xl font-base text-bg-text font-light'>{children}</p>
        },
        marks: {
          em: PortableTextEmComponent,
          strong: PortableTextStrongComponent
        }
      }}
    />
  );
}
