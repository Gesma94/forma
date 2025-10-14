import { MODULE_VARIANTS } from '@forma/common';
import { tv } from 'tailwind-variants';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { ContentContainer } from '@/ui/content-container/content-container';
import { ProcessDescription } from './process-description';
import type { IProcessStep } from './types';

interface IProcessStepProps extends IProcessStep {
  index: number;
  isFirst: boolean;
  isLast: boolean;
}

export function ProcessStep({
  title,
  mainText,
  estimatedDays,
  coverImage,
  coverImageUrl,
  isFirst,
  isLast,
  index
}: IProcessStepProps) {
  const {
    mainContainerTv,
    titleTv,
    leftPanelTv,
    preLineTv,
    secondStraightLineTv,
    stepNumberTv,
    outerContainerTv,
    outsideBottomContainerTv,
    outsideFirstVerticalLineTv,
    outsideHorizontalLineTv,
    outsideThirdVerticalLineTv,
    contentContainerWrapperTv,
    estimatedDaysWrapperTv,
    firstStraightLineTv,
    textsContainerTv,
    contentContainerTv,
    mainTextTv,
    stepNumberWrapperTv,
    coverImageTv
  } = tvStyles({
    isEven: index % 2 === 0,
    isFirst,
    isLast
  });

  const variant = index % 2 === 0 ? MODULE_VARIANTS.ON_BG : MODULE_VARIANTS.ON_PRIMARY;

  return (
    <ModuleContentContainer skipContentContainer={true} variant={variant}>
      <div className={outerContainerTv()}>
        <div className={contentContainerWrapperTv()}>
          <ContentContainer>
            <div className={mainContainerTv()}>
              <div className={leftPanelTv()}>
                <div className={preLineTv()} />
                <div className={contentContainerTv()}>
                  <div className={stepNumberWrapperTv()}>
                    <p className={stepNumberTv()}>{index + 1}</p>
                    <div className={firstStraightLineTv()} />
                  </div>
                  <div className={textsContainerTv()}>
                    <p className={titleTv()}>{title}</p>
                    <div className={mainTextTv()}>
                      <ProcessDescription variant={variant} value={mainText} />
                    </div>
                  </div>
                  <div className={estimatedDaysWrapperTv()}>
                    <p>Estimated Days: {estimatedDays} days</p>
                  </div>
                </div>
                <div>
                  <div className={secondStraightLineTv()} />
                </div>
              </div>
              <div>
                <img src={coverImageUrl} alt={coverImage.altText} className={coverImageTv()} />
              </div>
              <div className={outsideBottomContainerTv()}>
                <div className={outsideFirstVerticalLineTv()} />
                <div className={outsideHorizontalLineTv()} />
                <div className={outsideThirdVerticalLineTv()} />
              </div>
            </div>
          </ContentContainer>
        </div>
      </div>
    </ModuleContentContainer>
  );
}

const tvStyles = tv({
  slots: {
    outerContainerTv: 'flex flex-col',
    contentContainerWrapperTv: 'h-[640px]',
    mainContainerTv: ['h-full grid relative', 'grid-cols-1 2xl:grid-cols-2 gap-20'],
    leftPanelTv: 'grid grid-rows-[auto_1fr] relative',
    stepNumberTv: 'mt-24',
    contentContainerTv: ['grid grid-cols-[6rem_1fr] grid-rows-[auto_auto] gap-x-10'],
    textsContainerTv: 'col-start-2 row-start-1 flex flex-col gap-4',
    estimatedDaysWrapperTv: 'col-start-1 col-span-2 row-start-2 uppercase text-sm font-light my-10',
    stepNumberWrapperTv: 'col-start-1 row-start-1 text-9xl font-accent font-bold relative',

    titleTv: 'uppercase font-accent text-7xl font-bold mt-16',
    mainTextTv: '',
    preLineTv: 'w-0.5 h-20 absolute -translate-y-full left-24  -translate-x-1 ',
    coverImageTv: 'h-full object-cover rounded-2xl',
    firstStraightLineTv: 'h-full w-0.5 absolute top-0 -translate-x-1 left-24',
    secondStraightLineTv: 'h-full w-0.5 relative -translate-x-1 left-24',
    outsideBottomContainerTv: 'absolute bottom-0 translate-y-full w-full h-20',
    outsideFirstVerticalLineTv: 'h-1/2 w-0.5 absolute  -translate-x-1 left-24',
    outsideHorizontalLineTv: 'h-0.5 left-24 -translate-x-1 w-[calc(50%_+_2.5rem)] absolute top-1/2',
    outsideThirdVerticalLineTv: 'h-1/2 w-0.5 absolute left-1/2 translate-x-[8.25rem]'
  },
  variants: {
    isEven: {
      true: {
        leftPanelTv: '-order-1',
        contentContainerWrapperTv: 'bg-bg',
        titleTv: 'text-primary',
        stepNumberWrapperTv: ' text-primary',
        secondStraightLineTv: 'bg-primary',
        firstStraightLineTv: 'bg-primary',
        estimatedDaysWrapperTv: 'text-text-muted',
        preLineTv: 'bg-primary',
        outsideFirstVerticalLineTv: 'bg-primary top-0',
        outsideHorizontalLineTv: 'bg-primary',
        outsideThirdVerticalLineTv: 'bg-primary top-1/2'
      },
      false: {
        leftPanelTv: 'order-1',
        contentContainerWrapperTv: 'bg-primary',
        preLineTv: 'bg-bg',
        estimatedDaysWrapperTv: 'text-primary-text',
        titleTv: 'text-primary-text',
        stepNumberWrapperTv: ' text-primary-text',
        secondStraightLineTv: 'bg-bg',
        firstStraightLineTv: 'bg-bg',
        outsideFirstVerticalLineTv: 'bg-bg top-1/2',
        outsideHorizontalLineTv: 'bg-bg',
        outsideThirdVerticalLineTv: 'bg-bg top-0'
      }
    },
    isFirst: {
      true: {
        preLineTv: 'hidden'
      }
    },
    isLast: {
      true: {
        secondStraightLineTv: 'hidden',
        outsideBottomContainerTv: 'hidden'
      }
    }
  }
});
