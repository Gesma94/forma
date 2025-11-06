'use client';

import { X } from '@phosphor-icons/react';
import Link from 'next/link';
import { tv } from 'tailwind-variants';
import { IconButton } from '@/ui/buttons/icon-button/icon-button';
import Cookies from 'js-cookie';
import { useState } from 'react';

export function CookieConsentFloatingBanner() {
  const { containerTv, textTv, linkTv } = stylesTv();
  const [hasClickedClose, setHasClickedClose] = useState(false);

  const shouldShow = Cookies.get('cookie-consent') !== "accepted";

  const handleClose = () => {
    setHasClickedClose(true);
    Cookies.set('cookie-consent', 'accepted', { expires: 30 });
  };

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
      <IconButton onClick={handleClose} icon={X} variant='outline' surface='primary' size='extrasmall' />
    </div>
  );
}

const stylesTv = tv({
  slots: {
    containerTv:
      'fixed bottom-8 left-1/2 -translate-x-1/2 bg-primary pl-4 pr-2 py-2 rounded-full shadow-[0_0_15px_-5px_black] flex gap-2 items-center',
    textTv: 'uppercase text-primary-text text-xs',
    linkTv: 'underline underline-offset-4'
  }
});
