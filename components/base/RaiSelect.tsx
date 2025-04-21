import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectProps,
    Chip,
} from '@mui/material';

export default function ShSelect({
    items,
    label,
    ...reset
}: {
    items: { value: any; title?: string | null }[];
    label: string;
} & SelectProps) {
    const options = items?.map(({ value, title }) => (
        <MenuItem key={value} value={value}>
            {title}
        </MenuItem>
    ));
    return (
        <FormControl fullWidth>
            <InputLabel id="sh-simple-select-label">{label}</InputLabel>
            <Select
                sx={{
                    marginBlock: 1,
                }}
                labelId="sh-simple-select-label"
                id="sh-simple-select"
                input={
                    <OutlinedInput id="select-multiple-chip" label={label} />
                }
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {reset.multiple
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
                )}
                {...reset}
            >
                {options}
            </Select>
        </FormControl>
    );
}
