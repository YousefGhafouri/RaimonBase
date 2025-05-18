import { useCallback, useMemo, useState } from "react";

export default function useTablePagination(
  defaultPage = 1,
  defaultRowsPerPage = 10
) {
  const [page, setPage] = useState(defaultPage);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const handleChangePage = useCallback(
    (_: unknown, newPage: number) => {
      setPage(newPage + 1);
    },
    [setPage]
  );
  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(1);
    },
    [setPage, setRowsPerPage]
  );
  const actions = useMemo(
    () => ({
      handleChangePage,
      handleChangeRowsPerPage,
    }),
    [handleChangePage, handleChangeRowsPerPage]
  );
  return useMemo(
    () => ({
      page,
      rowsPerPage,
      ...actions,
    }),
    [page, rowsPerPage, actions]
  );
}
