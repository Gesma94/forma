'use client';

export function FooterCopyrightCsr() {
  return (
    <p className='text-primary-text text-center text-sm'>
      &copy; {new Date().getFullYear()} Forma Studio. All Rights Reserved.
    </p>
  );
}
