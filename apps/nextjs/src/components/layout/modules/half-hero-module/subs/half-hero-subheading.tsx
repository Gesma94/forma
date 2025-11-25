import { PortableText } from '@portabletext/react';
import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';
import type { TBasePortableTextConsumerProps } from '@/ui/portable-text/base-portable-text';

export function HalfHeroSubHeading({ value }: TBasePortableTextConsumerProps) {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => <h1 className='prose-lg font-inter text-left text-primary-text'>{children}</h1>
        },
        marks: {
          em: PortableTextEmComponent,
          strong: PortableTextStrongComponent
        }
      }}
    />
  );
}
