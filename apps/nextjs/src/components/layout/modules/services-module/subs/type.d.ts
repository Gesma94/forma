import { TBasePortableTextValue } from '@/ui/portable-text/base-portable-text';
import { SanityFileAsset } from 'types/generated/sanity-types-generated';

export type TServiceCard = {
  title: string;
  content: TBasePortableTextValue;
  video: SanityFileAsset;
};
