import { TBasePortableTextValue } from '@/ui/portable-text/base-portable-text';
import { IFormImageAsset } from 'common/utils/get-forma-image';

export interface ICard {
  key: string;
  title: string;
  description: TBasePortableTextValue;
  imageData: IFormImageAsset;
}
