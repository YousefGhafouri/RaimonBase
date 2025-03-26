import { NumericFormat } from 'react-number-format';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import {
    Control,
    Controller,
    FieldValues,
    Path,
    RegisterOptions,
} from 'react-hook-form';
import ConditionalRender from './ConditionalRendering';
import { InputAdornment } from '@mui/material';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

export default function RaiControlledTextField<U extends FieldValues>({
    items,
    label,
    control,
    registerName,
    size = 'small',
    type = 'text',
    SelectProps,
    rules,
    ...rest
}: {
    items?: { value: any; title?: string | null }[];
    label: string;
    control: Control<U, any>;
    registerName: Path<U>;
    rules?:
        | Omit<
              RegisterOptions<U, Path<U>>,
              'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
          >
        | undefined;
    type?: 'money' | 'mobile' | 'text' | 'password' | 'number' | 'select' | 'email';
} & Omit<TextFieldProps, 'value' | 'onChange' | 'defaultValue' | 'type'>) {
    const [visible, setVisible] = useState(false);
    const options = items?.map(({ value, title }) => (
      <MenuItem key={value} value={value}>
          {title}
      </MenuItem>
  ));
    return (
        <Controller
            control={control}
            name={registerName}
            rules={rules}
            render={({ field, fieldState }) => (
                <ConditionalRender
                    condition={type !== 'money'}
                    render={
                        <TextField
                            type={
                              type === 'select'?undefined:
                                type !== 'password'
                                    ? type
                                    : visible
                                      ? 'text'
                                      : 'password'
                            }
                            select={type === 'select'}
                            size={size}
                            fullWidth
                            error={!!fieldState.error?.message}
                            helperText={fieldState.error?.message}
                            label={label}
                            InputLabelProps={{ shrink: field.value }}
                            SelectProps={{
                                ...SelectProps,
                                value: field.value,
                                onChange: field.onChange,
                                renderValue:(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {console.log(selected)}
                                    {SelectProps?.multiple
                                        ? selected?.map((value) => (
                                              <Chip
                                                  key={value}
                                                  label={
                                                      items?.find(
                                                          (item) => item?.value === value
                                                      )?.title || value
                                                  }
                                              />
                                          ))
                                        : items?.find((item) => item?.value === selected)
                                              ?.title || selected}
                                </Box>
                            )
                            }}
                            InputProps={{
                                endAdornment:
                                    type === 'password' ? (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setVisible(!visible)
                                                }
                                            >
                                                <ConditionalRender
                                                    condition={visible}
                                                    render={
                                                        <RemoveRedEyeIcon />
                                                    }
                                                >
                                                    <VisibilityOffIcon />
                                                </ConditionalRender>
                                            </IconButton>
                                        </InputAdornment>
                                    ) : undefined,
                            }}
                            {...field}
                            {...rest}
                        >
                          {options}
                        </TextField>
                    }
                >
                    <NumericFormat
                        {...field}
                        size={size}
                        label={label}
                        fullWidth
                        customInput={TextField}
                        error={!!fieldState.error?.message}
                        helperText={fieldState.error?.message}
                        thousandSeparator
                        InputLabelProps={{ shrink: field.value }}
                        valueIsNumericString
                        onChange={(e) =>
                            field.onChange(
                                Number(e.target.value.replace(/[^\d.-]/g, ''))
                            )
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    تومان
                                </InputAdornment>
                            ),
                        }}
                        {...rest}
                    />
                </ConditionalRender>
            )}
        />
    );
}
