import { Footer } from '@/layout/footer/footer';
import { interNextFont } from '../utils/fonts/inter';
import { Roobert } from '../utils/fonts/roobert';
import './globals.css';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';
import { ScrollAtTop } from '@/layout/scroll-at-top/scroll-at-top';

export default function RootLayout({ children }: { children: ReactNode }) {
  const { bodyTv, mainDivTv } = stylesTv();

  const getHtmlClassName = () => {
    return [Roobert.className, interNextFont.className].join(' ');
  };

  return (
    <html lang='en' className={getHtmlClassName()}>
      <body className={bodyTv()}>
        <div className={mainDivTv()}>{children}</div>
        <Footer />
        <ScrollAtTop />
      </body>
    </html>
  );
}

const stylesTv = tv({
  slots: {
    bodyTv: 'flex flex-col font-base bg-primary min-h-dvh',
    mainDivTv: 'grow bg-bg'
  }
});
