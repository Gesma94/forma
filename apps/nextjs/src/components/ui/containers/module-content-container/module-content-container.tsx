import { MOTION_ANIMATION } from 'common/enums/motion-animation';
import { Fragment, type PropsWithChildren } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import type { SetRequired } from 'type-fest';
import { ContentContainer } from '@/ui/content-container/content-container';
import { MotionDiv } from '@/ui/motion/motion-div';
import type { TBasePortableTextValue } from '@/ui/portable-text/base-portable-text';
import { ModuleContentContainerTitle } from './subs/module-content-container-title';

type Props = PropsWithChildren<SetRequired<VariantProps<typeof style>, 'surface'>> & {
  title?: string | TBasePortableTextValue;
  skipContentContainer?: boolean;
};

export function ModuleContentContainer({ children, surface, title, skipContentContainer = false }: Props) {
  const Container = skipContentContainer ? Fragment : ContentContainer;
  return (
    <div className={style({ surface })}>
      <MotionDiv animation={MOTION_ANIMATION.TRANSLATE_FROM_BOTTOM} className='grid grid-rows-[auto_auto]'>
        {title && (
          <div className='mb-4 md:mb-10'>
            <ContentContainer>
              {typeof title === 'string' ? (
                <h2 className='text-5xl md:text-8xl font-accent text-center'>{title}</h2>
              ) : (
                <ModuleContentContainerTitle value={title} />
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
    surface: {
      bg: 'bg-bg text-bg-text',
      primary: 'bg-primary text-primary-text'
    }
  }
});
