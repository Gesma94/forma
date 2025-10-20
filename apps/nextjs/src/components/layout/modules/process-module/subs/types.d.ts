export interface IProcessStep {
  title: string;
  mainText: TBasePortableTextValue;
  estimatedDays: number;
  coverImage: IterableElement<ProcessModuleDocumentType['steps']>['smallImage'];
  coverImageUrl: string;
}
