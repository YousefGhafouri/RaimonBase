import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, CircularProgress, Typography } from '@mui/material';
import { basicNullHandler } from '@Base/helpers/table';

interface IheaderItem<T extends object>{
    label: string;
    key: keyof T | (string & {});
    width?: number;
    cellRenderer?: (data: T, index?: number) => React.ReactNode;
}

export type Iheader<T extends object> = Array<IheaderItem<T>>

export default function RaiTable<
    T extends Record<string | number | symbol, unknown>,
>({
    header,
    items,
    loading = false,
    children,
}: {
    header: Iheader<T>;
    items: T[];
    loading?: Boolean;
    children?: (data: T) => React.ReactNode;
}) {
    return (
        <TableContainer component={Paper}>
            <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        {[
                            { label: 'ردیف', key: 'index', width: 45 },
                            ...header,
                        ].map(({ label, width }) => (
                            <TableCell width={width} key={label}>
                                {label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading && (
                        <TableCell colSpan={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    padding: '10px',
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        </TableCell>
                    )}
                    {!loading && items.length === 0 && (
                        <TableCell colSpan={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    padding: '10px',
                                }}
                            >
                                <Typography fontWeight={500}>
                                    داده ای برای نمایش موجود نیست
                                </Typography>
                            </Box>
                        </TableCell>
                    )}
                    {items
                        .map((data, index) => ({ ...data, index: index + 1 }))
                        .map((row, index) => (
                            <TableRow
                                key={`${row}`}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                {[
                                    { label: 'ردیف', key: 'index' },
                                    ...header,
                                ].map(({ key, cellRenderer }) => (
                                    <TableCell key={key.toString()}>
                                        {cellRenderer
                                            ? cellRenderer(row, index)
                                            : children
                                              ? children(row)
                                              : `${basicNullHandler(row[key])}`}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
