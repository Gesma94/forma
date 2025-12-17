import { getFormaImageData } from 'common/utils/get-forma-image';
import type { ProcessModuleDocumentType } from 'types/generated/sanity-types-generated';
import { ProcessStep } from './subs/proces-step';
import type { IProcessStep } from './subs/types';

type TProcessModuleProps = {
  module: ProcessModuleDocumentType;
};

export const ProcessModule = async ({ module }: TProcessModuleProps) => {
  const processSteps = await Promise.all(
    module.steps.map<Promise<IProcessStep>>(async step => ({
      key: step._key,
      title: step.title,
      mainText: step.description,
      estimatedDays: step.estimatedDays,
      coverImageData: await getFormaImageData(step.smallImage)
    }))
  );

  return (
    <ol className='flex flex-col'>
      {processSteps.map((step, index) => (
        <li key={module.steps[index]._key}>
          <ProcessStep {...step} index={index} />
        </li>
      ))}
    </ol>
  );
};
