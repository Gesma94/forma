'use client';

import { IMAGE_TAG, type TImageTag } from '@forma/common';
import { Fragment, useMemo, useState } from 'react';
import { Button } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { ModalGallery } from '@/layout/modal-gallery/modal-gallery';
import type { IModalGalleryImage } from '@/layout/modal-gallery/subs/types';
import { ContentContainer } from '@/ui/content-container/content-container';
import { FormaMediaClientSide } from '@/ui/forma-media/forma-media-client-side';
import { Filters } from './filters';
import type { TScrollGalleryMedia } from './types';

interface IScrollGalleryClientModuleProps {
  medias: TScrollGalleryMedia[];
}

export function ScrollGalleryClientModule({ medias }: IScrollGalleryClientModuleProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [filters, setFilters] = useState<Record<TImageTag, boolean>>({
    [IMAGE_TAG.ARCHITECTURAL_STILLS]: true,
    [IMAGE_TAG.VIDEO_ANIMATIONS]: true,
    [IMAGE_TAG.VR_360]: true
  });
  const { filterWrapper, imageList, imageItem, tagContainerTv, tagTv, emptyListTv, emptyListTextTv, listItemButtonTv } =
    stylesTv();

  const filteredImages = useMemo<TScrollGalleryMedia[]>(() => {
    return medias.filter(x => x.tags.some(tag => filters[tag]));
  }, [medias, filters]);

  const filteredModalImages = useMemo<IModalGalleryImage[]>(() => {
    return []; // filteredImages.map(x => ({ imageUrl: x.imageUrl, title: x.imageAltText }));
  }, []);

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
            {filteredImages.map((x, i) => {
              const { key, tags, ...mediaProps } = x;
              return (
                <Fragment key={key}>
                  <li className={imageItem()}>
                    <Button onClick={() => setSelectedImageIndex(i)} className={listItemButtonTv()}>
                      <FormaMediaClientSide {...mediaProps} forceHideMediaTitle={true} />
                      <div className={tagContainerTv()}>
                        {tags.map(tag => (
                          <p key={tag} className={tagTv()}>
                            &bull; {tag}
                          </p>
                        ))}
                      </div>
                    </Button>
                  </li>
                </Fragment>
              );
            })}
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
    filterWrapper: 'sticky top-0 z-10',
    imageList: 'bg-bg w-full columns-1 md:columns-2 lg:columns-3 2xl:columns-4 py-10 md:py-20 px-10 lg:px-20',
    imageTv: 'size-full object-cover',
    imageItem: 'w-full mb-4 rounded-2xl overflow-hidden',
    listItemButtonTv: 'relative cursor-pointer block',
    tagContainerTv: 'hidden md:flex absolute left-2 bottom-2 gap-2 pl-2',
    tagTv: 'text-primary-text text-sm text-nowrap text-shadow-xl',
    emptyListTv: 'py-10 flex items-center justify-center w-full text-center',
    emptyListTextTv: 'text-bg-text text-3xl py-40'
  }
});
