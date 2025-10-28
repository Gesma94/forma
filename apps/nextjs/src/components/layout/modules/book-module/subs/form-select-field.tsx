'use client';

import type { ComponentProps } from 'react';
import { Controller, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';
import { SelectField } from '@/ui/fields/select-field/select-field';

type TProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & ComponentProps<typeof SelectField>;

export const FormSelectField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  defaultValue,
  disabled,
  rules,
  shouldUnregister,
  ...selectProps
}: TProps<TFieldValues, TName>) => {
  const controllerProps = { name, control, defaultValue, disabled, rules, shouldUnregister };

  return (
    <Controller
      {...controllerProps}
      render={({ field: { disabled, value, onChange, ...fieldProps }, fieldState: { invalid, error } }) => (
        <SelectField
          {...selectProps}
          {...fieldProps}
          value={value}
          errorMessage={error?.message}
          isDisabled={disabled || selectProps.isDisabled}
          onChange={onChange}
          isInvalid={invalid}
          validationBehavior='aria'
        />
      )}
    />
  );
};
