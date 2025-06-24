import ConditionalComponent from '@Base/components/base/ConditionalComponent';
import ConditionalRender from '@Base/components/base/ConditionalRendering';
import Observer from '@Base/components/base/Pagination/Observer';
import Pagination, { IPaginationProps } from '@Base/components/base/Pagination/Pagination';
import { basicNullHandler } from '@Base/helpers/table';
import {
  Box, Card,
  CardHeader, CircularProgress, Divider,
  Grid, TableFooter, Typography, useMediaQuery
} from '@mui/material';
import { green } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

export interface IheaderItem<T extends object>{
    label: string;
    key: keyof T | (string & {});
    width?: number;
    cellRenderer?: (data: {row: T, index: number, id: string, field: keyof T, formattedValue: T | string}) => React.ReactNode;
    headCellProp?: TableCellProps;
    bodyCellProp?: TableCellProps;
}

export type Iheader<T extends object> = Array<IheaderItem<T>>

export interface RaiTableProps<
    T extends object,
> {
    header: Iheader<T>;
    items: T[];
    loading?: Boolean;
    height?: number;
    children?: (data: T) => React.ReactNode;
    pagination?: IPaginationProps;
    slotProps?:{
      TableBodyProps?:any
      TableProps?:any
    }
}

export default function RaiTable<
    T extends object,
>({
    header,
    items,
    loading = false,
    children,
    height,
    pagination,
    slotProps:{
      TableBodyProps={},
      TableProps={}
    }={}
}: RaiTableProps<T>) {
  const isMobile = useMediaQuery("(max-width: 767px)");
    const headerWithRowIndex: Array<IheaderItem<T>> = [
      ...(!header.some((item) => item.key === 'index')
          ? [{ label: 'ردیف', key: 'index', width: 45 }]
          : []),
      ...header,
  ];
  const columnsLength = headerWithRowIndex.length
    return (
      <Box component={isMobile ? "div" : Paper}>
        <TableContainer
          sx={{ position: "relative", height, overflow: "unset" }}
        >
          <Table size="small" aria-label="simple table" {...TableProps} sx={[{tableLayout: "fixed"},
            ...Array.isArray(TableProps.sx)?TableProps.sx:[TableProps.sx]
          ]}>
            <ConditionalRender
              condition={!isMobile}
              render={
                <TableHead
                  sx={{
                    position: "sticky",
                    top: "var(--sticky-top-offset,0)",
                    overflowX: "auto",
                    zIndex: 1,
                  }}
                >
                  <TableRow>
                    {headerWithRowIndex.map(
                      ({ label, width, headCellProp = {} }) => (
                        <TableCell
                          width={width}
                          key={label}
                          {...headCellProp}
                          sx={[
                            (theme) => ({
                              backgroundColor: theme.palette.primary.main,
                              color: "white",
                              ...headCellProp?.sx,
                            }),
                            ...(Array.isArray(headCellProp.sx)
                              ? headCellProp.sx
                              : [headCellProp.sx]),
                          ]}
                        >
                          {label}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
              }
            />

            <ConditionalRender
              condition={!isMobile}
              render={
                <TableBody {...TableBodyProps} >
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={columnsLength}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "10px",
                          }}
                        >
                          <CircularProgress />
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                  {!loading && items?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={columnsLength}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "10px",
                          }}
                        >
                          <Typography fontWeight={500}>
                            داده ای برای نمایش موجود نیست
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                  {items
                    ?.map((data, index) => ({
                      ...data,
                      index: index + 1,
                    }))
                    ?.map((row, index) => (
                      <TableRow
                        key={`${row}`}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        {headerWithRowIndex?.map(
                          ({
                            key,
                            cellRenderer: CellRenderer,
                            bodyCellProp,
                          }) => (
                            <TableCell key={key.toString()} {...bodyCellProp}>
                              {CellRenderer ? (
                                <CellRenderer
                                  row={row}
                                  index={index}
                                  id={key.toString()}
                                  field={key as keyof T}
                                  formattedValue={
                                    basicNullHandler(row[key as keyof T]) as string
                                  }
                                />
                              ) : children ? (
                                children(row)
                              ) : (
                                `${basicNullHandler(row[key as keyof T])}`
                              )}
                            </TableCell>
                          )
                        )}
                      </TableRow>
                    ))}
                    <ConditionalComponent
                      condition={!!pagination}
                      renderProps={pagination}
                      render={(props)=>
                        <TableRow>
                          <TableCell colSpan={columnsLength}>
                            <Observer {...props} />
                          </TableCell>
                        </TableRow>
                      }
                    />
                </TableBody>
              }
            >
              {items
                ?.map((data, index) => ({
                  ...data,
                  index: index + 1,
                }))
                ?.map((row, index) => (
                  <Card
                    key={`${row}`}
                    sx={{
                      marginBlock: 2,
                      marginInline: 1,
                    }}
                  >
                    <CardHeader title={`ردیف ${index + 1}`} />
                    {loading && (
                      <TableCell colSpan={columnsLength}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "10px",
                          }}
                        >
                          <CircularProgress />
                        </Box>
                      </TableCell>
                    )}
                    {!loading && items?.length === 0 && (
                      <TableCell colSpan={columnsLength}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "10px",
                          }}
                        >
                          <Typography fontWeight={500}>
                            داده ای برای نمایش موجود نیست
                          </Typography>
                        </Box>
                      </TableCell>
                    )}
                    {headerWithRowIndex.map(
                      ({ key, cellRenderer: CellRenderer, label }) => {
                        if (key === "index") return null;
                        return (
                          <Grid
                            container
                            spacing={1}
                            marginBlock={1}
                            key={key.toString()}
                            gap={0.5}
                            flexShrink={1}
                            marginInline={0.2}
                          >
                            <Grid
                              style={{
                                border: `1px solid ${green[100]}`,
                                borderRadius: 5,
                              }}
                              padding={2}
                              xs={5.7}
                              minWidth={0}
                              flexShrink={1}
                            >
                              {label}
                            </Grid>
                            <Grid
                              flexShrink={1}
                              xs={5.8}
                              minWidth={0}
                              padding={2}
                              style={{
                                backgroundColor: green[50],
                                borderRadius: 5,
                              }}
                            >
                              {CellRenderer ? (
                                <CellRenderer
                                  row={row}
                                  index={index}
                                  id={key.toString()}
                                  field={key as keyof T}
                                  formattedValue={
                                    basicNullHandler(row[key as keyof T]) as string
                                  }
                                />
                              ) : children ? (
                                children(row)
                              ) : (
                                `${basicNullHandler(row[key as keyof T])}`
                              )}
                            </Grid>
                          </Grid>
                        );
                      }
                    )}
                  </Card>
                ))}
                <ConditionalComponent
                  condition={!!pagination}
                  primaryProps={pagination}
                  primary={Observer}
                />
            </ConditionalRender>
          </Table>
        </TableContainer>
        <TableFooter
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            background: "white",
            padding: 1,
          }}
        >
          <Divider />
          <ConditionalComponent
            condition={!!pagination}
            renderProps={pagination}
            render={Pagination}
          />
        </TableFooter>
      </Box>
    );
}