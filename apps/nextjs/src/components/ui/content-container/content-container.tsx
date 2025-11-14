import type { PropsWithChildren } from 'react';

export function ContentContainer({ children }: PropsWithChildren) {
  return (
    <div className='size-full px-4 md:px-8'>
      <div className='size-full max-w-10xl mx-auto'>{children}</div>
    </div>
  );
}
