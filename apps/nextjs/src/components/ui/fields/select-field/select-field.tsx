'use client';

import { iconButtonStyle } from '@/styles/icon-button';
import { IconButton } from '@/ui/buttons/icon-button/icon-button';
import { CaretDownIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { Fragment, useMemo, useRef, useState } from 'react';
import {
  Input as AriaInput,
  type InputProps as AriaInputProps,
  Label as AriaLabel,
  TextField as AriaTextField,
  Button,
  ComboBox,
  ComboBoxProps,
  Input,
  Key,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectProps,
  SelectValue
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

const MotionLabel = motion.create(AriaLabel);

type TProps<T extends object> = SelectProps<T> & {
  label: string;
};

export function SelectField<T extends object>({ label, selectedKey, children, ...rest }: TProps<T>) {

  const { input, icon, label: labelStyle } = style();
    const [controlledSelectedKey, setControlledSelectedKey] = useState<Key>(selectedKey);

    const handleSelectionChange = (key: Key) => {
        setControlledSelectedKey(key);
    }



  return (
    <Select className='relative' onSelectionChange={handleSelectionChange} selectedKey={controlledSelectedKey} {...rest}>
        {({ isOpen,  }) => (
            <>
      <MotionLabel
        className={labelStyle({ isLabelRaised: !!controlledSelectedKey || isOpen })}
        initial={false}
        animate={!!controlledSelectedKey || isOpen ? { translateY: '-105%', scale: 0.85, originX: 0 } : { translateY: '-50%', scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {label}
      </MotionLabel>
            <Button className={input()}>
                <SelectValue>
                    {({ isPlaceholder, defaultChildren }) =>  isPlaceholder ? <Fragment /> : defaultChildren}
                </SelectValue>
                <span className={iconButtonStyle({ size: 'extrasmall', variant: 'primary', surface: 'bg', className: 'relative -top-1' })}>
                    <CaretDownIcon className={icon({isOpen})} />
                </span>
                
            </Button>
            <Popover  offset={1} placement='bottom left' className='min-w-[var(--trigger-width)] bg-bg rounded-md border border-bg-border overflow-hidden'>

    <ListBox>
          {children}
    </ListBox>
  </Popover>
  </>)}
    </Select>
  );
}

const style = tv({
  slots: {
            label: 'absolute left-4 top-1/2 text-text-muted z-10 pointer-events-none',
    input: 'w-full bg-bg border-solid border border-bg-border rounded-md h-14 pt-3 px-4 text-lg font-base font-light flex items-center justify-between',
    icon: 'size-1/2 transition-transform duration-300'
  },
  variants: {
    isLabelRaised: {
      true: {
        // label: 'text-bg-text'
      },
      false: {
        // label: 'text-text-muted'
      }
    },
    isFocused: {
      true: {
        input: 'outline-bg-border-active outline-2 -outline-offset-[3px]'
      },
      false: {}
    },
    isOpen: {
        true: {
            icon: 'rotate-180'
        }
    }
  }
});
