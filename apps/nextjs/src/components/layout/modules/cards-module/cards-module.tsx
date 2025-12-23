import { MODULE_VARIANTS } from '@forma/common';
import { getFormaMediaData } from 'common/utils/get-forma-media';
import { tv } from 'tailwind-variants';
import type { CardsModuleDocumentType } from 'types/generated/sanity-types-generated';
import { BackgroundVariantContainer } from '@/ui/containers/background-variant-container/background-variant-container';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { VerticalPaddingContainer } from '@/ui/containers/vertical-padding-container/vertical-padding-container';
import { ContentContainer } from '@/ui/content-container/content-container';
import { Card } from './subs/card';
import type { ICard } from './subs/types';

type TProps = {
  module: CardsModuleDocumentType;
};

export async function CardsModule({ module }: TProps) {
  const variant = MODULE_VARIANTS.ON_PRIMARY;
  const { listStyle, moduleWrapperStyle, contentContainerWrapperStyle } = styles();
  const cards = await Promise.all(
    module.cards.map<Promise<ICard>>(async card => ({
      key: card._key,
      title: card.title,
      description: card.description,
      formaMedia: await getFormaMediaData(card.media)
    }))
  );

  return (
    <BackgroundVariantContainer variant={variant}>
      <VerticalPaddingContainer {...module.paddings}>
        <ModuleContentContainer title={module.heading} variant={variant} skipContentContainer={true}>
          <div className={moduleWrapperStyle()}>
            <div className={contentContainerWrapperStyle()}>
              <ContentContainer>
                <ul className={listStyle()}>
                  {cards.map(card => (
                    <Card card={card} key={card.key} />
                  ))}
                </ul>
              </ContentContainer>
            </div>
          </div>
        </ModuleContentContainer>
      </VerticalPaddingContainer>
    </BackgroundVariantContainer>
  );
}

const styles = tv({
  slots: {
    listStyle: ['grid grid-rows-2 gap-10', 'lg:grid-rows-1 lg:grid-cols-2 lg:gap-4 xl:gap-10'],
    moduleWrapperStyle: 'relative mt-4 md:mt-10',
    bgImageStyle: 'bg-bg-border-active w-full h-full absolute object-cover brightness-[0.32] -bottom-10 md:-bottom-20',
    contentContainerWrapperStyle: 'relative'
  }
});
