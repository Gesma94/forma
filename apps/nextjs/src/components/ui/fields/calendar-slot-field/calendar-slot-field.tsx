'use client';

import { type InputProps as AriaInputProps, Dialog, DialogTrigger, Popover, Pressable } from 'react-aria-components';
import { Calendar } from '@/ui/inputs/calendar/calendar';
import { TextField } from '../text-field/text-field';

type Props = AriaInputProps & {
  label: string;
};

export function CalendarSlotField({ label }: Props) {
  return (
    <DialogTrigger>
      <Pressable>
        {/* biome-ignore lint/a11y/useSemanticElements: react ARIA wants this way */}
        {/* biome-ignore lint/a11y/useFocusableInteractive: react ARIA wants this way */}
        <div role='button'>
          <TextField label={label} tabIndex={-1} />
        </div>
      </Pressable>
      <Popover offset={0} placement='bottom left' maxHeight={2000} className='bg-bg rounded-md border border-bg-border'>
        <Dialog className='h-full max-h-[inherit] overflow-y-auto px-4 py-4 flex flex-col gap-4'>
          <Calendar />
          <div>
            <TextField label='Time Slot' />
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}

// const style = tv({
//   slots: {
//     label: 'absolute left-4 top-1/2 text-text-muted',
//     input: 'w-full border-none  bg-bg  rounded-md h-14 pt-3 px-4 text-lg font-base font-light'
//   },
//   variants: {
//     isLabelRaised: {
//       true: {
//         // label: 'text-bg-text'
//       },
//       false: {
//         // label: 'text-text-muted'
//       }
//     },
//     isFocused: {
//       true: {
//         input: 'outline-bg-border-active outline-2 -outline-offset-[3px]'
//       },
//       false: {}
//     }
//   }
// });
