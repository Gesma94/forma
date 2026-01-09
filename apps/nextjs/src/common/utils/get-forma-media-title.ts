import { isNil } from 'es-toolkit';
import type { TFormaMediaUnwrapped } from 'types/forma-media';

export function getFormaMediaDataTitle(formaMedia: TFormaMediaUnwrapped | null | undefined): string | null {
  if (isNil(formaMedia)) {
    return null;
  }

  if (formaMedia.mediaType === 'formaImageAssetDocumentType') {
    return formaMedia.imageAltText;
  } else if (formaMedia.mediaType === 'forma360AssetDocumentType') {
    return formaMedia.imageAltText;
  } else {
    return formaMedia.videoAltText;
  }
}
