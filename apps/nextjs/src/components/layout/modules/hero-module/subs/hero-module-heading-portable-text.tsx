import { PortableText } from '@portabletext/react';
import type { HeroModuleDocumentType } from 'types/generated/sanity-types-generated';
import {
  PortableTextEmComponent,
  PortableTextPrimaryColorComponent,
  PortableTextStrongComponent
} from '@/ui/portable-text/base-components';

type TProps = {
  value: HeroModuleDocumentType['heading'];
};

export function HeroModuleHeadingPortableText({ value }: TProps) {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => (
            <h1 className='font-accent text-center text-primary-text text-5xl sm:text-8xl 2xl:text-9xl'>{children}</h1>
          )
        },
        marks: {
          em: PortableTextEmComponent,
          strong: PortableTextStrongComponent,
          color: PortableTextPrimaryColorComponent
        }
      }}
    />
  );
}
