import type { HeroModuleDocumentType } from 'types/generated/sanity-types-generated';

type TProps = {
  module: HeroModuleDocumentType;
};

export function HeroModule({ module }: TProps) {
  return <div>{module.firmsText}</div>;
}
