import type { PropsWithChildren } from 'react';

export function FooterSubHeading({ children }: PropsWithChildren) {
  return <p className='text-2xl text-primary-text font-accent font-bold'>{children}</p>;
}
