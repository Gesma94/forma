'use client';

import { CaretDownIcon } from '@phosphor-icons/react';
import { format } from 'date-fns';
import { isNil, isNotNil } from 'es-toolkit';
import { motion } from 'motion/react';
import { type Ref, useState } from 'react';
import {
  Label as AriaLabel,
  Button,
  type CalendarProps,
  type DatePickerProps,
  type DateValue,
  Dialog,
  DialogTrigger,
  Popover
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { iconButtonStyle } from '@/styles/icon-button';
import { Calendar } from '@/ui/inputs/calendar/calendar';

const MotionLabel = motion.create(AriaLabel);

type Props = DatePickerProps<DateValue> & {
  label: string;
  errorMessage?: string;
  ref?: Ref<HTMLDivElement>;
  isDateUnavailable?: CalendarProps<DateValue>['isDateUnavailable'];
};

export function CalendarField({ label, isDateUnavailable, ref, isRequired, errorMessage, ...rest }: Props) {
  const { input, label: labelStyle, fieldError } = style();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [value, setValue] = useState<DateValue | null>(rest.value);

  const onDateValueChange = (value: DateValue) => {
    setValue(value);
    setIsPopoverOpen(false);
    rest.onChange?.(value);
  };

  const getValueDisplay = (value: DateValue) => {
    if (isNil(value)) {
      return '';
    }

    return format(value.toDate('UTC'), 'dd/MM/yyyy');
  };
  const isLabelRaised = isPopoverOpen || isNotNil(value);

  return (
    <DialogTrigger isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <Button className='relative'>
        {isNil(errorMessage) && (
          <MotionLabel
            className={labelStyle()}
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
        <motion.span
          initial={false}
          animate={isLabelRaised ? { translateY: '-105%', scale: 0.85, originX: 0 } : { translateY: '-50%', scale: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={fieldError()}
        >
          {errorMessage}
        </motion.span>
        <div className={input()}>
          <span className='size-full pt-4 flex items-center  px-4'>{getValueDisplay(value)}</span>
          <div
            className={iconButtonStyle({
              className: 'ml-auto',
              size: 'extrasmall',
              surface: 'bg',
              variant: 'primary'
            })}
          >
            <CaretDownIcon className='size-1/2' />
          </div>
        </div>
      </Button>
      <Popover offset={0} placement='bottom left' className='bg-bg rounded-md border border-bg-border'>
        <Dialog className='h-full max-h-[inherit] overflow-y-auto px-4 py-4 flex flex-col gap-4'>
          <Calendar isDateUnavailable={isDateUnavailable} value={value} onChange={onDateValueChange} />
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}

const style = tv({
  slots: {
    label: 'absolute left-4 top-1/2  text-text-muted ',
    input: 'flex items-center w-full border-none  bg-bg  rounded-md h-14 pr-4 text-lg',
    fieldError: 'absolute left-4 top-1/2 text-error pointer-events-none'
  }
});
