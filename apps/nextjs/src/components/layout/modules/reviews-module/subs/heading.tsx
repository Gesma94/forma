import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';
import { BasePortableText, type TBasePortableTextValue } from '@/ui/portable-text/base-portable-text';

type TProps = {
  value: string | TBasePortableTextValue;
};

export function Heading({ value }: TProps) {
  return typeof value === 'string' ? (
    <h2 className='text-6xl leading-12 font-bold text-left text-primary-text'>{value}</h2>
  ) : (
    <BasePortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => (
            <h2 className='text-6xl leading-12 font-bold text-left text-primary-text'>{children}</h2>
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
