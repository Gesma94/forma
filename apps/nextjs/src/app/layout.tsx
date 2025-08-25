import { Footer } from '@/layout/footer/footer';
import { interNextFont } from '../utils/fonts/inter';
import { Roobert } from '../utils/fonts/roobert';
import './globals.css';
import type { ReactNode } from 'react';
import { Topbar } from '@/layout/topbar/topbar';

export default function RootLayout({ children }: { children: ReactNode }) {
  const getHtmlClassName = () => {
    return [Roobert.className, interNextFont.className].join(' ');
  };

  return (
    <html lang='en' className={getHtmlClassName()}>
      <body className='font-base bg-primary'>
        <div className='absolute top-0 w-full h-20 z-10'>
          <Topbar />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
