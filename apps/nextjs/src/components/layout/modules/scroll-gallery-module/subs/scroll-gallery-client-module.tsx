'use client';

import { IMAGE_TAG, type TImageTag } from '@forma/common';
import { Fragment, useMemo, useState } from 'react';
import { Button } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { ModalGallery } from '@/layout/modal-gallery/modal-gallery';
import type { IModalGalleryImage } from '@/layout/modal-gallery/subs/types';
import { ContentContainer } from '@/ui/content-container/content-container';
import { Filters } from './filters';
import type { IScrollGalleryImage } from './types';

interface IScrollGalleryClientModuleProps {
  images: IScrollGalleryImage[];
}

export function ScrollGalleryClientModule({ images }: IScrollGalleryClientModuleProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [filters, setFilters] = useState<Record<TImageTag, boolean>>({
    [IMAGE_TAG.ARCHITECTURAL_STILLS]: true,
    [IMAGE_TAG.VIDEO_ANIMATIONS]: true,
    [IMAGE_TAG.VR_360]: true
  });
  const {
    filterWrapper,
    imageList,
    imageItem,
    tagContainerTv,
    tagTv,
    imageTv,
    emptyListTv,
    emptyListTextTv,
    listItemButtonTv
  } = stylesTv();

  const filteredImages = useMemo<IScrollGalleryImage[]>(() => {
    return images.filter(x => x.tags.some(tag => filters[tag]));
  }, [images, filters]);

  const filteredModalImages = useMemo<IModalGalleryImage[]>(() => {
    return filteredImages.map(x => ({ imageUrl: x.iamgeUrl, title: x.title }));
  }, [filteredImages]);

  const handleChangeCurrentIndex = (index: number) => {
    setSelectedImageIndex(index <= -1 ? filteredModalImages.length - 1 : index % filteredModalImages.length);
  };
  return (
    <>
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
            {filteredImages.map((x, i) => (
              <Fragment key={x.key}>
                <li className={imageItem()}>
                  <Button onClick={() => setSelectedImageIndex(i)} className={listItemButtonTv()}>
                    <img src={x.iamgeUrl} alt={x.title} className={imageTv()} />
                    <div className={tagContainerTv()}>
                      {x.tags.map(tag => (
                        <p key={tag} className={tagTv()}>
                          {tag}
                        </p>
                      ))}
                    </div>
                  </Button>
                </li>
              </Fragment>
            ))}
          </ul>
        )}
      </div>
      <ModalGallery
        currentIndex={selectedImageIndex}
        images={filteredModalImages}
        onOpenChange={isOpen => setSelectedImageIndex(isOpen ? selectedImageIndex : null)}
        onChangeCurrentIndex={handleChangeCurrentIndex}
      />
    </>
  );
}

const stylesTv = tv({
  slots: {
    filterWrapper: 'min-h-24 sticky top-0 z-10',
    imageList: 'bg-bg w-full columns-xl py-20 px-10',
    imageTv: 'size-full object-cover',
    imageItem: 'w-full mb-4 rounded-2xl overflow-hidden',
    listItemButtonTv: 'relative cursor-pointer',
    tagContainerTv: 'hidden md:flex absolute left-2 bottom-2 gap-2',
    tagTv: 'bg-bg text-bg-text text-sm px-2 py-1 rounded-xl pointer-events-none text-nowrap',
    emptyListTv: 'py-10 flex items-center justify-center w-full text-center',
    emptyListTextTv: 'text-bg-text text-3xl'
  }
});
