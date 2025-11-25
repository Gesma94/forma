import { PortableText } from '@portabletext/react';
import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';
import type { TBasePortableTextValue } from '@/ui/portable-text/base-portable-text';

type TProps = {
  value: TBasePortableTextValue;
};

export function Subheading({ value }: TProps) {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => <p className='prose-xl mb-4'>{children}</p>
        },
        marks: {
          em: PortableTextEmComponent,
          strong: PortableTextStrongComponent
        }
      }}
    />
  );
}
