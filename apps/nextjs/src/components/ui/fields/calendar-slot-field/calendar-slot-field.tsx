'use client';

import { motion } from 'motion/react';
import { useMemo, useRef, useState } from 'react';
import {
  Input as AriaInput,
  type InputProps as AriaInputProps,
  Label as AriaLabel,
  TextField as AriaTextField,
  Button,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  DialogTrigger,
  Group,
  OverlayArrow,
  Popover,
  Pressable
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { TextField } from '../text-field/text-field';
import { Calendar } from '@/ui/inputs/calendar/calendar';

const MotionLabel = motion.create(AriaLabel);

type Props = AriaInputProps & {
  label: string;
};

export function CalendarSlotField({ label }: Props) {
  const { input, label: labelStyle } = style();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const isLabelRaised = useMemo<boolean>(() => {
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
  }, [isFocused]);

  return (
    <DialogTrigger>
      <Pressable>
        <div role="button">
          <TextField label={label} />
        </div>
      </Pressable>
       <Popover offset={0} placement='bottom left' maxHeight={2000} className='bg-bg rounded-md border border-bg-border'>
        <Dialog className='h-full max-h-[inherit] overflow-y-auto px-4 py-4 flex flex-col gap-4'>
            <Calendar />
            <div>
              <TextField label="Time Slot" />
            </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}

const style = tv({
  slots: {
    label: 'absolute left-4 top-1/2 text-text-muted',
    input: 'w-full border-none  bg-bg  rounded-md h-14 pt-3 px-4 text-lg font-base font-light'
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
