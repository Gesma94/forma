import { MODULE_VARIANTS } from '@forma/common';
import { tv } from 'tailwind-variants';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { ContentContainer } from '@/ui/content-container/content-container';
import { ProcessDescription } from './process-description';
import type { IProcessStep } from './types';

interface IProcessStepProps extends IProcessStep {
  index: number;
}

export function ProcessStep({ title, mainText, estimatedDays, coverImage, coverImageUrl, index }: IProcessStepProps) {
  const {
    mainContainerTv,
    titleTv,
    stepNumberTv,
    contentContainerWrapperTv,
    estimatedDaysWrapperTv,
    textsContainerTv,
    contentContainerTv,
    imageWrapperTv,
    stepNumberWrapperTv,
    coverImageTv
  } = tvStyles({
    isEven: index % 2 === 0
  });

  const variant = index % 2 === 0 ? MODULE_VARIANTS.ON_BG : MODULE_VARIANTS.ON_PRIMARY;

  return (
    <ModuleContentContainer skipContentContainer={true} variant={variant}>
      <div className={contentContainerWrapperTv()}>
        <ContentContainer>
          <div className={mainContainerTv()}>
            <div className={contentContainerTv()}>
              <div className={stepNumberWrapperTv()}>
                <p className={stepNumberTv()}>{index + 1}</p>
              </div>
              <div className={textsContainerTv()}>
                <p className={titleTv()}>{title}</p>
                <div>
                  <ProcessDescription variant={variant} value={mainText} />
                </div>
              </div>
              <div className={estimatedDaysWrapperTv()}>
                <p>Estimated Days: {estimatedDays} days</p>
              </div>
            </div>
            <div className={imageWrapperTv()}>
              <img src={coverImageUrl} alt={coverImage.altText} className={coverImageTv()} />
            </div>
          </div>
        </ContentContainer>
      </div>
    </ModuleContentContainer>
  );
}

const tvStyles = tv({
  slots: {
    contentContainerWrapperTv: '2xl:h-[640px]',
    mainContainerTv: 'h-full grid relative grid-cols-1 2xl:grid-cols-2 2xl:gap-20',
    stepNumberWrapperTv: 'row-start-1 sm:col-start-1 sm:row-start-1 text-9xl font-accent font-bold relative border-r-2',
    stepNumberTv: 'mt-4 2xl:mt-24',
    contentContainerTv: 'grid grid-rows-[auto_auto_auto] sm:grid-cols-[6rem_1fr] sm:grid-rows-[auto_auto] gap-x-10',
    textsContainerTv: 'row-start-2 sm:col-start-2 sm:row-start-1 flex flex-col gap-4',
    estimatedDaysWrapperTv: 'row-start-3sm:col-start-1 sm:col-span-2 sm:row-start-2 uppercase text-sm font-light my-10',
    titleTv: 'uppercase font-accent text-7xl font-bold 2xl:mt-16',
    imageWrapperTv: 'relative 2xl:row-start-1',
    coverImageTv: 'max-h-96 min-h-72 w-full 2xl:max-h-full h-full object-cover rounded-2xl'
  },
  variants: {
    isEven: {
      true: {
        contentContainerWrapperTv: 'bg-bg 2xl:col-start-1',
        imageWrapperTv: '2xl:col-start-2',
        titleTv: 'text-primary',
        stepNumberWrapperTv: ' text-primary border-r-primary',
        estimatedDaysWrapperTv: 'text-text-muted'
      },
      false: {
        contentContainerWrapperTv: 'bg-primary 2xl:col-start-2',
        imageWrapperTv: '2xl:col-start-1',
        titleTv: 'text-primary-text',
        stepNumberWrapperTv: ' text-primary-text border-r-primary-text',
        estimatedDaysWrapperTv: 'text-primary-text'
      }
    }
  }
});
