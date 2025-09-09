import { MODULE_VARIANTS } from '@forma/common';
import { tv } from 'tailwind-variants';
import type { HowItWorksModuleDocumentType } from 'types/generated/sanity-types-generated';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { ParagraphPortableText } from '@/ui/portable-text/paragraph-portable-text';
import { Step } from './subs/step';

type TProps = {
  module: HowItWorksModuleDocumentType;
};

export function HowItWorksModule({ module }: TProps) {
  const { listStyle } = styles();

  return (
    <ModuleContentContainer title={module.heading}>
      <ParagraphPortableText value={module.subHeading} variant={MODULE_VARIANTS.ON_BG} className='text-center' />
      <div className='mt-10'>
        <ol className={listStyle()}>
          {module.steps.map((step, index) => (
            <Step step={step} key={step._key} number={index + 1} />
          ))}
        </ol>
      </div>
    </ModuleContentContainer>
  );
}

const styles = tv({
  slots: {
    listStyle: [
      'grid justify-center items-center',
      'grid-cols-1 grid-flow-row gap-y-10',
      'lg:grid-flow-col lg:grid-cols-4 lg:grid-rows-[auto_auto_auto_auto_auto] lg:gap-x-4 lg:gap-y-0',
      'xl:gap-x-10'
    ]
  }
});
