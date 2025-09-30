import { tv } from 'tailwind-variants';
import type { TeamModuleDocumentType } from 'types/generated/sanity-types-generated';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { ContentContainer } from '@/ui/content-container/content-container';
import { ParagraphPortableText } from '@/ui/portable-text/paragraph-portable-text';
import { getSanityImageUrl } from '@/utils/groqd-client';
import { Header } from './subs/header';
import { TeamCarousel } from './subs/team-carousel';

type TProps = {
  module: TeamModuleDocumentType;
};

export async function TeamModule({ module }: TProps) {
  const { containerStyle, moduleTextsContainerStyle } = styles();
  const members = await Promise.all(module.teamMembers.map(x => ({ ...x, imageUrl: getSanityImageUrl(x.image) })));

  return (
    <ModuleContentContainer variant={module.variant}>
      <ContentContainer>
        <div className={containerStyle()}>
          <div className={moduleTextsContainerStyle()}>
            <Header value={module.heading} variant={module.variant} />
            <ParagraphPortableText value={module.subHeading} variant={module.variant} />
          </div>
          <TeamCarousel members={members} variant={module.variant} />
        </div>
      </ContentContainer>
    </ModuleContentContainer>
  );
}

const styles = tv({
  slots: {
    containerStyle: ['grid', 'grid-rows-[auto_auto] gap-8', '2xl:grid-rows-1 2xl:grid-cols-[auto_auto] 2xl:gap-20'],
    moduleTextsContainerStyle: ['flex flex-col gap-4 md:gap-10 text-center', '2xl:text-left 2xl:mt-20']
  }
});
