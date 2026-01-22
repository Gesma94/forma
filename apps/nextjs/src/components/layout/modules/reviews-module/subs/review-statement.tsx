import { MODULE_VARIANTS } from '@forma/common';
import { tv, type VariantProps } from 'tailwind-variants';
import { PortableTextEmComponent, PortableTextStrongComponent } from '@/ui/portable-text/base-components';
import { BasePortableText, type TBasePortableTextConsumerProps } from '@/ui/portable-text/base-portable-text';

export type TReviewStatementProps = VariantProps<typeof style> & TBasePortableTextConsumerProps;

export function ReviewStatement({ value, variant }: TReviewStatementProps) {
  const { container, paragraph } = style({ variant });

  return (
    <div className={container()}>
      <BasePortableText
        value={value}
        components={{
          block: {
            normal: ({ children }) => <p className={paragraph()}>{children}</p>
          },
          marks: {
            em: PortableTextEmComponent,
            strong: PortableTextStrongComponent
          }
        }}
      />
    </div>
  );
}

const style = tv({
  slots: {
    container: 'flex flex-col gap-2 max-w-5xl mx-auto',
    paragraph: 'prose-lg xl:prose-xl prose-p:my-0 italic'
  },
  variants: {
    variant: {
      [MODULE_VARIANTS.ON_BG]: {
        paragraph: 'text-bg-text'
      },
      [MODULE_VARIANTS.ON_PRIMARY]: {
        paragraph: 'text-primary-text'
      }
    }
  }
});
