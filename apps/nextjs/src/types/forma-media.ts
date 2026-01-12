import type {
  Forma360AssetDocumentType,
  FormaImageAssetDocumentType,
  FormaVideoAssetDocumentType
} from './generated/sanity-types-generated';

export type TFormaMediaUnwrappedBase = {
  id: string;
  mediaType:
    | FormaImageAssetDocumentType['_type']
    | FormaVideoAssetDocumentType['_type']
    | Forma360AssetDocumentType['_type'];
  brightness: number;
  showMediaTitle: boolean;
};

export type TFormaMediaImageUnwrapped = TFormaMediaUnwrappedBase & {
  mediaType: FormaImageAssetDocumentType['_type'];
  imageUrl: string;
  imageAltText: string;
};

export type TFormaMedia360Unwrapped = TFormaMediaUnwrappedBase & {
  mediaType: Forma360AssetDocumentType['_type'];
  imageUrl: string;
  imageAltText: string;
  isZoomEnabled: boolean;
  initialZoom: number;
  is360AutoplayEnabled: boolean;
  is360HintShown: boolean;
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

export type TFormaMediaUnwrapped = TFormaMedia360Unwrapped | TFormaMediaImageUnwrapped | TFormaMediaVideoUnwrapped;
