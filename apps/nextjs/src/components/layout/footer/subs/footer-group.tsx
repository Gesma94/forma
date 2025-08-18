import type { PropsWithChildren } from 'react';
import { FooterSubHeading } from './footer-sub-heading';

type TProps = {
  heading: string;
};

export function FooterGroup({ children, heading }: PropsWithChildren<TProps>) {
  return (
    <div className='flex flex-col gap-2'>
      <FooterSubHeading>{heading}</FooterSubHeading>
      {children}
    </div>
  );
}
