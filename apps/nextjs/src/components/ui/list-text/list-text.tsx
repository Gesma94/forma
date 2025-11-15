import { ListTextItem, type TListTextItemProps } from './subs/list-text-item';

export type TListTextProps = {
  items: (TListTextItemProps & { key: string })[];
};

export function ListText({ items }: TListTextProps) {
  return (
    <div className='flex gap-8 my-auto flex-col xl:py-image-side-spacing'>
      {items.map(item => (
        <ListTextItem key={item.key} caption={item.caption} heading={item.heading} />
      ))}
    </div>
  );
}
