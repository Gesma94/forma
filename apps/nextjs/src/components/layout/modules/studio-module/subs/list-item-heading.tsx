import { tv } from 'tailwind-variants';
import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';
import { BasePortableText, type TBasePortableTextValue } from '@/ui/portable-text/base-portable-text';

type TListItemHeadingProps = {
  value: string | TBasePortableTextValue;
};

export function ListItemHeading({ value }: TListItemHeadingProps) {
  const { container, text } = style();
  return (
    <div className={container()}>
      {typeof value === 'string' ? (
        <h2 className={text()}>{value}</h2>
      ) : (
        <BasePortableText
          value={value}
          components={{
            types: {},
            block: {
              normal: ({ children }) => <p className={text()}>{children}</p>
            },
            marks: {
              em: PortableTextEmComponent,
              strong: PortableTextStrongComponent
            }
          }}
        />
      )}
    </div>
  );
}

const style = tv({
  slots: {
    container: 'flex flex-col gap-4 max-w-5xl',
    text: 'text-primary leading-10 text-2xl'
  }
});
