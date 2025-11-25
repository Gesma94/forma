import { PortableText } from '@portabletext/react';
import type { HeroModuleDocumentType } from 'types/generated/sanity-types-generated';
import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';

type TProps = {
  value: HeroModuleDocumentType['heading'] | string;
};

export function Header({ value }: TProps) {
  return typeof value === 'string' ? (
    <h1 className='text-left text-primary-text text-7xl sm:text-8xl'>{value}</h1>
  ) : (
    <PortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => <h1 className='text-left text-primary-text text-7xl sm:text-8xl'>{children}</h1>
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
