import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { EnvelopeSimpleIcon, PhoneIcon } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { useMemo } from 'react';
import type { ContactObjectType } from 'types/generated/sanity-types-generated';

type TProps = {
  contact: ContactObjectType;
};

export function FooterContact({ contact }: TProps) {
  const { icon: Icon, link } = useMemo<TContactComputed>(() => {
    if (contact.type === 'email') {
      return {
        icon: EnvelopeSimpleIcon,
        link: `mailto:${contact.value}`
      };
    }
    return {
      icon: PhoneIcon,
      link: `tel:${contact.value}`
    };
  }, [contact.value, contact.type]);

  return (
    <Link className='flex gap-2 text-primary-text mr-auto' href={link}>
      <Icon className='size-6' />
      <span>{contact.label}</span>
    </Link>
  );
}

type TContactComputed = {
  icon: PhosphorIcon;
  link: string;
};
