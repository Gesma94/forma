import { PortableText } from '@portabletext/react';
import type { HeroModuleDocumentType } from 'types/generated/sanity-types-generated';
import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';
import { TBasePortableTextConsumerProps } from '@/ui/portable-text/base-portable-text';

export function BookModuleHeading({ value }: TBasePortableTextConsumerProps) {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => (
            <h1 className='font-accent text-left text-primary-text text-7xl leading-16 sm:leading-none sm:text-8xl 2xl:text-9xl'>
              {children}
            </h1>
          )
        },
        marks: {
          em: PortableTextEmComponent,
          strong: PortableTextStrongComponent,
          color: ({ children }) => <span className='text-primary font-semibold'>{children}</span>
        }
      }}
    />
  );
}
