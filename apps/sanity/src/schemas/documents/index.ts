import { assetDocumentTypes } from './assets';
import { commonDocumentSchemaTypes } from './common';
import { layoutDocumentSchemaTypes } from './layout';
import { moduleDocumentSchemaTypes } from './modules';
import { singletonDocumentSchemaTypes } from './singletons';

export const documentSchemaTypes = [
  ...singletonDocumentSchemaTypes,
  ...moduleDocumentSchemaTypes,
  ...layoutDocumentSchemaTypes,
  ...assetDocumentTypes,
  ...commonDocumentSchemaTypes
];
