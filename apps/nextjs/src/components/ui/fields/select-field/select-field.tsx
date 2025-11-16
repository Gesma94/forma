'use client';

import { CaretDownIcon } from '@phosphor-icons/react';
import { isNil, isNotNil } from 'es-toolkit';
import { motion } from 'motion/react';
import { Fragment, type Ref, useState } from 'react';
import {
  Label as AriaLabel,
  Button,
  FieldError,
  type Key,
  ListBox,
  Popover,
  Select,
  type SelectProps,
  SelectValue
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { iconButtonStyle } from '@/styles/icon-button';

const MotionLabel = motion.create(AriaLabel);
const MotionFieldError = motion.create(FieldError);

type TProps<T extends object> = SelectProps<T> & {
  label: string;
  errorMessage?: string;
  ref?: Ref<HTMLButtonElement>;
};

export function SelectField<T extends object>({
  label,
  ref,
  selectedKey,
  isRequired,
  errorMessage,
  children,
  onSelectionChange,
  onChange,
  ...rest
}: TProps<T>) {
  const { input, icon, label: labelStyle, fieldError } = style({ hasError: isNotNil(errorMessage) });
  const [controlledSelectedKey, setControlledSelectedKey] = useState<Key>(selectedKey);

  const handleSelectionChange = (key: Key) => {
    setControlledSelectedKey(key);
    onChange?.(key);
  };

  return (
    <Select
      className='relative'
      onChange={handleSelectionChange}
      value={controlledSelectedKey}
      aria-label={isNotNil(errorMessage) ? label : undefined}
      {...rest}
    >
      {({ isOpen }) => {
        const isLabelRaised = !!controlledSelectedKey || isOpen;

        return (
          <>
            {isNil(errorMessage) && (
              <MotionLabel
                className={labelStyle({ isLabelRaised })}
                initial={false}
                animate={
                  isLabelRaised ? { translateY: '-105%', scale: 0.85, originX: 0 } : { translateY: '-50%', scale: 1 }
                }
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {label}
                {isRequired && <sup className='ml-0.5'>*</sup>}
              </MotionLabel>
            )}
            {isNotNil(errorMessage) && (
              <MotionFieldError
                initial={false}
                animate={
                  isLabelRaised ? { translateY: '-105%', scale: 0.85, originX: 0 } : { translateY: '-50%', scale: 1 }
                }
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={fieldError()}
              >
                {errorMessage}
              </MotionFieldError>
            )}

            <Button ref={ref} className={input()}>
              <SelectValue>
                {({ isPlaceholder, defaultChildren }) => (isPlaceholder ? <Fragment /> : defaultChildren)}
              </SelectValue>
              <span
                className={iconButtonStyle({
                  size: 'extrasmall',
                  variant: 'primary',
                  surface: 'bg',
                  className: 'relative -top-1'
                })}
              >
                <CaretDownIcon className={icon({ isOpen })} />
              </span>
            </Button>
            <Popover
              offset={1}
              placement='bottom left'
              className='min-w-[var(--trigger-width)] bg-bg rounded-md border border-bg-border overflow-auto'
            >
              <ListBox>{children}</ListBox>
            </Popover>
          </>
        );
      }}
    </Select>
  );
}

const style = tv({
  slots: {
    label: 'absolute left-4 top-1/2 text-text-muted z-10 pointer-events-none',
    fieldError: 'absolute left-4 top-1/2 text-error pointer-events-none',
    input:
      'w-full bg-bg border-solid border border-bg-border rounded-md h-14 pt-3 px-4 text-lg flex items-center justify-between',
    icon: 'size-1/2 transition-transform duration-300'
  },
  variants: {
    hasError: {
      true: {
        input: 'outline-error outline-2 -outline-offset-[3px]'
      },
      false: {}
    },
    isLabelRaised: {
      true: {
        // label: 'text-bg-text'
      },
      false: {
        // label: 'text-text-muted'
      }
    },
    isFocused: {
      true: {},
      false: {}
    },
    isOpen: {
      true: {
        icon: 'rotate-180'
      }
    }
  },
  compoundVariants: [
    {
      isFocused: true,
      hasError: false,
      class: {
        input: 'outline-bg-border-active outline-2 -outline-offset-[3px]'
      }
    },
    {
      isFocused: true,
      hasError: true,
      class: {
        input: 'outline-error outline-2 -outline-offset-[3px]'
      }
    }
  ]
});
