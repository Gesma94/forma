import Image from 'next/image';
import { tv } from 'tailwind-variants';
import { ParagraphPortableText } from '@/ui/portable-text/paragraph-portable-text';
import type { TQuoteWithAvatarUrl } from './types';

type TProps = {
  quote: TQuoteWithAvatarUrl;
};

export function Quote({
  quote: { authorAvatar, authorCompany, authorName, authorRole, statement, authorAvatarUrl }
}: TProps) {
  const { mainContainerTv } = stylesTv();
  return (
    <div>
      <div className={mainContainerTv()}>
        <p className='opacity-30 absolute -top-10 text-8xl -left-10 md:-left-20 md:text-9xl text-primary'>“</p>
        <ParagraphPortableText value={statement} />
        <p className='opacity-30 absolute -bottom-10 text-8xl -right-10 md:-right-20 md:text-9xl text-primary'>„</p>
      </div>
      <div className='flex w-full items-center justify-center md:justify-start mx-auto gap-4 relative mt-16'>
        <div className='flex-col flex md:gap-4 items-center md:flex-row md:ml-4'>
          <Image
            src={authorAvatarUrl}
            alt={authorAvatar.altText}
            width={64}
            height={64}
            className='size-16 rounded-full order-1'
          />
          <div className='flex flex-col items-center md:items-start order-2'>
            <p className='prose-lg font-bold'>{authorName}</p>
            <p className='prose-sm text-center'>
              {authorRole}, {authorCompany}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const stylesTv = tv({
  slots: {
    mainContainerTv: 'mt-6 mx-auto max-w-3xl text-center flex items-center justify-center relative'
  }
});
