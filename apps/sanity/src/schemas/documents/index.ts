import { footerDocumentType } from './footer';
import { layoutDocumentSchemaTypes } from './layout';
import { moduleDocumentSchemaTypes } from './modules';

export const documentSchemaTypes = [footerDocumentType, ...moduleDocumentSchemaTypes, ...layoutDocumentSchemaTypes];
