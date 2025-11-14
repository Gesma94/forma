'use client';

import { motion } from 'motion/react';
import { type Ref, useRef, useState } from 'react';
import {
  DateField as AriaDateField,
  Label as AriaLabel,
  type DateFieldProps,
  DateInput,
  DateSegment,
  type DateValue
} from 'react-aria-components';
import { mergeRefs } from 'react-merge-refs';
import { tv } from 'tailwind-variants';

const MotionLabel = motion.create(AriaLabel);

type Props = DateFieldProps<DateValue> & {
  label: string;
  errorMessage?: string;
  ref?: Ref<HTMLDivElement>;
};

export function DateField({ label, isDateUnavailable, ref, isRequired, ...rest }: Props) {
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
    <AriaDateField
      {...rest}
      className='relative'
      ref={mergeRefs([ref, datePickerRef])}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
    >
      <MotionLabel
        className={labelStyle({ isLabelRaised })}
        initial={false}
        animate={isLabelRaised ? { translateY: '-105%', scale: 0.85, originX: 0 } : { translateY: '-50%', scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {label}
        {isRequired && <sup className='ml-0.5'>*</sup>}
      </MotionLabel>
      <DateInput
        className={({ isFocusVisible, isFocusWithin }) => input({ isFocused: isFocusVisible || isFocusWithin })}
        ref={inputRef}
      >
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
    </AriaDateField>
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
    input: 'flex items-center w-full border-none bg-bg rounded-md h-14 size-full pt-4 px-4 text-lg',
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
