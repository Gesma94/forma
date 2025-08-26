import { PortableText, type PortableTextBlock, type PortableTextReactComponents } from '@portabletext/react';
import type { SetOptional } from 'type-fest';

type TPortableTextBlockOptionalChildren = SetOptional<PortableTextBlock, 'children'>;

export type TBasePortableTextValue = TPortableTextBlockOptionalChildren | TPortableTextBlockOptionalChildren[];
export type TBasePortableTextConsumerProps = {
  value: TBasePortableTextValue;
};

export type TBasePortableTextProps = TBasePortableTextConsumerProps & {
  components: Partial<PortableTextReactComponents>;
};

export function BasePortableText({ value, components }: TBasePortableTextProps) {
  return <PortableText value={value} components={components} />;
}
