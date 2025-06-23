'use client';
import { darken, lighten, styled } from '@mui/material';
import { AutocompleteProps } from '@mui/material/Autocomplete';
import { ChipTypeMap } from '@mui/material/Chip';
import { TextFieldProps } from '@mui/material/TextField';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import RaiAutocomplete from "./RaiAutocomplete";


const GroupHeader = styled('div')(({ theme }) => ({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    color: theme.palette.primary.main,
    backgroundColor: lighten(theme.palette.primary.light, 0.85),
    ...theme.applyStyles('dark', {
        backgroundColor: darken(theme.palette.primary.main, 0.8),
    }),
}));

const GroupItems = styled('ul')({
    padding: 0,
});

export interface RaiControlledAutocompleteProps<
    T extends unknown,
    U extends FieldValues,
> extends Omit<
    AutocompleteProps<
        T,
        boolean | undefined,
        boolean | undefined,
        boolean | undefined,
        ChipTypeMap['defaultComponent']
    >,
    'renderInput' | "slotProps"> {
  loading?: boolean;
  label: string;
  control: Control<U, any>;
  registerName: Path<U>;
  rules?:
    | Omit<
        RegisterOptions<U, Path<U>>,
        "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
      >
    | undefined;
  itemValue?: keyof T | "value";
  itemLabel?: keyof T | "label";
  slotProps?: AutocompleteProps<
    T,
    boolean | undefined,
    boolean | undefined,
    boolean | undefined,
    ChipTypeMap["defaultComponent"]
  >["slotProps"] & { textField?: TextFieldProps };
}

export default function RaiControlledAutocomplete<
    T extends unknown,
    U extends FieldValues,
>({
    control,
    registerName,
    itemValue = 'value',
    itemLabel = 'label',
    size = 'small',
    rules,
    onChange,
    ...reset
}:RaiControlledAutocompleteProps<T,U>) {
    return (
        <Controller
            control={control}
            name={registerName}
            rules={rules}
            render={({ field, fieldState }) => (
                <RaiAutocomplete
                    {...field}
                    value={field.value}
                    fullWidth
                    noOptionsText="موردی موجود  نیست"
                    loadingText="در حال بارگزاری..."
                    size={size}
                    itemLabel={itemLabel}
                    itemValue={itemValue}
                    {...reset}
                    disableCloseOnSelect={reset.multiple}
                    filterSelectedOptions
                    disabled={reset.disabled || fieldState.isValidating}
                    onChange={(_e, value, ...args) => {
                      field.onChange(
                            typeof value === 'string'
                                ? value
                                : reset.multiple
                                  ? (value as T[])?.map((val) =>
                                        typeof val === 'string' ||
                                        typeof val === 'number'
                                            ? val
                                            : itemValue
                                              ? val?.[itemValue as keyof T]
                                              : val
                                    )
                                  : itemValue
                                    ? (value as T)?.[itemValue as keyof T]
                                    : value
                        );
                        onChange && onChange(_e, value, ...args);
                    }}
                />
            )}
        />
    );
}
