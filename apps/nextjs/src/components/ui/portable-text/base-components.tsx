import type { PortableTextMarkComponentProps } from '@portabletext/react';
import type { TypedObject } from '@portabletext/types';
import type { JSX } from 'react';

export function PortableTextEmComponent<T extends TypedObject>({
  children
}: PortableTextMarkComponentProps<T>): JSX.Element {
  return <em>{children}</em>;
}

export function PortableTextStrongComponent<T extends TypedObject>({
  children
}: PortableTextMarkComponentProps<T>): JSX.Element {
  return <strong className='font-bold'>{children}</strong>;
}

export function PortableTextPrimaryColorComponent<T extends TypedObject>({
  children
}: PortableTextMarkComponentProps<T>): JSX.Element {
  return <span className='text-primary'>{children}</span>;
}
