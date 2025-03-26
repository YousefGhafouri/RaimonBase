'use client';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Chip, { ChipTypeMap } from '@mui/material/Chip';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import {
    Control,
    Controller,
    FieldValues,
    Path,
    RegisterOptions,
} from 'react-hook-form';
import { darken, lighten, styled } from '@mui/material';

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

export default function RaiAutocomplete<
    T extends unknown,
    U extends FieldValues,
>({
    label,
    loading,
    control,
    registerName,
    itemValue = 'value',
    itemLabel = 'label',
    size = 'small',
    rules,
    onChange,
    ...reset
}: {
    loading?: boolean;
    label: string;
    control: Control<U, any>;
    registerName: Path<U>;
    rules?:
        | Omit<
              RegisterOptions<U, Path<U>>,
              'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
          >
        | undefined;
    itemValue?: keyof T | 'value';
    itemLabel?: keyof T | 'label';
} & Omit<
    AutocompleteProps<
        T,
        boolean | undefined,
        boolean | undefined,
        boolean | undefined,
        ChipTypeMap['defaultComponent']
    >,
    'renderInput'
>) {
    return (
        <Controller
            control={control}
            name={registerName}
            rules={rules}
            render={({ field, fieldState }) => (
                <Autocomplete
                    {...field}
                    value={field.value}
                    fullWidth
                    noOptionsText="موردی موجود  نیست"
                    loadingText="در حال بارگزاری..."
                    loading={loading}
                    size={size}
                    {...reset}
                    getOptionLabel={(option) => {
                        if (
                            reset.options.some((op) => typeof op !== 'string')
                        ) {
                            return (
                                (option as NonNullable<T>)?.[
                                    itemLabel as keyof T
                                ]?.toString() ||
                                reset.options
                                    .find(
                                        (item) =>
                                            item[itemValue as keyof T] ===
                                            option
                                    )
                                    ?.[itemLabel as keyof T]?.toString() ||
                                '-'
                            );
                        }
                        return (option as string) || '-';
                    }}
                    renderGroup={(params) => (
                        <li key={params.key}>
                            <GroupHeader>{params.group}</GroupHeader>
                            <GroupItems>{params.children}</GroupItems>
                        </li>
                    )}
                    disableCloseOnSelect={reset.multiple}
                    isOptionEqualToValue={(option, value) => {
                        const optionVal =
                            typeof option === 'string'
                                ? value
                                : itemValue
                                  ? (option as T)?.[itemValue as keyof T]
                                  : value;
                        return reset.multiple
                            ? field.value?.includes(optionVal)
                            : optionVal === field.value;
                    }}
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
                    renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => {
                            const { key, ...tagProps } = getTagProps({
                                index,
                            });
                            return (
                                <Chip
                                    size={size}
                                    key={key}
                                    label={
                                        reset.options.some(
                                            (op) => typeof op !== 'string'
                                        )
                                            ? (option as NonNullable<T>)?.[
                                                  itemLabel as keyof T
                                              ]?.toString() ||
                                              reset.options
                                                  .find(
                                                      (item) =>
                                                          item[
                                                              itemValue as keyof T
                                                          ] === option
                                                  )
                                                  ?.[
                                                      itemLabel as keyof T
                                                  ]?.toString() ||
                                              '-'
                                            : (option as string) || '-'
                                    }
                                    {...tagProps}
                                />
                            );
                        })
                    }
                    renderInput={(params) => {
                        return (
                            <TextField
                                {...params}
                                error={!!fieldState.error?.message}
                                helperText={fieldState.error?.message}
                                label={label}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {loading ? (
                                                <CircularProgress
                                                    color="primary"
                                                    size={20}
                                                />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />
                        );
                    }}
                />
            )}
        />
    );
}
