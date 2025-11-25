import { PortableText } from '@portabletext/react';
import type { HeroModuleDocumentType } from 'types/generated/sanity-types-generated';
import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';

type TProps = {
  value: HeroModuleDocumentType['heading'];
};

export function HeroModuleSubHeadingPortableText({ value }: TProps) {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => <h1 className='prose-xl font-inter text-left text-primary-text'>{children}</h1>
        },
        marks: {
          em: PortableTextEmComponent,
          strong: PortableTextStrongComponent
        }
      }}
    />
  );
}
