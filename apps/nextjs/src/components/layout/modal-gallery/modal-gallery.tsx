import { CaretLeftIcon, CaretRightIcon, XIcon } from '@phosphor-icons/react';
import { isNil, isNotNil } from 'es-toolkit';
import { useLayoutEffect } from 'react';
import { Dialog as AriaDialog, Modal as AriaModal } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { IconButton } from '@/ui/buttons/icon-button/icon-button';
import type { IModalGalleryImage } from './subs/types';

interface IModalGalleryProps {
  currentIndex: number | null;
  images: IModalGalleryImage[];
  onOpenChange: (isOpen: boolean) => void;
  onChangeCurrentIndex: (index: number) => void;
}

export function ModalGallery({ currentIndex, images, onOpenChange, onChangeCurrentIndex }: IModalGalleryProps) {
  const {
    modalTv,
    dialogTv,
    dialogContentContainerTv,
    imageWrapperTv,
    topSectionContainerTv,
    imageTv,
    titleTv,
    bottomSectionContainerTv,
    titleIndexContainerTv,
    changeIndexButtonsContainerTv,
    spacerIndexTv,
    indexTv
  } = styleTv();
  const currentImage = images[currentIndex];

  useLayoutEffect(() => {
    if (isNotNil(currentIndex)) {
      document.body.parentElement.classList.add('disable-scrollbar-gutter');
    }
    return () => {
      document.body.parentElement.classList.remove('disable-scrollbar-gutter');
    };
  }, [currentIndex]);
  return isNil(currentImage) ? null : (
    <AriaModal className={modalTv()} isDismissable={false} isOpen={isNotNil(currentIndex)} onOpenChange={onOpenChange}>
      <AriaDialog aria-label={currentImage.title} className={dialogTv()}>
        {({ close }) => (
          <div className={dialogContentContainerTv()}>
            {currentImage && (
              <>
                <div className={topSectionContainerTv()}>
                  <IconButton icon={XIcon} onClick={close} />
                </div>
                <div className={imageWrapperTv()}>
                  <img src={currentImage.imageUrl} alt={currentImage.title} className={imageTv()} />
                </div>
                <div className={bottomSectionContainerTv()}>
                  <div className={titleIndexContainerTv()}>
                    <p className={spacerIndexTv()}>
                      {currentIndex + 1}/{images.length}
                    </p>
                    {isNotNil(currentImage.title) && <p className={titleTv()}>{currentImage.title}</p>}
                    <p className={indexTv()}>
                      {currentIndex + 1}/{images.length}
                    </p>
                  </div>
                  <div className={changeIndexButtonsContainerTv()}>
                    <IconButton icon={CaretLeftIcon} onClick={() => onChangeCurrentIndex(currentIndex - 1)} />
                    <IconButton icon={CaretRightIcon} onClick={() => onChangeCurrentIndex(currentIndex + 1)} />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </AriaDialog>
    </AriaModal>
  );
}

const styleTv = tv({
  slots: {
    modalTv: 'fixed z-50 inset-0 bg-bg-dark w-full',
    dialogTv: 'size-full',
    dialogContentContainerTv: 'size-full grid grid-rows-[8rem_1fr_auto] sm:grid-rows-[8rem_1fr_8rem]',
    topSectionContainerTv: 'row-start-1 flex justify-end items-center pr-10',
    bottomSectionContainerTv: 'row-start-3 flex flex-col gap-6 sm:gap-0 sm:grid sm:grid-cols-[10rem_1fr_10rem]',
    imageWrapperTv: 'row-start-2 min-h-0',
    imageTv: 'size-full object-contain',
    titleTv: 'text-primary-text text-center text-2xl col-start-2',
    spacerIndexTv: 'text-primary-text text-lg invisible col-start-1',
    indexTv: 'text-primary-text text-lg col-start-3',
    titleIndexContainerTv:
      'col-start-2 flex flex-col sm:grid grid-cols-[auto_1fr_auto] justify-center items-center gap-2',
    changeIndexButtonsContainerTv:
      'col-start-3 flex mb-10 sm:mb-0 justify-center sm:justify-end items-center sm:pr-10 gap-2'
  }
});
