import { MODULE_VARIANTS, PADDING_SIZE, TModuleVariants, TPaddingSize } from "@forma/common";
import { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";

type TProps = {
    paddingTop: TPaddingSize;
    variant: TModuleVariants;
    paddingBottom: TPaddingSize;
}

export function VerticalPaddingContainer({paddingBottom,paddingTop,children}: PropsWithChildren<TProps>) {
    console.log("paddingBottom" + paddingBottom);
    console.log("paddingTop" + paddingTop);
    return <div className={stylesTv({ paddingBottom, paddingTop })}>{children}</div>
}

const stylesTv = tv({
    base: 'size-full',
    variants: {
        paddingTop: {
            [PADDING_SIZE.NONE]: '',
            [PADDING_SIZE.SM]: 'pb-5 md:pb-10',
            [PADDING_SIZE.MD]: 'pb-10 md:pb-20',
            [PADDING_SIZE.LG]: 'pb-20 md:pb-40',
        },
        paddingBottom: {
            [PADDING_SIZE.NONE]: '',
            [PADDING_SIZE.SM]: 'pt-5 md:pt-10',
            [PADDING_SIZE.MD]: 'pt-10 md:pt-20',
            [PADDING_SIZE.LG]: 'pt-20 md:pt-40',
        },
        variant: {
            [MODULE_VARIANTS.ON_BG]: 'bg-bg',
            [MODULE_VARIANTS.ON_PRIMARY]: 'bg-primary',
        }
    }
})