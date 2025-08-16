import type { Icon } from '@phosphor-icons/react';
import Link from 'next/link';

type Props = {
  url: string;
  icon: Icon;
};

export function SocialLink({ url, icon: Icon }: Props) {
  return (
    <Link href={url} target='_blank' rel='noopener noreferrer'>
      <Icon className='size-10 text-primary-text' />
    </Link>
  );
}
