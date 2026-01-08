import { cardObjectType } from './card';
import { contactObjectType } from './contact';
import { counterObjectType } from './counter';
import { ctaObjectType } from './cta';
import { forma360InstanceObjectType } from './forma-360-instance';
import { formaImageInstanceObjectType } from './forma-image-instance';
import { formaMediaInstanceObjectType } from './forma-media-instance';
import { howItWorksObjectType } from './how-it-works-step';
import { imagePairObjectType } from './image-pair';
import { linkObjectType } from './link';
import { listTextItemObjectType } from './list-text-item';
import { pageMetadataObjectType } from './page-metadata';
import { scrollGalleryImageObjectType } from './scoll-gallery-image';
import { serviceObjectType } from './service';
import { teamMemberObjectType } from './team-member';

export const objectSchemaTypes = [
  ctaObjectType,
  contactObjectType,
  linkObjectType,
  counterObjectType,
  howItWorksObjectType,
  cardObjectType,
  teamMemberObjectType,
  scrollGalleryImageObjectType,
  imagePairObjectType,
  listTextItemObjectType,
  serviceObjectType,
  formaImageInstanceObjectType,
  formaMediaInstanceObjectType,
  forma360InstanceObjectType,
  pageMetadataObjectType
];
