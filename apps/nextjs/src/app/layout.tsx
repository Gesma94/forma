import { Footer } from '@/layout/footer/footer';
import { Roobert } from '../utils/fonts/roobert';
import './globals.css';
import { CookieManagerProvider } from 'components/cookie-manager/cookie-manager-provider';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';
import { MaintananceSplashScreen } from '@/layout/maintanance-splash-screen/maintanance-splash-screen';
import { ScrollAtTop } from '@/layout/scroll-at-top/scroll-at-top';
import { ToastRegion } from '@/layout/toast-notification/toast-region';

export default function RootLayout({ children }: { children: ReactNode }) {
  const { bodyTv, mainDivTv } = stylesTv();

  const getHtmlClassName = () => {
    return [Roobert.className].join(' ');
  };

  return (
    <html lang='en' className={getHtmlClassName()}>
      <ToastRegion />
      <body className={bodyTv()}>
        <CookieManagerProvider>
          {process.env.UNDER_MAINTENANCE === 'true' ? (
            <MaintananceSplashScreen />
          ) : (
            <>
              <main className={mainDivTv()}>{children}</main>
              <Footer />
              <ScrollAtTop />
            </>
          )}
        </CookieManagerProvider>
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
