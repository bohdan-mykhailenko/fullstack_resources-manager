import {
  UseQueryResult,
  useQuery as useQueryHook,
} from "@tanstack/react-query";
import { useMemo } from "react";

import { APIQueryKey } from "@/queries/keys";

interface QueryConfiguration<TData> {
  queryKey: APIQueryKey | number | string | APIQueryKey[] | (number | string)[];
  queryFn: () => Promise<TData>;
  enabled?: boolean;
}

interface ExtendedQueryResult<TData>
  extends Omit<UseQueryResult<TData, Error>, "error"> {
  isEmpty: boolean;
  error: Error | null;
}

export function useQuery<TData>({
  queryKey,
  queryFn,
  enabled = true,
}: QueryConfiguration<TData>): ExtendedQueryResult<TData> {
  const queryResult = useQueryHook({
    queryKey: [queryKey],
    queryFn: queryFn,
    enabled,
  });

  const isEmpty = useMemo(
    () =>
      !queryResult.isLoading &&
      !queryResult.isError &&
      (queryResult.data === null ||
        queryResult.data === undefined ||
        (Array.isArray(queryResult.data) && queryResult.data.length === 0)),
    [queryResult.isLoading, queryResult.isError, queryResult.data]
  );

  return useMemo(
    () => ({
      ...queryResult,
      isEmpty,
    }),
    [queryResult, isEmpty]
  );
}
