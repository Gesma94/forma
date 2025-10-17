'use client';

import { IMAGE_TAG, type TImageTag } from '@forma/common';
import { Fragment, useMemo, useState } from 'react';
import { tv } from 'tailwind-variants';
import { ContentContainer } from '@/ui/content-container/content-container';
import { Filters } from './filters';
import type { IScrollGalleryImage } from './types';

interface IScrollGalleryClientModuleProps {
  images: IScrollGalleryImage[];
}

export function ScrollGalleryClientModule({ images }: IScrollGalleryClientModuleProps) {
  const [filters, setFilters] = useState<Record<TImageTag, boolean>>({
    [IMAGE_TAG.ARCHITECTURAL_STILLS]: true,
    [IMAGE_TAG.VIDEO_ANIMATIONS]: true,
    [IMAGE_TAG.VR_360]: true
  });
  const { filterWrapper, imageList, imageItem, tagContainerTv, tagTv, imageTv, emptyListTv, emptyListTextTv } =
    stylesTv();

  const filteredImages = useMemo<IScrollGalleryImage[]>(() => {
    return images.filter(x => x.tags.some(tag => filters[tag]));
  }, [images, filters]);

  return (
    <div>
      <div className={filterWrapper()}>
        <Filters areSelected={filters} onChange={setFilters} />
      </div>
      {filteredImages.length === 0 && (
        <div className={emptyListTv()}>
          <ContentContainer>
            <p className={emptyListTextTv()}>No images found. Please, select different filters.</p>
          </ContentContainer>
        </div>
      )}
      {filteredImages.length > 0 && (
        <ul className={imageList()}>
          {filteredImages.map(x => (
            <Fragment key={x.key}>
              <li className={imageItem()}>
                <img src={x.iamgeUrl} alt={x.title} className={imageTv()} />
                <div className={tagContainerTv()}>
                  {x.tags.map(tag => (
                    <p key={tag} className={tagTv()}>
                      {tag}
                    </p>
                  ))}
                </div>
              </li>
            </Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}

const stylesTv = tv({
  slots: {
    filterWrapper: 'min-h-24 sticky top-0 z-10',
    imageList: 'bg-bg w-full columns-xl py-20 px-10',
    imageTv: 'size-full object-cover',
    imageItem: 'w-full mb-4 rounded-2xl overflow-hidden relative',
    tagContainerTv: 'hidden md:flex absolute left-2 bottom-2 gap-2',
    tagTv: 'bg-bg text-bg-text text-sm px-2 py-1 rounded-xl pointer-events-none text-nowrap',
    emptyListTv: 'py-10 flex items-center justify-center w-full text-center',
    emptyListTextTv: 'text-bg-text text-3xl'
  }
});
