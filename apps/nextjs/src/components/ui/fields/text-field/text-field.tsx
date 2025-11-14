'use client';

import { isNil, isNotNil } from 'es-toolkit';
import { motion } from 'motion/react';
import { type Ref, useMemo, useRef, useState } from 'react';
import {
  Input as AriaInput,
  Label as AriaLabel,
  TextField as AriaTextField,
  FieldError,
  type TextFieldProps
} from 'react-aria-components';
import { mergeRefs } from 'react-merge-refs';
import { tv } from 'tailwind-variants';

const MotionLabel = motion.create(AriaLabel);
const MotionFieldError = motion.create(FieldError);

type Props = TextFieldProps & {
  label: string;
  errorMessage?: string;
  ref?: Ref<HTMLInputElement>;
};
export function TextField({ label, errorMessage, ref, isRequired, ...rest }: Props) {
  const { input, label: labelStyle, fieldError } = style();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
    <AriaTextField className='relative' {...rest} aria-label={isNotNil(errorMessage) ? label : undefined}>
      {isNil(errorMessage) && (
        <MotionLabel
          className={labelStyle({ isLabelRaised })}
          initial={false}
          animate={isLabelRaised ? { translateY: '-105%', scale: 0.85, originX: 0 } : { translateY: '-50%', scale: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {label}
          {isRequired && <sup className='ml-0.5'>*</sup>}
        </MotionLabel>
      )}
      {isNotNil(errorMessage) && (
        <MotionFieldError
          initial={false}
          animate={isLabelRaised ? { translateY: '-105%', scale: 0.85, originX: 0 } : { translateY: '-50%', scale: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={fieldError()}
        >
          {errorMessage}
        </MotionFieldError>
      )}
      <AriaInput
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={mergeRefs([inputRef, ref])}
        className={({ isFocused, isFocusVisible }) =>
          input({ isFocused: isFocused || isFocusVisible, hasError: isNotNil(errorMessage) })
        }
      />
    </AriaTextField>
  );
}

const style = tv({
  slots: {
    label: 'absolute left-4 top-1/2 text-text-muted pointer-events-none',
    input: 'w-full bg-bg border-solid border border-bg-border rounded-md h-14 pt-3 px-4 text-lg',
    fieldError: 'absolute left-4 top-1/2 text-error pointer-events-none'
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
