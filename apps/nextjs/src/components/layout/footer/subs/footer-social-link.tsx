import type { Icon } from '@phosphor-icons/react';
import Link from 'next/link';

type Props = {
  url: string;
  icon: Icon;
  label: string;
};

export function FooterSocialLink({ url, icon: Icon, label }: Props) {
  return (
    <Link href={url} target='_blank' rel='noopener noreferrer' aria-label={label}>
      <Icon className='size-8 text-primary-text' />
    </Link>
  );
}
