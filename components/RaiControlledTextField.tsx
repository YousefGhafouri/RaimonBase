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
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

export default function ShControlledTextField<U extends FieldValues>({
    label,
    control,
    registerName,
    size = 'small',
    type = 'text',
    rules,
    ...rest
}: {
    label: string;
    control: Control<U, any>;
    registerName: Path<U>;
    rules?:
        | Omit<
              RegisterOptions<U, Path<U>>,
              'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
          >
        | undefined;
    type?: 'money' | 'text' | 'password' | 'number';
} & Omit<TextFieldProps, 'value' | 'onChange' | 'defaultValue' | 'type'>) {
    const [visible, setVisible] = useState(false);
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
                                type !== 'password'
                                    ? type
                                    : visible
                                      ? 'text'
                                      : 'password'
                            }
                            size={size}
                            fullWidth
                            error={!!fieldState.error?.message}
                            helperText={fieldState.error?.message}
                            label={label}
                            InputLabelProps={{ shrink: field.value }}
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
                        />
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
