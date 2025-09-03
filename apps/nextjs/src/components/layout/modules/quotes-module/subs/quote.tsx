import Image from 'next/image';
import { ParagraphPortableText } from '@/ui/portable-text/paragraph-portable-text';
import type { TQuoteWithAvatarUrl } from './types';

type TProps = {
  quote: TQuoteWithAvatarUrl;
};

export function Quote({
  quote: { authorAvatar, authorCompany, authorName, authorRole, statement, authorAvatarUrl }
}: TProps) {
  return (
    <div>
      <div className='mx-auto max-w-3xl text-center flex items-center justify-center relative mt-20'>
        <p className='opacity-30 absolute -top-10 text-8xl -left-10 md:-left-20 md:text-9xl text-primary'>“</p>
        <ParagraphPortableText value={statement} />
        <p className='opacity-30 absolute -bottom-10 text-8xl -right-10 md:-right-20 md:text-9xl text-primary'>„</p>
      </div>
      <div className='flex w-full items-center justify-center md:justify-end mx-auto gap-4 relative mt-16'>
        <div className='flex-col flex md:gap-4 items-center md:flex-row'>
          <div className='flex flex-col items-center md:justify-end md:items-end order-2 md:order-1'>
            <p className='prose-lg font-bold'>{authorName}</p>
            <p className='prose-sm font-light text-center'>
              {authorRole}, {authorCompany}
            </p>
          </div>
          <Image
            src={authorAvatarUrl}
            alt={authorAvatar.altText}
            width={64}
            height={64}
            className='size-16 rounded-full order-1 md:order-2'
          />
        </div>
      </div>
    </div>
  );
}
