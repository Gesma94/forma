import type { FormaImageAssetDocumentType, FormaVideoAssetDocumentType } from './generated/sanity-types-generated';

export type TFormaMediaUnwrappedBase = {
  id: string;
  mediaType: FormaImageAssetDocumentType['_type'] | FormaVideoAssetDocumentType['_type'];
  brightness: number;
  showMediaTitle: boolean;
};

export type TFormaMediaImageUnwrapped = TFormaMediaUnwrappedBase & {
  mediaType: FormaImageAssetDocumentType['_type'];
  imageUrl: string;
  imageAltText: string;
};

export type TFormaMediaVideoUnwrapped = TFormaMediaUnwrappedBase & {
  mediaType: FormaVideoAssetDocumentType['_type'];
  isMuted: boolean;
  isLoopEnabled: boolean;
  isAutoplayEnabled: boolean;
  areControlsEnabled: boolean;
  videoUrl: string;
  videoAltText: string;
  thumbnailUrl: string;
};

export type TFormaMediaUnwrapped = TFormaMediaImageUnwrapped | TFormaMediaVideoUnwrapped;
