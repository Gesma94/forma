import type { PropsWithChildren } from 'react';

export function ContentContainer({ children }: PropsWithChildren) {
  return (
    <div className='size-full px-8'>
      <div className='size-full max-w-9xl mx-auto'>{children}</div>
    </div>
  );
}
