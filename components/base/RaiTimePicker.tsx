import moment, { Moment } from 'moment-jalaali';
import { AdapterMomentJalaali } from '@mui/x-date-pickers/AdapterMomentJalaali';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';

import { forwardRef, ReactNode } from 'react';
import {
    PickerChangeHandlerContext,
    TimeValidationError,
} from '@mui/x-date-pickers/models';

export interface TimePickerLocalProps
    extends Omit<TimePickerProps<Moment, boolean>, 'onChange'> {
    label?: ReactNode;
    onChange?:
        | ((
              value: string | undefined,
              context: PickerChangeHandlerContext<TimeValidationError>
          ) => void)
        | undefined;
}

const ShTimePicker = forwardRef<HTMLDivElement, TimePickerLocalProps>(
    ({ label, ...other }, ref) => {
        return (
            <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
                <TimePicker
                    ref={ref}
                    ampm={false}
                    sx={{ width: '100%' }}
                    label={label}
                    {...other}
                    value={
                        other.value
                            ? moment(
                                  new Date(
                                      `${moment().format('YYYY-MM-DD')} ${other.value || '00:00:00'}`
                                  )
                              )
                            : undefined
                    }
                    onChange={(date, context) => {
                        other?.onChange?.(date?.format('HH:MM:00'), context);
                    }}
                />
            </LocalizationProvider>
        );
    }
);
ShTimePicker.displayName = 'ShTimePicker';

export default ShTimePicker;
