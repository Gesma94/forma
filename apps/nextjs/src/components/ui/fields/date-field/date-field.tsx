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
    DatePickerProps,
    DateSegment,
    DateValue,
    Dialog,
    DialogTrigger,
    Group,
    Label,
    OverlayArrow,
    Popover,
    Pressable
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { TextField } from '../text-field/text-field';
import { Calendar } from '@/ui/inputs/calendar/calendar';
import { IconButton } from '@/ui/buttons/icon-button/icon-button';
import { CaretDownIcon } from '@phosphor-icons/react';

const MotionLabel = motion.create(AriaLabel);

type Props = DatePickerProps<DateValue> & {
    label: string;
};

export function DateField({ label }: Props) {
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
        <DatePicker className='relative'>
            <Label
                className={labelStyle({ isLabelRaised })}
            >
                {label}
            </Label>
            <Group className={({ isFocusVisible, isFocusWithin }) => input({ isFocused: isFocusVisible || isFocusWithin })}>
                <DateInput
                    ref={inputRef}>
                    {(segment) => <DateSegment segment={segment} />}
                </DateInput>
                <IconButton size='extrasmall' icon={CaretDownIcon} className='ml-auto'/>
            </Group>
            <Popover offset={0} placement='bottom left' maxHeight={2000} className='bg-bg rounded-md border border-bg-border'>
                <Dialog className='h-full max-h-[inherit] overflow-y-auto px-4 py-4 flex flex-col gap-4'>
                    <Calendar />
                </Dialog>
            </Popover>
        </DatePicker>
    );
}

const style = tv({
    slots: {
        label: 'absolute left-4 top-1/2 -translate-y-[105%] scale-[85%] origin-left text-text-muted',
        input: 'flex items-center w-full border-none  bg-bg  rounded-md h-14 pt-3 px-4 text-lg font-base font-light'
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
