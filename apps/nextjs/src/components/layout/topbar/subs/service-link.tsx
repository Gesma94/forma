'use client';

import Link from 'next/link';
import type { TFormaMediaUnwrapped } from 'types/forma-media';
import { FormaMediaClientSide } from '@/ui/forma-media/forma-media-client-side';

type Props = {
  urlLink: string;
  urlCaption: string;
  formaMediaData: TFormaMediaUnwrapped;
};

export function ServiceLink({ urlLink, urlCaption, formaMediaData }: Props) {
  return (
    <Link href={urlLink} className='flex flex-col gap-2 items-center'>
      <div className='w-64 xl:w-80 h-auto aspect-video min-h-0'>
        <FormaMediaClientSide
          {...formaMediaData}
          forceHideMediaTitle={true}
          className='size-full object-cover rounded-2xl'
        />
      </div>
      <span className='text-lg text-primary-text uppercase'>{urlCaption}</span>
    </Link>
  );
}
