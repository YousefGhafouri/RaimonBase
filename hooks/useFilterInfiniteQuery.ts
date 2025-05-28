import { useState, useMemo } from "react";
import { useForm, UseFormProps } from "react-hook-form";
import {
  useInfiniteQuery,
  useQueryClient,
  UseInfiniteQueryOptions,
  QueryFunctionContext,
  InfiniteData,
  QueryKey,
} from "@tanstack/react-query";

interface QueryFnArgs<TFilter> {
  filters: TFilter;
  page: number;
  context: QueryFunctionContext;
}
interface UseFilterInfiniteQueryParams<TFilter extends object, TResult>
  extends Omit<
    UseInfiniteQueryOptions<TResult, unknown, TResult, TResult, any[]>,
    "queryFn" | "queryKey" | "getNextPageParam" | "initialPageParam"
  > {
  getQueryKey: (filters: TFilter) => any[];
  queryFn: (args: QueryFnArgs<TFilter>) => Promise<TResult>;
  formOptions?: UseFormProps<TFilter>;
  getNextPageParam?: (lastPage: TResult, pages: TResult[]) => unknown;
  initialPageParam?: unknown;
}

export function useFilterInfiniteQuery<TFilter extends object, TResult>({
  formOptions,
  queryFn,
  getNextPageParam,
  initialPageParam,
  getQueryKey,
  ...queryOptions
}: UseFilterInfiniteQueryParams<TFilter, TResult>) {
  const [filters, setFilters] = useState<TFilter>(
    formOptions?.defaultValues as TFilter
  );
  const [hadInteraction, setHadInteraction] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<TFilter>(formOptions);

  const queryKey = getQueryKey(filters);

  const handleFilter = (newFilters: TFilter) => {
    setFilters(newFilters);
    setHadInteraction(true);
    queryClient.invalidateQueries({ queryKey: getQueryKey(newFilters) });
  };
  const {enabled = hadInteraction} = queryOptions
  const queryData = useInfiniteQuery<TResult, unknown, InfiniteData<TResult>, QueryKey>({
    initialPageParam: 1,
    getNextPageParam: (lastPage:any) => {
      return (lastPage?.pageNumber || 0) + 1
    },
    getPreviousPageParam: (_firstPage, sec) => {
        return ((sec[sec.length - 1] as any)?.pageNumber || 1) - 1;
    },
    ...queryOptions,
    queryKey,
    queryFn: async (context) => {
      const pageParam = context.pageParam ?? 1;
      return await queryFn({ filters, page: pageParam as number, context });
    },//@ts-ignore
    enabled: enabled,
  });
  const { data } = queryData
  const results = useMemo(
    () => (data?.pages ?? []).flatMap((page:any) => page?.reportData ?? []),
    [data]
  );
  data

  return {
    form,
    filters,
    handleFilter,
    results,
    hadInteraction,
    queryData,
  };
}
