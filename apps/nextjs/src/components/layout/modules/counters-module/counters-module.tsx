import { MODULE_VARIANTS } from '@forma/common';
import type { CountersModuleDocumentType } from 'types/generated/sanity-types-generated';
import { BackgroundVariantContainer } from '@/ui/containers/background-variant-container/background-variant-container';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { VerticalPaddingContainer } from '@/ui/containers/vertical-padding-container/vertical-padding-container';
import { Counter } from './subs/counter';

type TProps = {
  module: CountersModuleDocumentType;
};

export function CountersModule({ module }: TProps) {
  const variant = MODULE_VARIANTS.ON_PRIMARY;
  return (
    <BackgroundVariantContainer variant={variant}>
      <VerticalPaddingContainer {...module.paddings}>
        <ModuleContentContainer variant={variant} title={module.heading}>
          <div className='grid gap-4 grid-rows-4 grid-cols-1 sm:grid-rows-2 sm:grid-cols-2 xl:grid-rows-1 xl:grid-cols-4'>
            {module.counters.map(x => (
              <Counter content={x.content} postfix={x.postfix} value={x.value} key={x._key} />
            ))}
          </div>
        </ModuleContentContainer>
      </VerticalPaddingContainer>
    </BackgroundVariantContainer>
  );
}
