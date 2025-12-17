import { cardObjectType } from './card';
import { contactObjectType } from './contact';
import { counterObjectType } from './counter';
import { ctaObjectType } from './cta';
import { formaImageInstanceObjectType } from './forma-image-instance';
import { formaMediaInstanceObjectType } from './forma-media-instance';
import { howItWorksObjectType } from './how-it-works-step';
import { imagePairObjectType } from './image-pair';
import { linkObjectType } from './link';
import { listTextItemObjectType } from './list-text-item';
import { processObjectType } from './process-step';
import { scrollGalleryImageObjectType } from './scoll-gallery-image';
import { teamMemberObjectType } from './team-member';

export const objectSchemaTypes = [
  ctaObjectType,
  contactObjectType,
  linkObjectType,
  counterObjectType,
  howItWorksObjectType,
  cardObjectType,
  teamMemberObjectType,
  processObjectType,
  scrollGalleryImageObjectType,
  imagePairObjectType,
  listTextItemObjectType,
  formaImageInstanceObjectType,
  formaMediaInstanceObjectType
];
