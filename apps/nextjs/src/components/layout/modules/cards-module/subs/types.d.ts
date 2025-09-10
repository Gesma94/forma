import { TBasePortableTextValue } from '@/ui/portable-text/base-portable-text';
import { CardObjectType } from 'types/generated/sanity-types-generated';

export interface ICard {
  key: string;
  title: string;
  description: TBasePortableTextValue;
  image: CardObjectType['image'];
  imageUrl: string;
}
