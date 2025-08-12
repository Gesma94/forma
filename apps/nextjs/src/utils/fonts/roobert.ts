import localFont from 'next/font/local';

export const roobertNextFont = localFont({
  src: [
    {
      path: './../../../assets/fonts/roobert/Roobert-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './../../../assets/fonts/roobert/Roobert-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './../../../assets/fonts/roobert/Roobert-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    }
  ]
});
