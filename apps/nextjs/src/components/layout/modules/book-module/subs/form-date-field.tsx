'use client';

import type { ComponentProps } from 'react';
import { Controller, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';
import { DateField } from '@/ui/fields/date-field/date-field';

type TProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & ComponentProps<typeof DateField>;

export const FormDateField = <
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
      render={({ field: { disabled, ...fieldProps }, fieldState: { invalid, error } }) => (
        <DateField
          {...dateFieldProps}
          {...fieldProps}
          errorMessage={error?.message}
          isDisabled={disabled || dateFieldProps.isDisabled}
          isInvalid={invalid}
          validationBehavior='aria'
        />
      )}
    />
  );
};
