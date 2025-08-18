import Link from 'next/link';
import { buttonStyle } from '@/styles/button';

type TProps = {
  label: string;
};

export function FooterCta({ label }: TProps) {
  return (
    <Link href='/book' className={buttonStyle({ size: 'large', surface: 'primary', variant: 'outline' })}>
      {label}
    </Link>
  );
}
