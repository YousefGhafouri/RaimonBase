import ConditionalRender from '@Base/components/base/ConditionalRendering';
import { Box, CircularProgress } from '@mui/material';
import React from 'react';

interface Props {
    totalPages: number;
    isLoading: boolean;
    page: number;
    onPageChange?: (newPage: number) => void;
    onIntersect?: (isIntersecting?: boolean) => void;
    disablePaginationOnScroll?: boolean;
    isOnlyScrollPagination?: boolean;
    interSectionObserverOptions?: IntersectionObserverInit;
}
const Observer = (props: Props) => {
    const {
        totalPages,
        isLoading,
        page,
        onPageChange,
        onIntersect,
        disablePaginationOnScroll = false,
        isOnlyScrollPagination = false,
        interSectionObserverOptions,
    } = props;
    const observer = React.useRef<IntersectionObserver>();
    const lastElementRef = React.useCallback(
        (node: HTMLDivElement) => {
            if (observer.current) {
                observer.current.disconnect();
            }
            observer.current = new IntersectionObserver((entries) => {
                onIntersect?.(entries[0]?.isIntersecting);
                if (
                    entries[0]?.isIntersecting &&
                    totalPages > page &&
                    // isMobile &&//
                    isOnlyScrollPagination &&
                    !isLoading &&
                    !disablePaginationOnScroll
                ) {
                    onPageChange?.(page + 1);
                }
            }, interSectionObserverOptions);
            if (node) {
                observer.current.observe(node);
            }
        },
        [isLoading, page, totalPages, props.isLoading]
    );
    return (
        <>
            <ConditionalRender condition={isLoading} render={
              // <TableCell colSpan={12}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '10px',
                            width:"100%"
                        }}
                    >
                        <CircularProgress />
                    </Box>
            } />
            <div
                style={{ height: '1px', width: '100%' }}
                ref={lastElementRef}
            />
        </>
    );
};

export default Observer;
