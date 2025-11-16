import type { TBasePortableTextValue } from '@/ui/portable-text/base-portable-text';
import { ListItemCaption } from './list-item-caption';
import { ListItemHeading } from './list-item-heading';

export type TListTextItemProps = {
  heading: TBasePortableTextValue | string;
  caption: TBasePortableTextValue | string;
};

export function ListTextItem({ caption, heading }: TListTextItemProps) {
  return (
    <div className='border-l-primary border-l-4 pl-8 flex flex-col gap-2'>
      <ListItemHeading value={heading} />
      <ListItemCaption value={caption} />
    </div>
  );
}
