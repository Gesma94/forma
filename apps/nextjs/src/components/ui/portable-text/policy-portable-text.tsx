import { PortableText } from '@portabletext/react';
import { tv } from 'tailwind-variants';
import type { PolicyPageDocumentType } from 'types/generated/sanity-types-generated';
import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';

type TProps = {
  value: PolicyPageDocumentType['content'];
};

export function PolicyPortableText({ value }: TProps) {
  const { normalTv, h2Tv, h3Tv, listBulletItemTv, listNumberItemTv, listBulletTv, listNumberTv } = style();

  return (
    <PortableText
      value={value}
      components={{
        list: {
          bullet: ({ children }) => <ul className={listBulletTv()}>{children}</ul>,
          number: ({ children }) => <ol className={listNumberTv()}>{children}</ol>
        },
        listItem: {
          bullet: ({ children }) => <li className={listBulletItemTv()}>{children}</li>,
          number: ({ children }) => <li className={listNumberItemTv()}>{children}</li>
        },
        block: {
          normal: ({ children }) => <p className={normalTv()}>{children}</p>,
          h1: ({ children }) => <h2 className={h2Tv()}>{children}</h2>,
          h3: ({ children }) => <h3 className={h3Tv()}>{children}</h3>
        },
        marks: {
          em: PortableTextEmComponent,
          strong: PortableTextStrongComponent,
          link: ({ value }) => {
            return (
              <a className='text-primary hover:text-primary-hover underline' href={value.href}>
                {value.caption}
              </a>
            );
          }
        }
      }}
    />
  );
}

const style = tv({
  slots: {
    normalTv: 'prose-xl prose-p:my-0 text-bg-text',
    h2Tv: 'text-5xl md:text-8xl mt-8 mb-6 text-primary',
    h3Tv: 'text-3xl md:text-5xl mt-4 mb-4 text-primary',
    listBulletTv: 'flex flex-col pl-4 text-bg-text mt-0',
    listNumberTv: 'flex flex-col pl-4  list-decimal ml-4 ',
    listBulletItemTv:
      'prose-xl prose-p:my-0 before:content-[""] before:inline-block before:mr-4 before:relative before:-top-0.5 before:size-2 before:bg-primary  before:rounded-full mt-0 mb-0',
    listNumberItemTv: 'prose-xl prose-p:my-0 pl-1 text-bg-text marker:text-primary'
  }
});
