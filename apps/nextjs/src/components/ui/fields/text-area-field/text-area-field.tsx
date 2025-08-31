'use client';

import { motion } from 'motion/react';
import { useMemo, useRef, useState } from 'react';
import {
  Input as AriaInput,
  Label as AriaLabel,
  TextField as AriaTextField,
  TextArea,
  TextAreaProps
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

const MotionLabel = motion.create(AriaLabel);

type Props = TextAreaProps & {
  label: string;
};

export function TextAreaField({ label, ...rest }: Props) {
  const { input, label: labelStyle } = style();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const isLabelRaised = useMemo<boolean>(() => {
        if (rest.value) {
      return true;
    }
    if (isFocused) {
      return true;
    }

    if (!inputRef.current) {
      return false;
    }

    if (inputRef.current.value === undefined) {
      return false;
    }

    if (inputRef.current.value.trim() === '') {
      return false;
    }

    return true;
  }, [isFocused, rest.value]);

  return (
    <AriaTextField className='relative flex'>
      <div className='absolute top-0 h-14 w-full pointer-events-none'>
      <MotionLabel
        className={labelStyle({ isLabelRaised })}
        initial={false}
        animate={isLabelRaised ? { translateY: '-105%', scale: 0.85, originX: 0 } : { translateY: '-50%', scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {label}
      </MotionLabel>
        </div>
      <TextArea
       {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        className={({ isFocused, isFocusVisible }) => input({ isFocused: isFocused || isFocusVisible })}
      />
    </AriaTextField>
  );
}

const style = tv({
  slots: {
    label: 'absolute left-4 top-1/2 text-text-muted pointer-events-none',
    input: 'w-full bg-bg border-solid border border-bg-border rounded-md min-h-14 pt-5 px-4 text-lg font-base font-light'
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
