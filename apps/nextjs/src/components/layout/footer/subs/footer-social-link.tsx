import type { Icon } from '@phosphor-icons/react';
import Link from 'next/link';

type Props = {
  url: string;
  icon: Icon;
};

export function FooterSocialLink({ url, icon: Icon }: Props) {
  return (
    <Link href={url} target='_blank' rel='noopener noreferrer'>
      <Icon className='size-8 text-primary-text' />
    </Link>
  );
}
