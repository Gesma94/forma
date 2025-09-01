'use client';

import { CaretDownIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import {
  Label as AriaLabel,
  DateInput,
  DatePicker,
  type DatePickerProps,
  DateSegment,
  type DateValue,
  Dialog,
  Group,
  Popover
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { IconButton } from '@/ui/buttons/icon-button/icon-button';
import { Calendar } from '@/ui/inputs/calendar/calendar';

const MotionLabel = motion.create(AriaLabel);

type Props = DatePickerProps<DateValue> & {
  label: string;
};

export function DateField({ label }: Props) {
  const { input, label: labelStyle } = style();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const dateSegmentRef = useRef<HTMLSpanElement>(null);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const hasValue = () => {
    if (!inputRef.current) {
      return false;
    }

    return (
      inputRef.current.querySelectorAll('span:not([data-placeholder="true"]):not([data-type="literal"])').length > 0
    );
  };
  const isLabelRaised = isFocused || hasValue();

  return (
    <DatePicker className='relative' onFocus={handleInputFocus} onBlur={handleInputBlur} ref={datePickerRef}>
      <MotionLabel
        className={labelStyle({ isLabelRaised })}
        initial={false}
        animate={isLabelRaised ? { translateY: '-105%', scale: 0.85, originX: 0 } : { translateY: '-50%', scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {label}
      </MotionLabel>
      <Group className={({ isFocusVisible, isFocusWithin }) => input({ isFocused: isFocusVisible || isFocusWithin })}>
        <DateInput data-testid='tet' className='size-full pt-4 flex items-center  px-4' ref={inputRef}>
          {segment => (
            <DateSegment
              ref={dateSegmentRef}
              className={({ isPlaceholder, isFocused }) =>
                dateSegmentStyle({ isPlaceholder, isHidden: !isFocused && !hasValue() })
              }
              segment={segment}
            />
          )}
        </DateInput>
        <IconButton size='extrasmall' icon={CaretDownIcon} className='ml-auto' />
      </Group>
      <Popover offset={0} placement='bottom left' className='bg-bg rounded-md border border-bg-border'>
        <Dialog className='h-full max-h-[inherit] overflow-y-auto px-4 py-4 flex flex-col gap-4'>
          <Calendar />
        </Dialog>
      </Popover>
    </DatePicker>
  );
}

const dateSegmentStyle = tv({
  base: 'text-lg',
  variants: {
    isPlaceholder: {
      true: 'text-text-muted',
      false: 'text-bg-text'
    },
    isHidden: {
      true: 'opacity-0'
    },
    isFocused: {
      true: 'bg-[black]'
    }
  }
});
const style = tv({
  slots: {
    label: 'absolute left-4 top-1/2  text-text-muted ',
    input: 'flex items-center w-full border-none  bg-bg  rounded-md h-14 pr-4 text-lg font-base font-light',
    segment: ''
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
    }
  }
});
