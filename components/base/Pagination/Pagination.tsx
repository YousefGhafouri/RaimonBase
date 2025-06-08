import { Box } from "@mui/material";
import MuiPagination, { PaginationProps } from "@mui/material/Pagination";
import Observer from "@Base/components/base/Pagination/Observer";
import ConditionalRender from "@Base/components/base/ConditionalRendering";

export interface IPaginationProps {
  isLoading: boolean;
  page: number;
  totalPages: number;
  onPageChange?: (newPage: number) => void;
  onIntersect?: (isIntersecting: boolean) => void;
  disablePaginationOnScroll?: boolean;
  isOnlyScrollPagination?: boolean;
  className?: string;
  slotProps?: {
    root?: PaginationProps;
  };
  interSectionObserverOptions?: IntersectionObserverInit;
}

function Pagination(props: IPaginationProps) {
  const {
    page,
    totalPages,
    onPageChange,
    slotProps,
    className,
    isOnlyScrollPagination = false,
  } = props;
  if(isOnlyScrollPagination) return null
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <MuiPagination
        color="primary"
        className={className}
        count={totalPages}
        siblingCount={1}
        boundaryCount={1}
        page={page}
        onChange={(_, newPage) => {
          onPageChange?.(newPage);
        }}
        {...slotProps?.root}
      />
    </Box>
  );
}

export default Pagination;
