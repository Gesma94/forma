import { Footer } from '@/layout/footer/footer';
import { interNextFont } from '../utils/fonts/inter';
import { Roobert } from '../utils/fonts/roobert';
import './globals.css';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';
import { CookieConsentFloatingBanner } from '@/layout/cookie-consent-floating-banner/CookieConsentFloatingBanner';
import { MaintananceSplashScreen } from '@/layout/maintanance-splash-screen/maintanance-splash-screen';
import { ScrollAtTop } from '@/layout/scroll-at-top/scroll-at-top';
import { ToastRegion } from '@/layout/toast-notification/toast-region';

export default function RootLayout({ children }: { children: ReactNode }) {
  const { bodyTv, mainDivTv } = stylesTv();

  const getHtmlClassName = () => {
    return [Roobert.className, interNextFont.className].join(' ');
  };

  return (
    <html lang='en' className={getHtmlClassName()}>
      <ToastRegion />
      <body className={bodyTv()}>
        {process.env.NEXT_PUBLIC_UNDER_MAINTENANCE === 'true' ? (
          <MaintananceSplashScreen />
        ) : (
          <>
            <div className={mainDivTv()}>{children}</div>
            <Footer />
            <ScrollAtTop />
            <CookieConsentFloatingBanner />
          </>
        )}
      </body>
    </html>
  );
}

const stylesTv = tv({
  slots: {
    bodyTv: 'flex flex-col font-accent bg-primary min-h-dvh',
    mainDivTv: 'grow bg-bg'
  }
});
