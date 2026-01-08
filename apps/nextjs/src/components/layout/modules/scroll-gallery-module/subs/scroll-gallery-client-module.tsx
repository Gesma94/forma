'use client';

import { SHADE_COLOR, type TShadeColor } from '@forma/common';
import Masonry from '@mui/lab/Masonry';
import { isNil } from 'es-toolkit';
import { useIsClient } from 'hooks/use-is-client/use-is-client';
import { useMemo, useState } from 'react';
import { Button } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import type { MediaTagAssetDocumentType } from 'types/generated/sanity-types-generated';
import { ModalGallery } from '@/layout/modal-gallery/modal-gallery';
import { ContentContainer } from '@/ui/content-container/content-container';
import { FormaMediaClientSide } from '@/ui/forma-media/forma-media-client-side';
import { Filters } from './filters';
import type { TScrollGalleryMedia } from './types';

interface IScrollGalleryClientModuleProps {
  filters: MediaTagAssetDocumentType[];
  medias: TScrollGalleryMedia[];
  backgroundShadeColor: TShadeColor;
}

export function ScrollGalleryClientModule({ medias, filters, backgroundShadeColor }: IScrollGalleryClientModuleProps) {
  const isClient = useIsClient();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [filtersSelection, setFiltersSelection] = useState<Record<string, boolean>>(
    filters.reduce((acc, curr) => {
      acc[curr._id] = true;
      return acc;
    }, {})
  );
  const {
    filterWrapper,
    imageItem,
    tagContainerTv,
    tagTv,
    emptyListTv,
    emptyListTextTv,
    listItemButtonTv,
    masonryWrapper
  } = stylesTv({ backgroundShadeColor });

  const filtersMapMemoized = useMemo(() => {
    return filters.reduce((acc, curr) => {
      acc.set(curr._id, curr);
      return acc;
    }, new Map<string, MediaTagAssetDocumentType>());
  }, [filters]);

  const filteredImages = useMemo<TScrollGalleryMedia[]>(() => {
    return medias.filter(x => x.tagReferences.some(tag => filtersSelection[tag._ref]));
  }, [medias, filtersSelection]);

  const handleChangeCurrentIndex = (index: number) => {
    setSelectedImageIndex(index <= -1 ? filteredImages.length - 1 : index % filteredImages.length);
  };

  return (
    <>
      <div>
        <div className={filterWrapper()}>
          <Filters filters={filters} areSelected={filtersSelection} onChange={setFiltersSelection} />
        </div>
        {filteredImages.length === 0 && (
          <div className={emptyListTv()}>
            <ContentContainer>
              <p className={emptyListTextTv()}>No images found. Please, select different filters.</p>
            </ContentContainer>
          </div>
        )}
        {filteredImages.length > 0 && (
          <div className={masonryWrapper()}>
            <Masonry
              defaultColumns={4}
              columns={{ xs: 1, sm: 2, lg: 3, xl: 4 }}
              spacing={2}
              style={{ opacity: isClient ? undefined : 0 }}
            >
              {filteredImages.map((x, i) => {
                const { key, tagReferences, formaMediaUnwrapped } = x;
                return (
                  <div className={imageItem()} key={key}>
                    <Button onClick={() => setSelectedImageIndex(i)} className={listItemButtonTv()}>
                      <FormaMediaClientSide {...formaMediaUnwrapped} forceHideMediaTitle={true} />
                      <div className={tagContainerTv()}>
                        {tagReferences.map(tagReference => {
                          const baseTag = filtersMapMemoized.get(tagReference._ref);

                          if (isNil(baseTag) || baseTag.isHidden) {
                            return null;
                          }

                          return (
                            <p key={baseTag._id} className={tagTv()}>
                              &bull; {baseTag.displayName}
                            </p>
                          );
                        })}
                      </div>
                    </Button>
                  </div>
                );
              })}
            </Masonry>
          </div>
        )}
      </div>
      <ModalGallery
        currentIndex={selectedImageIndex}
        images={filteredImages}
        onOpenChange={isOpen => setSelectedImageIndex(isOpen ? selectedImageIndex : null)}
        onChangeCurrentIndex={handleChangeCurrentIndex}
      />
    </>
  );
}

const stylesTv = tv({
  slots: {
    filterWrapper: 'sticky top-0 z-10',
    masonryWrapper: 'w-full py-10 md:py-20 px-10 lg:px-20',
    imageTv: 'size-full object-cover',
    imageItem: 'mb-4 rounded-2xl overflow-hidden',
    listItemButtonTv: 'relative cursor-pointer block',
    tagContainerTv: 'hidden md:flex absolute left-2 bottom-2 gap-2 pl-2',
    tagTv: 'text-primary-text text-sm text-nowrap text-shadow-xl',
    emptyListTv: 'py-10 flex items-center justify-center w-full text-center',
    emptyListTextTv: 'text-bg-text text-3xl py-40'
  },
  variants: {
    backgroundShadeColor: {
      [SHADE_COLOR.LIGHT]: {
        masonryWrapper: 'bg-bg'
      },
      [SHADE_COLOR.DARK]: {
        masonryWrapper: 'bg-bg-soft-dark'
      }
    },
    isServer: {
      true: {
        masonryWrapper: 'opacity-0'
      }
    }
  }
});
