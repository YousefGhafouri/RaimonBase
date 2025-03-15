import {
    Control,
    Controller,
    FieldValues,
    Path,
    RegisterOptions,
} from 'react-hook-form';
import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';

export default function ShControlledCheckbox<U extends FieldValues>({
    label,
    control,
    registerName,
    size = 'small',
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
} & Omit<CheckboxProps, 'value' | 'onChange' | 'defaultValue'>) {
    return (
        <Controller
            control={control}
            name={registerName}
            rules={rules}
            render={({ field }) => (
                <FormControlLabel
                    control={
                        <Checkbox
                            {...field}
                            {...rest}
                            size={size}
                            checked={field.value}
                        />
                    }
                    label={label}
                />
            )}
        />
    );
}
