import { ELEMENT_X_POSITION, MODULE_VARIANTS } from '@forma/common';
import { tv } from 'tailwind-variants';
import type { ProcessModuleDocumentType } from 'types/generated/sanity-types-generated';
import { BackgroundVariantContainer } from '@/ui/containers/background-variant-container/background-variant-container';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { VerticalPaddingContainer } from '@/ui/containers/vertical-padding-container/vertical-padding-container';
import { FormaMedia } from '@/ui/forma-media/forma-media';
import { Heading } from './subs/heading';
import { ProcessDescription } from './subs/process-description';

type TProcessModuleProps = {
  module: ProcessModuleDocumentType;
};

export const ProcessModule = async ({ module }: TProcessModuleProps) => {
  const { description, estimatedDays, heading, image, imagePosition, paddings, order, variant } = module;
  const {
    contentContainerTv,
    coverImageTv,
    estimatedDaysTv,
    imageWrapperTv,
    mainContainerTv,
    stepNumberTv,
    stepNumberWrapperTv,
    textsContainerTv
  } = tvStyles({ imagePosition, variant });
  return (
    <BackgroundVariantContainer variant={variant}>
      <VerticalPaddingContainer {...paddings}>
        <ModuleContentContainer variant={variant}>
          <div className={mainContainerTv()}>
            <div className={contentContainerTv()}>
              <div className={stepNumberWrapperTv()}>
                <p className={stepNumberTv()}>{order}</p>
              </div>
              <div className={textsContainerTv()}>
                <Heading value={heading} variant={variant} />
                <div>
                  <ProcessDescription variant={variant} value={description} />
                </div>
                <p className={estimatedDaysTv()}>Estimated Days: {estimatedDays} days</p>
              </div>
            </div>
            <div className={imageWrapperTv()}>
              <FormaMedia formaMedia={image} className={coverImageTv()} />
            </div>
          </div>
        </ModuleContentContainer>
      </VerticalPaddingContainer>
    </BackgroundVariantContainer>
  );
};

const tvStyles = tv({
  slots: {
    mainContainerTv: 'h-full grid relative grid-cols-1 2xl:gap-20',
    stepNumberWrapperTv: 'row-start-1 sm:col-start-1 sm:row-start-1 text-9xl font-bold relative border-r-2',
    stepNumberTv: 'mt-4 2xl:mt-24',
    contentContainerTv: 'grid sm:grid-cols-[6rem_1fr] gap-x-10 mb-auto',
    textsContainerTv: 'row-start-2 sm:col-start-2 sm:row-start-1 flex flex-col gap-4',
    estimatedDaysTv: 'uppercase text-sm mt-4',
    imageWrapperTv: 'relative 2xl:row-start-1',
    coverImageTv: 'w-full h-[48rem] object-cover rounded-2xl'
  },
  variants: {
    variant: {
      [MODULE_VARIANTS.ON_BG]: {
        stepNumberWrapperTv: ' text-primary border-r-primary',
        estimatedDaysTv: 'text-text-muted'
      },
      [MODULE_VARIANTS.ON_PRIMARY]: {
        stepNumberWrapperTv: ' text-primary-text border-r-primary-text',
        estimatedDaysTv: 'text-primary-text'
      }
    },
    imagePosition: {
      [ELEMENT_X_POSITION.RIGHT]: {
        mainContainerTv: '2xl:grid-cols-[1fr_2fr]',
        imageWrapperTv: '2xl:col-start-2'
      },
      [ELEMENT_X_POSITION.LEFT]: {
        mainContainerTv: '2xl:grid-cols-[2fr_1fr]',
        imageWrapperTv: '2xl:col-start-1'
      }
    }
  }
});
