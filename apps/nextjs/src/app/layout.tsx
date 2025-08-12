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
      <body className='bg-amber-100'>{children}</body>
    </html>
  );
}
