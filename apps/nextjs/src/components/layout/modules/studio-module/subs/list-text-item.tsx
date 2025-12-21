import { ELEMENT_X_POSITION, type TElementXPosition } from '@forma/common';
import { tv } from 'tailwind-variants';
import type { TBasePortableTextValue } from '@/ui/portable-text/base-portable-text';
import { ListItemCaption } from './list-item-caption';
import { ListItemHeading } from './list-item-heading';

export type TListTextItemProps = {
  heading: TBasePortableTextValue | string;
  caption: TBasePortableTextValue | string;
  imagePosition: TElementXPosition;
};

export function ListTextItem({ caption, heading, imagePosition }: TListTextItemProps) {
  return (
    <div className={styleTv({ imagePosition })}>
      <ListItemHeading value={heading} />
      <ListItemCaption value={caption} />
    </div>
  );
}

const styleTv = tv({
  base: 'flex flex-col gap-2',
  variants: {
    imagePosition: {
      [ELEMENT_X_POSITION.LEFT]: 'border-l-4 pl-8 border-l-primary text-left',
      [ELEMENT_X_POSITION.RIGHT]: 'border-r-4 pr-8 border-r-primary text-right'
    }
  }
});
