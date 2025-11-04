import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { format, isToday, setMonth } from 'date-fns';
import {
  Calendar as AriaCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  type CalendarProps,
  type DateValue,
  Heading
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { IconButton } from '@/ui/buttons/icon-button/icon-button';

type TProps = CalendarProps<DateValue>;

export function Calendar({ isDateUnavailable, value, onChange }: TProps) {
  const monthToCalendar = (number: number): string => {
    return format(setMonth(new Date(), number - 1), 'LLLL');
  };

  return (
    <AriaCalendar
      aria-label='Appointment date'
      className='mx-auto w-min'
      isDateUnavailable={isDateUnavailable}
      value={value}
      onChange={onChange}
    >
      {x => (
        <>
          {' '}
          <header className='w-full flex justify-between px-4'>
            <IconButton size='extrasmall' slot='previous' icon={CaretLeftIcon} />

            <Heading className='text-center text-md font-body'>
              {monthToCalendar(x.state.focusedDate.month)} {x.state.focusedDate.year}
            </Heading>
            <IconButton size='extrasmall' slot='next' icon={CaretRightIcon} />
          </header>
          <CalendarGrid weekdayStyle='narrow' className='mt-2 border-separate border-spacing-1 w-min'>
            <CalendarGridHeader>
              {day => (
                <CalendarHeaderCell className='font-medium font-body w-10 uppercase text-sm text-bg-dark/40'>
                  {day}
                </CalendarHeaderCell>
              )}
            </CalendarGridHeader>
            <CalendarGridBody>
              {date => (
                <CalendarCell
                  className={style({
                    isSelected: x.state.isSelected(date),
                    isDisabled: x.state.isCellDisabled(date),
                    isUnavailable: x.state.isCellUnavailable(date),
                    isToday: isToday(date.toString())
                  })}
                  date={date}
                />
              )}
            </CalendarGridBody>
          </CalendarGrid>
        </>
      )}
    </AriaCalendar>
  );
}

const style = tv({
  base: 'text-center font-body text-xs size-8 rounded-full flex items-center justify-center',
  variants: {
    isDisabled: {
      true: 'opacity-10',
      false: ''
    },
    isUnavailable: {
      true: 'opacity-10',
      false: ''
    },
    isToday: {
      true: 'relative after:absolute after:size-1 after:bg-primary after:rounded-full after:left-1/2 after:-translate-x-1/2 after:bottom-1',
      false: ''
    },
    isSelected: {
      true: '',
      false: ''
    }
  },
  compoundVariants: [
    {
      isDisabled: false,
      isUnavailable: false,
      isSelected: false,
      class: 'bg-primary/10 text-primary cursor-pointer font-bold'
    },
    {
      isDisabled: false,
      isUnavailable: false,
      isSelected: true,
      class: 'bg-primary text-primary-text cursor-pointer font-bold'
    }
  ]
});
