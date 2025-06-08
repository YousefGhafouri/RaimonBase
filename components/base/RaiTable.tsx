import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  Typography,
  TableFooter,
} from "@mui/material";
import { basicNullHandler } from "../../helpers/table";
import ConditionalRender from "./ConditionalRendering";
import { green } from "@mui/material/colors";
import Pagination, {
  IPaginationProps,
} from "@Base/components/base/Pagination/Pagination";
import useIsMobile from "@/hooks/useIsMobile";



export interface headerItemT<T extends object = {}> {
  label: string;
  key: keyof T | string;
  width?: number;
  cellRenderer?: (inp:{row: T, index?: number }) => React.ReactNode;
  headCellProp?: TableCellProps;
  bodyCellProp?: TableCellProps;
}

export type Iheader<T extends object> = Array<headerItemT<T>>;

export default function RaiTable<
  T extends object
>({
  header,
  items,
  loading = false,
  children,
  pagination,
  height,
}: {
  header: Array<headerItemT<T>>;
  height?: number;
  items?: T[];
  loading?: Boolean;
  children?: (data: T) => React.ReactNode;
  pagination?: IPaginationProps;
}) {
  const isMobile = useIsMobile();
  const headerWithRowIndex: Array<headerItemT<T>> = [
    ...(!header.some((item) => item.key === "index")
      ? [{ label: "ردیف", key: "index", width: 45 }]
      : []),
    ...header,
  ];
  return (
    <Box component={isMobile ? "div" : Paper}>
      <TableContainer sx={{ position: "relative", height, overflow: "unset" }}>
        <Table size="small" aria-label="simple table">
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
                  {headerWithRowIndex.map(({ label, width, headCellProp:{sx,...headCellProp}={} }) => (
                    <TableCell
                      width={width}
                      key={label}
                      {...headCellProp}
                      sx={[
                        (theme) => ({
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                        }),
                        ...(Array.isArray(sx) ? sx : [sx]),
                      ]}
                        
                    >
                      {label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
            }
          />

          <ConditionalRender
            condition={!isMobile}
            render={
              <TableBody>
                {loading && (
                  <TableCell colSpan={12}>
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
                  <TableCell colSpan={12}>
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
                {items
                  ?.map((data, index) => ({
                    ...data,
                    index: index + 1,
                  }))
                  ?.map((row, index) => (
                    <TableRow
                      key={`${index}`}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      {headerWithRowIndex?.map(
                        ({ key, cellRenderer: CellRenderer, bodyCellProp }) => (
                          <TableCell key={key.toString()} {...bodyCellProp}>
                            {CellRenderer ? (
                              <CellRenderer row={row} index={index} />
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
                  key={`${index}`}
                  sx={{
                    marginBlock: 2,
                    marginInline: 1,
                  }}
                >
                  <CardHeader title={`ردیف ${index + 1}`} />
                  {loading && (
                    <TableCell colSpan={12}>
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
                    <TableCell colSpan={12}>
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
                            zeroMinWidth
                            flexShrink={1}
                          >
                            {label}
                          </Grid>
                          <Grid
                            flexShrink={1}
                            xs={5.8}
                            zeroMinWidth
                            padding={2}
                            style={{
                              backgroundColor: green[50],
                              borderRadius: 5,
                            }}
                          >
                            {CellRenderer ? (
                              <CellRenderer row={row} index={index} />
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

        {pagination && <Pagination {...pagination} />}
      </TableFooter>
    </Box>
  );
}
