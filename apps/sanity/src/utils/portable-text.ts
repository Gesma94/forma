import { isPortableTextTextBlock, type PortableTextBlock } from 'sanity';

export function textBlockToPlainText(blocks: PortableTextBlock[] = []) {
  return (
    blocks
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
      .join('\n\n')
  );
}
