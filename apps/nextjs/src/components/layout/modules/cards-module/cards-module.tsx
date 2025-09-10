import { MODULE_VARIANTS } from '@forma/common';
import { tv } from 'tailwind-variants';
import type { CardsModuleDocumentType } from 'types/generated/sanity-types-generated';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { ContentContainer } from '@/ui/content-container/content-container';
import { getSanityImageUrl } from '@/utils/groqd-client';
import { Card } from './subs/card';
import type { ICard } from './subs/types';

type TProps = {
  module: CardsModuleDocumentType;
};

export function CardsModule({ module }: TProps) {
  const { listStyle, bgImageStyle, moduleWrapperStyle, contentContainerWrapperStyle } = styles();
  const bgImageUrl = getSanityImageUrl(module.backgroundImage);
  const cards = module.cards.map<ICard>(card => ({
    title: card.title,
    description: card.description,
    image: card.image,
    imageUrl: getSanityImageUrl(card.image),
    key: card._key
  }));

  return (
    <ModuleContentContainer title={module.heading} variant={MODULE_VARIANTS.ON_PRIMARY} skipContentContainer={true}>
      <div className={moduleWrapperStyle()}>
        <img src={bgImageUrl} alt={module.backgroundImage.altText} className={bgImageStyle()} />
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
