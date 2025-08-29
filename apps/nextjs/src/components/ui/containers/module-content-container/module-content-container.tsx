import { MODULE_VARIANTS } from '@forma/common';
import { MOTION_ANIMATION } from 'common/enums/motion-animation';
import { Fragment, type PropsWithChildren } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { ContentContainer } from '@/ui/content-container/content-container';
import { MotionDiv } from '@/ui/motion/motion-div';
import type { TBasePortableTextValue } from '@/ui/portable-text/base-portable-text';
import { ModuleContentContainerTitle } from './subs/module-content-container-title';

type Props = PropsWithChildren<VariantProps<typeof style>> & {
  title?: string | TBasePortableTextValue;
  skipContentContainer?: boolean;
};

export function ModuleContentContainer({ children, variant = 'on-bg', title, skipContentContainer = false }: Props) {
  const Container = skipContentContainer ? Fragment : ContentContainer;
  return (
    <div className={style({ variant })}>
      <MotionDiv animation={MOTION_ANIMATION.TRANSLATE_FROM_BOTTOM} className='grid grid-rows-[auto_auto]'>
        {title && (
          <div className='mb-4 md:mb-10'>
            <ContentContainer>
              {typeof title === 'string' ? (
                <h2 className='text-5xl md:text-8xl font-accent text-center'>{title}</h2>
              ) : (
                <ModuleContentContainerTitle value={title} variant={variant} />
              )}
            </ContentContainer>
          </div>
        )}
        <Container>{children}</Container>
      </MotionDiv>
    </div>
  );
}

const style = tv({
  base: 'py-10 md:py-20',
  variants: {
    variant: {
      [MODULE_VARIANTS.ON_BG]: 'bg-bg text-bg-text',
      [MODULE_VARIANTS.ON_PRIMARY]: 'bg-primary text-primary-text'
    }
  }
});
