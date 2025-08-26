import type { PortableTextBlock } from '@portabletext/types';
import { Fragment, type PropsWithChildren } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import type { SetRequired } from 'type-fest';
import { ContentContainer } from '@/ui/content-container/content-container';
import { ModuleContentContainerTitle } from './subs/module-content-container-title';

type Props = PropsWithChildren<SetRequired<VariantProps<typeof style>, 'surface'>> & {
  title?: string | PortableTextBlock;
  skipContentContainer?: boolean;
};

export function ModuleContentContainer({ children, surface, title, skipContentContainer = false }: Props) {
  const Container = skipContentContainer ? Fragment : ContentContainer;
  return (
    <div className={style({ surface })}>
      {title && (
        <div className='mb-10'>
          <ContentContainer>
            {typeof title === 'string' ? (
              <h2 className='text-8xl font-accent text-center'>{title}</h2>
            ) : (
              <ModuleContentContainerTitle value={title} />
            )}
          </ContentContainer>
        </div>
      )}
      <div>
        <Container>{children}</Container>
      </div>
    </div>
  );
}

const style = tv({
  base: 'py-20 grid grid-rows-[auto_auto]',
  variants: {
    surface: {
      bg: 'bg-bg text-bg-text',
      primary: 'bg-primary text-primary-text'
    }
  }
});
