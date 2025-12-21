import { ELEMENT_X_POSITION, type TElementXPosition } from '@forma/common';
import { tv } from 'tailwind-variants';
import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';
import { BasePortableText, type TBasePortableTextConsumerProps } from '@/ui/portable-text/base-portable-text';

type TProps = TBasePortableTextConsumerProps & {
  imagePosition: TElementXPosition;
};

export function Heading({ value, imagePosition }: TProps) {
  return (
    <BasePortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => <h3 className={styleTv({ imagePosition })}>{children}</h3>
        },
        marks: {
          em: PortableTextEmComponent,
          strong: PortableTextStrongComponent
        }
      }}
    />
  );
}

const styleTv = tv({
  base: 'text-5xl leading-14 text-primary',
  variants: {
    imagePosition: {
      [ELEMENT_X_POSITION.LEFT]: 'text-left',
      [ELEMENT_X_POSITION.RIGHT]: 'text-right'
    }
  }
});
