import { MODULE_VARIANTS, SANITY_DOCUMENT_IDS, type TModuleVariants } from '@forma/common';
import { FileImageIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { isPortableTextTextBlock, type PortableTextBlock } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES, type FORMA_MEDIA_SELECT_PROPS } from './constants';

export function getPageTitleFromId(pageId: string): string {
  if (pageId.startsWith('drafts.')) {
    pageId = pageId.replace('drafts.', '');
  }

  if (pageId === SANITY_DOCUMENT_IDS.homepage) {
    return 'Homepage';
  }
  if (pageId === SANITY_DOCUMENT_IDS.bookpage) {
    return 'Book Page';
  }
  if (pageId === SANITY_DOCUMENT_IDS.processpage) {
    return 'Process Page';
  }
  if (pageId === SANITY_DOCUMENT_IDS.contactUsPage) {
    return 'Contact Us';
  }
  if (pageId === SANITY_DOCUMENT_IDS.gallerypage) {
    return 'Gallery Page';
  }
  if (pageId === SANITY_DOCUMENT_IDS.architecturalStillsPage) {
    return 'Service - Architectural Stills';
  }
  if (pageId === SANITY_DOCUMENT_IDS.videoAnimationsPage) {
    return 'Service - Video Animations';
  }
  if (pageId === SANITY_DOCUMENT_IDS.virtualToursPage) {
    return 'Service - Virtual Tours';
  }

  return 'Unknown Page';
}

export function textBlockToPlainText(blocks: PortableTextBlock[] = [], charLimit?: number) {
  const plainText = blocks
    // loop through each block
    .map(block => {
      // if it's not a text block with children,
      // return nothing
      if (block._type !== 'block' || !block.children) {
        return '';
      }

      if (isPortableTextTextBlock(block)) {
        // loop through the children spans, and join the
        // text strings
        return block.children.map(child => child.text).join('');
      }
    })
    // join the paragraphs leaving split by two linebreaks
    .join('\n\n');

  return charLimit && plainText.length > charLimit ? `${plainText.slice(0, charLimit)}...` : plainText;
}

export function getVariantTitle(variant: TModuleVariants) {
  switch (variant) {
    case MODULE_VARIANTS.ON_BG:
      return 'On BG';
    case MODULE_VARIANTS.ON_PRIMARY:
      return 'On Primary';
  }
}

export function getFormaImageAssetName(imageTitle: string, clientName: string): string | null {
  const elements: string[] = [];

  if (clientName) {
    elements.push(clientName);
  }

  if (imageTitle) {
    elements.push(imageTitle);
  }

  if (elements.length > 0) {
    return elements.join(' - ');
  }

  return null;
}

type TGetFormaMediaTitleParams = {
  formaMediaType: string;
  formaImageClientName?: string;
  formaImageTitle?: string;
  formaVideoClientName?: string;
  formaVideoTitle?: string;
  formaMediaOverrideAltText?: string;
};

export function getFormaMediaTitle({
  formaMediaType,
  formaImageClientName,
  formaImageTitle,
  formaMediaOverrideAltText,
  formaVideoClientName,
  formaVideoTitle
}: TGetFormaMediaTitleParams): string {
  if (formaMediaOverrideAltText) {
    return formaMediaOverrideAltText;
  }

  const elements: string[] = [];

  if (
    formaMediaType === DOCUMENT_SCHEMA_TYPES.formaImageAsset ||
    formaMediaType === DOCUMENT_SCHEMA_TYPES.forma360Asset
  ) {
    if (formaImageClientName) {
      elements.push(formaImageClientName);
    }

    if (formaImageTitle) {
      elements.push(formaImageTitle);
    }
  } else if (formaMediaType === DOCUMENT_SCHEMA_TYPES.formaVideoAsset) {
    if (formaVideoClientName) {
      elements.push(formaVideoClientName);
    }

    if (formaVideoTitle) {
      elements.push(formaVideoTitle);
    }
  }

  return elements.length > 0 ? elements.join(' - ') : 'Unnamed Forma Media';
}

type TGetFormaMediaMediaParams = {
  formaMediaType: string;
  formaMediaImage: ReactNode;
  formaMediaVideoThumbnail: ReactNode;
};

export function getFormaMediaMedia({
  formaMediaImage,
  formaMediaType,
  formaMediaVideoThumbnail
}: TGetFormaMediaMediaParams) {
  if (
    formaMediaType === DOCUMENT_SCHEMA_TYPES.formaImageAsset ||
    formaMediaType === DOCUMENT_SCHEMA_TYPES.forma360Asset
  ) {
    return formaMediaImage;
  } else if (formaMediaType === DOCUMENT_SCHEMA_TYPES.formaVideoAsset) {
    return formaMediaVideoThumbnail;
  }

  return FileImageIcon;
}

export function getFormaMediaSelectProps(fieldName: string): typeof FORMA_MEDIA_SELECT_PROPS {
  return {
    formaMediaType: `${fieldName}.formaMedia._type`,
    formaImageClientName: `${fieldName}.formaMedia.clientName`,
    formaVideoClientName: `${fieldName}.formaMedia.clientName`,
    formaImageTitle: `${fieldName}.formaMedia.imageTitle`,
    formaVideoTitle: `${fieldName}.formaMedia.videoTitle`,
    formaMediaOverrideAltText: `${fieldName}.overrideAltText`,
    formaMediaImage: `${fieldName}.formaMedia.image`,
    formaMediaVideoThumbnail: `${fieldName}.formaMedia.thumbnail`
  };
}

export function getModuleTitleWithFriendlyName(title?: PortableTextBlock[], friendlyName?: string): string {
  if (title && friendlyName) {
    return `${textBlockToPlainText(title)} (${friendlyName})`;
  }

  if (title && !friendlyName) {
    return textBlockToPlainText(title);
  }

  if (!title && friendlyName) {
    return friendlyName;
  }

  return 'Unnamed Module';
}
