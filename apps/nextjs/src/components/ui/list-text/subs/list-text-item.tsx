import type { TBasePortableTextValue } from '@/ui/portable-text/base-portable-text';
import { Caption } from './caption';
import { Heading } from './heading';

export type TListTextItemProps = {
  heading: TBasePortableTextValue | string;
  caption: TBasePortableTextValue | string;
};

export function ListTextItem({ caption, heading }: TListTextItemProps) {
  return (
    <div className='border-l-primary border-l-4 pl-8'>
      <div className='mb-4'>
        <Heading value={heading} />
      </div>
      <Caption value={caption} />
    </div>
  );
}
