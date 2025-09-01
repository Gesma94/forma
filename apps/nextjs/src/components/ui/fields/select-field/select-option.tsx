'use client'

import { ListBoxItem, ListBoxItemProps } from "react-aria-components";
import { tv } from "tailwind-variants";

type TProps = ListBoxItemProps;

export function SelectOption(props: TProps) {
    return <ListBoxItem {...props} className={({ isHovered, isFocusVisible, isSelected }) => style({ isHovered, isFocusVisible, isSelected })} />;
}

const style = tv({
    base: 'h-12 bg-bg flex items-center px-4 font-light outline-bg-border-active',
    variants: {
        isHovered: {
            true: 'bg-bg-hover',
        },
        isFocusVisible: {
            true: 'outline-2 -outline-offset-2',
        },
        isSelected: {
            true: 'bg-bg-active font-bold',
        }
    }
})