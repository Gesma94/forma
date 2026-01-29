import { ELEMENT_X_POSITION } from '@forma/common';
import { tv } from 'tailwind-variants';
import type { TeamModuleDocumentType } from 'types/generated/sanity-types-generated';
import { BackgroundVariantContainer } from '@/ui/containers/background-variant-container/background-variant-container';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { VerticalPaddingContainer } from '@/ui/containers/vertical-padding-container/vertical-padding-container';
import { ParagraphPortableText } from '@/ui/portable-text/paragraph-portable-text';
import { getSanityImageUrl } from '@/utils/groqd-client';
import { Header } from './subs/header';
import { TeamCarousel } from './subs/team-carousel';

type TProps = {
  module: TeamModuleDocumentType;
};

export async function TeamModule({ module }: TProps) {
  const { containerStyle, moduleTextsContainerStyle, carouselWrapper } = styles({
    membersPosition: module.teamMembersPosition
  });
  const members = await Promise.all(
    module.teamMembers.map(x => ({ ...x, imageUrl: getSanityImageUrl(x.image, { width: 1400 }) }))
  );

  return (
    <BackgroundVariantContainer variant={module.variant}>
      <VerticalPaddingContainer {...module.paddings}>
        <ModuleContentContainer variant={module.variant}>
          <div className={containerStyle()}>
            <div className={moduleTextsContainerStyle()}>
              <Header value={module.heading} variant={module.variant} />
              <ParagraphPortableText value={module.subHeading} variant={module.variant} />
            </div>
            <div className={carouselWrapper()}>
              <TeamCarousel members={members} variant={module.variant} />
            </div>
          </div>
        </ModuleContentContainer>
      </VerticalPaddingContainer>
    </BackgroundVariantContainer>
  );
}

const styles = tv({
  slots: {
    containerStyle: ['grid', 'gap-8', '2xl:gap-20 xl:min-h-[50rem]'],
    moduleTextsContainerStyle: ['flex flex-col gap-4 md:gap-10 text-center', '2xl:text-left row-start-1'],
    carouselWrapper: 'row-start-1 h-96 lg:h-full'
  },
  variants: {
    membersPosition: {
      [ELEMENT_X_POSITION.LEFT]: {
        containerStyle: 'grid-rows-[auto_auto] grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 xl:grid-cols-[2fr_1fr]',
        carouselWrapper: 'row-start-2 lg:row-start-1 lg:col-start-1',
        moduleTextsContainerStyle: 'row-start-1 col-start-1 lg:col-start-2'
      },
      [ELEMENT_X_POSITION.RIGHT]: {
        containerStyle: 'grid-rows-[auto_auto] grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 xl:grid-cols-[1fr_2fr]',
        carouselWrapper: 'row-start-2 lg:row-start-1 lg:col-start-2',
        moduleTextsContainerStyle: 'row-start-1 col-start-1'
      }
    }
  }
});
