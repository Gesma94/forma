'use client';

import { X } from '@phosphor-icons/react';
import { useIsClient } from 'hooks/use-is-client/use-is-client';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useState } from 'react';
import { tv } from 'tailwind-variants';
import { IconButton } from '@/ui/buttons/icon-button/icon-button';

export function CookieConsentFloatingBanner() {
  const isClient = useIsClient();
  const { containerTv, textTv, linkTv } = stylesTv();
  const [hasClickedClose, setHasClickedClose] = useState(false);

  const shouldShow = Cookies.get('cookie-consent') !== 'accepted';

  const handleClose = () => {
    setHasClickedClose(true);
    Cookies.set('cookie-consent', 'accepted', { expires: 30 });
  };

  if (!isClient) {
    return null;
  }

  if (!shouldShow) {
    return null;
  }

  if (hasClickedClose) {
    return null;
  }

  return (
    <div className={containerTv()}>
      <span className={textTv()}>
        This website uses cookies.&nbsp;
        <Link href='/privacy-policy' className={linkTv()}>
          Learn more
        </Link>
      </span>
      <IconButton
        onClick={handleClose}
        icon={X}
        variant='outline'
        surface='primary'
        size='extrasmall'
        aria-label='Close cookie consent'
      />
    </div>
  );
}

const stylesTv = tv({
  slots: {
    containerTv:
      'fixed bottom-8 left-1/2 -translate-x-1/2 bg-primary pl-4 pr-2 py-2 rounded-full shadow-[0_0_15px_-5px_black] flex gap-2 items-center z-50',
    textTv: 'uppercase text-primary-text text-xs',
    linkTv: 'underline underline-offset-4'
  }
});
