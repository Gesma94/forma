import View360, { type Projection } from '@egjs/react-view360';
import { XIcon } from '@phosphor-icons/react';
import { useLayoutEffect } from 'react';
import { Dialog as AriaDialog, Modal as AriaModal } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { IconButton } from '@/ui/buttons/icon-button/icon-button';

type Props = {
  isOpen: boolean;
  imageLabel: string;
  projection: Projection;
  onOpenChange: (isOpen: boolean) => void;
};

export function FullScreenModal({ isOpen, projection, imageLabel, onOpenChange }: Props) {
  const {
    modalTv,
    dialogTv,
    dialogContentContainerTv,
    imageWrapperTv,
    topSectionContainerTv,
    titleTv,
    bottomSectionContainerTv
  } = styleTv();

  useLayoutEffect(() => {
    if (isOpen) {
      document.body.parentElement.classList.add('disable-scrollbar-gutter');
    }
    return () => {
      document.body.parentElement.classList.remove('disable-scrollbar-gutter');
    };
  }, [isOpen]);

  return !isOpen ? null : (
    <AriaModal className={modalTv()} isDismissable={true} isOpen={isOpen} onOpenChange={onOpenChange}>
      <AriaDialog aria-label={imageLabel} className={dialogTv()}>
        {({ close }) => (
          <div className={dialogContentContainerTv()}>
            <div className={topSectionContainerTv()}>
              <IconButton icon={XIcon} onClick={close} aria-label='Close modal' />
            </div>
            <div className={imageWrapperTv()}>
              <View360
                autoplay={false}
                zoom={true}
                initialZoom={0}
                className='is-16by9 size-full'
                projection={projection}
                canvasClass='outline-none'
              />
            </div>
            <div className={bottomSectionContainerTv()}>{<p className={titleTv()}>{imageLabel}</p>}</div>
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
    dialogContentContainerTv: 'size-full relative',
    topSectionContainerTv: 'absolute w-full top-0 h-16 flex justify-end items-center pr-10 z-10',
    bottomSectionContainerTv: 'absolute w-full bottom-0 h-16 flex items-center justify-center z-10',
    imageWrapperTv: 'relative size-full overflow-hidden',
    titleTv: 'text-primary-text text-center text-2xl col-start-2 text-shadow-xl'
  }
});
