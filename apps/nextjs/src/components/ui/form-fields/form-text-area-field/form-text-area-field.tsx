'use client';

import type { ComponentProps } from 'react';
import { Controller, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';
import { TextAreaField } from '@/ui/fields/text-area-field/text-area-field';

type TProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & ComponentProps<typeof TextAreaField>;

export const FormTextAreaField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  defaultValue,
  disabled,
  rules,
  shouldUnregister,
  ...textProps
}: TProps<TFieldValues, TName>) => {
  const controllerProps = { name, control, defaultValue, disabled, rules, shouldUnregister };

  return (
    <Controller
      {...controllerProps}
      render={({ field: { disabled, ...fieldProps }, fieldState: { invalid, error } }) => (
        <TextAreaField
          {...textProps}
          {...fieldProps}
          isInvalid={invalid}
          errorMessage={error?.message}
          validationBehavior='aria'
        />
      )}
    />
  );
};
