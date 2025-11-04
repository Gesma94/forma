'use client';

import { X } from '@phosphor-icons/react';
import { Button, Text, UNSTABLE_Toast, UNSTABLE_ToastContent, UNSTABLE_ToastRegion } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { toastQueue } from './subs/toast-queue';

export function ToastRegion() {
  const { toastContentTv, toastRegionTv, headerContainerTv, titleTv, descriptionTv } = stylesTv();
  return (
    <UNSTABLE_ToastRegion queue={toastQueue} className={toastRegionTv()}>
      {({ toast }) => (
        <UNSTABLE_Toast toast={toast}>
          <UNSTABLE_ToastContent className={toastContentTv({ kind: toast.content.kind })}>
            <div className={headerContainerTv()}>
              <Text slot='title' className={titleTv({ kind: toast.content.kind })}>
                {toast.content.title}
              </Text>
              <Button slot='close' className='cursor-pointer'>
                <X className='size-5' />
              </Button>
            </div>
            <Text slot='description' className={descriptionTv({ kind: toast.content.kind })}>
              {toast.content.description}
            </Text>
          </UNSTABLE_ToastContent>
        </UNSTABLE_Toast>
      )}
    </UNSTABLE_ToastRegion>
  );
}

const stylesTv = tv({
  slots: {
    toastRegionTv: 'fixed bottom-4 right-4 flex flex-col-reverse gap-2 outline-none z-50',
    toastContentTv: 'flex flex-col gap-1 max-w-[calc(100vw-2rem)] w-sm rounded-xl p-4',
    headerContainerTv: 'flex items-center justify-between gap-2',
    titleTv: 'text-lg font-bold',
    descriptionTv: 'text-sm'
  },
  variants: {
    kind: {
      success: {
        toastContentTv: 'bg-success text-bg'
      },
      error: {
        toastContentTv: 'bg-error text-bg'
      }
    }
  }
});
