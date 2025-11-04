'use client';

import type { ComponentProps } from 'react';
import { Controller, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';
import { CalendarField } from '@/ui/fields/calendar-field/calendar-field';

type TProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & ComponentProps<typeof CalendarField>;

export const FormCalendarField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  defaultValue,
  disabled,
  rules,
  shouldUnregister,
  ...dateFieldProps
}: TProps<TFieldValues, TName>) => {
  const controllerProps = { name, control, defaultValue, disabled, rules, shouldUnregister };

  return (
    <Controller
      {...controllerProps}
      render={({ field: { disabled, value, onChange, ...fieldProps }, fieldState: { invalid, error } }) => (
        <CalendarField
          {...dateFieldProps}
          {...fieldProps}
          value={value}
          onChange={onChange}
          errorMessage={error?.message}
          isDisabled={disabled || dateFieldProps.isDisabled}
          isInvalid={invalid}
          validationBehavior='aria'
        />
      )}
    />
  );
};
