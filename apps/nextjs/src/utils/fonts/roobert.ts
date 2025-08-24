import localFont from 'next/font/local';

// NOTE: this must be named "Roobert"
export const Roobert = localFont({
  src: [
    {
      path: './../../../public/fonts/roobert/Roobert-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './../../../public/fonts/roobert/Roobert-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './../../../public/fonts/roobert/Roobert-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    }
  ]
});
