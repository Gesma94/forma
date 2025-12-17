import { IFormImageInstance } from 'common/utils/get-forma-image';

export interface IProcessStep {
  title: string;
  mainText: TBasePortableTextValue;
  estimatedDays: number;
  coverImageData: IFormImageInstance;
}
