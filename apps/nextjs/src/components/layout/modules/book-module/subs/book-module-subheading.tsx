import { PortableText } from '@portabletext/react';
import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';
import type { TBasePortableTextConsumerProps } from '@/ui/portable-text/base-portable-text';

export function BookModuleSubHeading({ value }: TBasePortableTextConsumerProps) {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => (
            <h1 className='prose-xl font-inter text-left text-primary-text md:prose-xl 2xl:prose-2xl'>{children}</h1>
          )
        },
        marks: {
          em: PortableTextEmComponent,
          strong: PortableTextStrongComponent
        }
      }}
    />
  );
}
