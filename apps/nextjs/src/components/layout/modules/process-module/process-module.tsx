import type { ProcessModuleDocumentType } from 'types/generated/sanity-types-generated';
import { getSanityImageUrl } from '@/utils/groqd-client';
import { ProcessStep } from './subs/proces-step';
import type { IProcessStep } from './subs/types';

type TProcessModuleProps = {
  module: ProcessModuleDocumentType;
};

export const ProcessModule = ({ module }: TProcessModuleProps) => {
  const processSteps = module.steps.map<IProcessStep>(step => ({
    key: step._key,
    title: step.title,
    mainText: step.description,
    estimatedDays: step.estimatedDays,
    coverImage: step.smallImage,
    coverImageUrl: getSanityImageUrl(step.smallImage)
  }));

  return (
    <ol className='flex flex-col'>
      {processSteps.map(({ key, ...step }, index) => (
        <li key={key}>
          <ProcessStep
            isFirst={index === 0}
            isLast={index === processSteps.length - 1}
            key={key}
            {...step}
            index={index}
          />
        </li>
      ))}
    </ol>
  );
};
