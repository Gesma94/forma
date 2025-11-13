import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';
import { BasePortableText, type TBasePortableTextConsumerProps } from '@/ui/portable-text/base-portable-text';

export function StudioModuleSubHeading({ value }: TBasePortableTextConsumerProps) {
  return (
    <BasePortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => <h3 className='text-4xl leading-12 text-primary'>{children}</h3>
        },
        marks: {
          em: PortableTextEmComponent,
          strong: PortableTextStrongComponent
        }
      }}
    />
  );
}
