import { PADDING_SIZE, type TPaddingSize } from '@forma/common';
import type { PropsWithChildren } from 'react';
import { tv } from 'tailwind-variants';

type TProps = {
  paddingTop: TPaddingSize;
  paddingBottom: TPaddingSize;
  hideOnMobile?: boolean;
};

export function VerticalPaddingContainer({
  paddingBottom,
  paddingTop,
  hideOnMobile,
  children
}: PropsWithChildren<TProps>) {
  return <div className={stylesTv({ paddingBottom, paddingTop, isHiddenOnMobile: hideOnMobile })}>{children}</div>;
}

const stylesTv = tv({
  base: 'size-full',
  variants: {
    paddingTop: {
      [PADDING_SIZE.NONE]: '',
      [PADDING_SIZE.SM]: 'pt-5 lg:pt-10',
      [PADDING_SIZE.MD]: 'pt-10 lg:pt-20',
      [PADDING_SIZE.LG]: 'pt-20 lg:pt-40'
    },
    paddingBottom: {
      [PADDING_SIZE.NONE]: '',
      [PADDING_SIZE.SM]: 'pb-5 lg:pb-10',
      [PADDING_SIZE.MD]: 'pb-10 lg:pb-20',
      [PADDING_SIZE.LG]: 'pb-20 lg:pb-40'
    },
    isHiddenOnMobile: {
      true: 'hidden sm:block'
    }
  }
});
