import { PortableText, type PortableTextBlock, type PortableTextReactComponents } from '@portabletext/react';
import type { SetOptional } from 'type-fest';

type TPortableTextBlockOptionalChildren = SetOptional<PortableTextBlock, 'children'>;

export type TBasePortableTextConsumerProps = {
  value: TPortableTextBlockOptionalChildren[];
};

export type TBasePortableTextProps = TBasePortableTextConsumerProps & {
  components: Partial<PortableTextReactComponents>;
};

export function BasePortableText({ value, components }: TBasePortableTextProps) {
  return <PortableText value={value} components={components} />;
}
