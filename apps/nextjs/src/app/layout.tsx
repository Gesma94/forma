import { Footer } from '@/layout/footer/footer';
import { interNextFont } from '../utils/fonts/inter';
import { roobertNextFont } from '../utils/fonts/roobert';
import './globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  const getHtmlClassName = () => {
    return [roobertNextFont.className, interNextFont.className].join(' ');
  };

  return (
    <html lang='en' className={getHtmlClassName()}>
      <body className='font-base bg-amber-100'>
        {children}
        <Footer />
      </body>
    </html>
  );
}
