import { MODULE_VARIANTS, SANITY_DOCUMENT_IDS, type TModuleVariants } from '@forma/common';
import { isPortableTextTextBlock, type PortableTextBlock } from 'sanity';

export function getPageTitleFromId(pageId: string): string {
  if (pageId.startsWith('drafts.')) {
    pageId = pageId.replace('drafts.', '');
  }

  if (pageId === SANITY_DOCUMENT_IDS.homepage) {
    return 'Homepage';
  }
  if (pageId === SANITY_DOCUMENT_IDS.bookpage) {
    return 'Book';
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
