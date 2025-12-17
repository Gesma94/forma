import { tv } from 'tailwind-variants';
import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';
import { BasePortableText, type TBasePortableTextValue } from '@/ui/portable-text/base-portable-text';

type TListItemCaptionProps = {
  value: string | TBasePortableTextValue;
};

export function ListItemCaption({ value }: TListItemCaptionProps) {
  const { container, paragraph } = style();
  return (
    <div className={container()}>
      {typeof value === 'string' ? (
        <p className={paragraph()}>{value}</p>
      ) : (
        <BasePortableText
          value={value}
          components={{
            types: {},
            block: {
              normal: ({ children }) => <p className={paragraph()}>{children}</p>
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
    paragraph: 'prose-xl md:prose-xl prose-p:my-0'
  }
});
