import type { TModuleVariants } from '@forma/common';
import { MOTION_ANIMATION } from 'common/enums/motion-animation';
import { Fragment, type PropsWithChildren } from 'react';
import { ContentContainer } from '@/ui/content-container/content-container';
import { MotionDiv } from '@/ui/motion/motion-div';
import type { TBasePortableTextValue } from '@/ui/portable-text/base-portable-text';
import { ModuleContentContainerTitle } from './subs/module-content-container-title';

type Props = PropsWithChildren<{
  variant: TModuleVariants;
  title?: string | TBasePortableTextValue;
  skipContentContainer?: boolean;
  skipYPadding?: boolean;
}>;

export function ModuleContentContainer({ children, variant = 'on-bg', title, skipContentContainer = false }: Props) {
  const Container = skipContentContainer ? Fragment : ContentContainer;
  return (
    <MotionDiv animation={MOTION_ANIMATION.TRANSLATE_FROM_BOTTOM} className='grid grid-rows-[auto_auto]'>
      {title && (
        <div className='mb-4 md:mb-10'>
          <ContentContainer>
            {typeof title === 'string' ? (
              <h2 className='text-5xl md:text-8xl text-center font-bold'>{title}</h2>
            ) : (
              <ModuleContentContainerTitle value={title} variant={variant} />
            )}
          </ContentContainer>
        </div>
      )}
      <Container>{children}</Container>
    </MotionDiv>
  );
}
