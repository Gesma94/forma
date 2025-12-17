import { MODULE_VARIANTS } from '@forma/common';
import { getFormaImageData } from 'common/utils/get-forma-image';
import { tv } from 'tailwind-variants';
import type { CardsModuleDocumentType } from 'types/generated/sanity-types-generated';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { ContentContainer } from '@/ui/content-container/content-container';
import { Card } from './subs/card';
import type { ICard } from './subs/types';

type TProps = {
  module: CardsModuleDocumentType;
};

export async function CardsModule({ module }: TProps) {
  const { listStyle, bgImageStyle, moduleWrapperStyle, contentContainerWrapperStyle } = styles();
  const backgroundImageData = await getFormaImageData(module.backgroundImage);
  const cards = await Promise.all(
    module.cards.map<Promise<ICard>>(async card => ({
      key: card._key,
      title: card.title,
      description: card.description,
      imageData: await getFormaImageData(card.image)
    }))
  );

  return (
    <ModuleContentContainer title={module.heading} variant={MODULE_VARIANTS.ON_PRIMARY} skipContentContainer={true}>
      <div className={moduleWrapperStyle()}>
        {module.showBgImage && <img src={backgroundImageData.imageUrl} alt={backgroundImageData.imageAltText} className={bgImageStyle()} />}
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
