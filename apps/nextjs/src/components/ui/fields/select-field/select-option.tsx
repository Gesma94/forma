'use client';

import { ListBoxItem, type ListBoxItemProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';

type TProps = ListBoxItemProps;

export function SelectOption(props: TProps) {
  return (
    <ListBoxItem
      {...props}
      className={({ isHovered, isFocusVisible, isSelected, isDisabled }) =>
        style({ isHovered, isFocusVisible, isSelected, isDisabled })
      }
    />
  );
}

const style = tv({
  base: 'h-12 bg-bg flex items-center px-4 outline-bg-border-active cursor-pointer',
  variants: {
    isHovered: {
      true: '',
      false: ''
    },
    isDisabled: {
      true: 'bg-bg-disabled text-bg-text-disabled',
      false: ''
    },
    isFocusVisible: {
      true: 'outline-2 -outline-offset-2'
    },
    isSelected: {
      true: 'bg-bg-active font-semibold'
    }
  },
  compoundVariants: [
    {
      isDisabled: false,
      isHovered: true,
      class: 'bg-bg-hover'
    }
  ]
});
