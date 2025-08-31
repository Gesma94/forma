import type { CountersModuleDocumentType } from 'types/generated/sanity-types-generated';
import { ModuleContentContainer } from '@/ui/containers/module-content-container/module-content-container';
import { Counter } from './subs/counter';
import { MODULE_VARIANTS } from '@forma/common';

type TProps = {
  module: CountersModuleDocumentType;
};

export function CountersModule({ module }: TProps) {
  return (
    <ModuleContentContainer variant={MODULE_VARIANTS.ON_PRIMARY} title={module.heading}>
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'>
        {module.counters.map(x => (
          <Counter content={x.content} postfix={x.postfix} value={x.value} key={x._key} />
        ))}
      </div>
    </ModuleContentContainer>
  );
}
