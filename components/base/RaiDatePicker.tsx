import { Moment } from 'moment-jalaali';
import { AdapterMomentJalaali } from '@mui/x-date-pickers/AdapterMomentJalaali';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { forwardRef, ReactNode } from 'react';
// import 'moment/locale/fa';
import { DesktopDatePickerProps as MuiDesktopDatePickerProps } from '@mui/x-date-pickers/DesktopDatePicker';

export interface DesktopDatePickerProps
    extends MuiDesktopDatePickerProps<Moment, boolean> {
    label?: ReactNode;
}
// moment.locale('fa');
const ShDatePicker = forwardRef<HTMLDivElement, DesktopDatePickerProps>(
    ({ label, ...other }, ref) => {
        return (
            <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
                <DatePicker
                    ref={ref}
                    sx={{ width: '100%' }}
                    label={label}
                    slotProps={{
                        ...other.slotProps,
                        field: { clearable: true, ...other.slotProps?.field },
                    }}
                    {...other}
                />
            </LocalizationProvider>
        );
    }
);
ShDatePicker.displayName = 'ShDatePicker';

export default ShDatePicker;
