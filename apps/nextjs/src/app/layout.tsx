import { Footer } from '@/layout/footer/footer';
import { interNextFont } from '../utils/fonts/inter';
import { Roobert } from '../utils/fonts/roobert';
import './globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  const getHtmlClassName = () => {
    return [Roobert.className, interNextFont.className].join(' ');
  };

  return (
    <html lang='en' className={getHtmlClassName()}>
      <body className='flex flex-col font-base bg-primary min-h-dvh'>
        <div className='grow bg-bg'>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
