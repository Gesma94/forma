'use client'

import { TextField } from "@/ui/fields/text-field/text-field"
import { ComponentProps } from "react";
import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form"

type TProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & ComponentProps<typeof TextField>;


export const FormTextField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> ({ name, control, defaultValue, disabled, rules, shouldUnregister, ...textProps }: TProps<TFieldValues, TName>) => {
  const controllerProps = { name, control, defaultValue, disabled, rules, shouldUnregister };

return(
    <Controller
        {...controllerProps}
        render={({ field: { disabled, ...fieldProps}, fieldState: { invalid, error } }) => (
            <TextField {...textProps} {...fieldProps} isInvalid={invalid} errorMessage={error?.message}  validationBehavior="aria" />
        )}
        />)
}