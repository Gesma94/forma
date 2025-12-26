import { TBasePortableTextValue } from '@/ui/portable-text/base-portable-text';
import { TFormaMediaUnwrapped } from 'types/forma-media';

export interface ICard {
  key: string;
  title: string;
  formaMedia: TFormaMediaUnwrapped;
  description: TBasePortableTextValue;
}
