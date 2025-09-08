import { MODULE_VARIANTS } from '@forma/common';
import type { ServicesModuleDocumentType } from 'types/generated/sanity-types-generated';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { ContentContainer } from '@/ui/content-container/content-container';
import { ParagraphPortableText } from '@/ui/portable-text/paragraph-portable-text';
import { q, runQuery } from '@/utils/groqd-client';
import { ServicesBoard } from './subs/services-board';

type TProps = {
  module: ServicesModuleDocumentType;
};

type TSanityQueryParams = {
  moduleId: string;
};

export async function ServicesModule({ module }: TProps) {
  const videos = await runQuery(
    q
      .parameters<TSanityQueryParams>()
      .star.filterByType('servicesModuleDocumentType')
      .filterBy('_id == $moduleId')
      .slice(0)
      .project(sub => ({
        animationsServiceVideo: sub.field('animationsServiceVideo').field('asset').deref(),
        stillImageServiceVideo: sub.field('stillImageServiceVideo').field('asset').deref(),
        vrServiceVideo: sub.field('vrServiceVideo').field('asset').deref()
      })),
    { parameters: { moduleId: module._id } }
  );

  return (
    <div className='pt-10 md:pt-20'>
      <ModuleContentContainer title={module.heading} skipContentContainer={true} skipYPadding={true}>
        <div>
          <div>
            <ContentContainer>
              <ParagraphPortableText
                value={module.subHeading}
                variant={MODULE_VARIANTS.ON_BG}
                className='text-center'
              />
            </ContentContainer>
          </div>
        </div>
        <div className='mt-10'>
          <ServicesBoard
            stillImageServiceCard={{
              title: module.stillImageServiceTitle,
              content: module.stillImageServiceContent,
              video: videos.stillImageServiceVideo
            }}
            vrServiceCard={{
              title: module.vrServiceTitle,
              content: module.vrServiceContent,
              video: videos.vrServiceVideo
            }}
            animationsServiceCard={{
              title: module.animationsServiceTitle,
              content: module.animationsServiceContent,
              video: videos.animationsServiceVideo
            }}
          />
        </div>
      </ModuleContentContainer>
    </div>
  );
}
