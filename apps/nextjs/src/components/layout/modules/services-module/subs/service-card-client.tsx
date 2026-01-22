import Link from 'next/link';
import type { TFormaMediaUnwrapped } from 'types/forma-media';
import type { ServiceObjectType } from 'types/generated/sanity-types-generated';
import { FormaMediaClientSide } from '@/ui/forma-media/forma-media-client-side';
import { CardDescription } from './card-description';
import { CardHeading } from './card-heading';

type TProps = {
  service: ServiceObjectType;
  formaMediaData: TFormaMediaUnwrapped;
};

export function ServiceCardClient({ formaMediaData, service }: TProps) {
  return (
    <Link
      href={service.serviceUrl}
      className='transition-all duration-300 size-full grid grid-rows-[1fr_5rem] relative h-[20rem] lg:h-[40rem] rounded-2xl overflow-hidden shadow-2xl hover:z-10 lg:hover:grid-rows-[1fr_35rem] lg:hover:scale-110 hover:grid-rows-[1fr_15rem]'
    >
      <div className='absolute inset-0'>
        <FormaMediaClientSide
          {...formaMediaData}
          className='size-full rounded-2xl object-cover'
          {...(formaMediaData.mediaType === 'forma360AssetDocumentType' ? { is360FullScreenShown: false } : {})}
        />
      </div>
      <div className='transition-all row-start-2 bg-primary relative'>
        <div className='h-[5rem] text-center flex items-center justify-center'>
          <CardHeading value={service.title} />
        </div>
        <div className='h-[15rem] lg:h-[30rem] px-10 py-4 text-center'>
          <CardDescription value={service.description} />
        </div>
      </div>
    </Link>
  );
}
