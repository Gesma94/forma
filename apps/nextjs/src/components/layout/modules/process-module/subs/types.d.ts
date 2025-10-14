export interface IProcessStep {
  key: string;
  title: string;
  mainText: TBasePortableTextValue;
  estimatedDays: number;
  coverImage: IterableElement<ProcessModuleDocumentType['steps']>['smallImage'];
  coverImageUrl: string;
}
