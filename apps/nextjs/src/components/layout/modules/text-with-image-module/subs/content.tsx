import { MODULE_VARIANTS, type TModuleVariants } from '@forma/common';
import { PortableText } from '@portabletext/react';
import { tv } from 'tailwind-variants';
import type { TextWithImageModuleDocumentType } from 'types/generated/sanity-types-generated';
import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';

type TProps = {
  variant: TModuleVariants;
  value: TextWithImageModuleDocumentType['content'];
};

export function ContentPortableText({ value, variant }: TProps) {
  const { normalTv, h2Tv, h3Tv, listItemTv, listTv } = style({ variant });

  return (
    <PortableText
      value={value}
      components={{
        list: {
          bullet: ({ children }) => <ul className={listTv()}>{children}</ul>
        },
        listItem: {
          bullet: ({ children }) => <li className={listItemTv()}>{children}</li>
        },
        block: {
          normal: ({ children }) => <p className={normalTv()}>{children}</p>,
          h1: ({ children }) => <h2 className={h2Tv()}>{children}</h2>,
          h3: ({ children }) => <h3 className={h3Tv()}>{children}</h3>
        },
        marks: {
          em: PortableTextEmComponent,
          strong: PortableTextStrongComponent
        }
      }}
    />
  );
}

const style = tv({
  slots: {
    normalTv: 'prose-xl prose-p:my-0',
    h2Tv: 'text-5xl md:text-8xl pb-8',
    h3Tv: 'text-3xl md:text-5xl pb-4',
    listTv: 'flex flex-col pl-4',
    listItemTv:
      'prose-xl prose-p:my-0 before:content-[""] before:inline-block before:mr-4 before:relative before:-top-0.5 before:size-2 before:bg-primary  before:rounded-full'
  },
  variants: {
    variant: {
      [MODULE_VARIANTS.ON_BG]: {
        normalTv: 'text-bg-text',
        h2Tv: 'text-primary',
        h3Tv: 'text-primary'
      },
      [MODULE_VARIANTS.ON_PRIMARY]: {
        normalTv: 'text-primary-text',
        h2Tv: 'text-primary-text',
        h3Tv: 'text-primary-text'
      }
    }
  }
});
