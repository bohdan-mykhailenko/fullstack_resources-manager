import { SQLDatabase } from "encore.dev/storage/sqldb";

import { PaginationParams } from "./interfaces";

interface PaginationResult {
  page: number;
  limit: number;
  offset: number;
}

export function getPagination({
  page = 1,
  limit = 10,
}: PaginationParams): PaginationResult {
  return {
    page,
    limit,
    offset: (page - 1) * limit,
  };
}

export async function processDbList<T>(
  query: ReturnType<typeof SQLDatabase.prototype.query>,
  transform?: (item: any) => T
): Promise<T[]> {
  const results: T[] = [];

  for await (const item of query) {
    results.push(transform ? transform(item) : (item as T));
  }

  return results;
}

export function convertDefaultParamsToUndefined<T>(
  params: Record<string, any> | null | undefined
): T {
  if (!params) return {} as T;

  const result: Record<string, any> = {};

  for (const key in params) {
    // Convert null to undefined, keep other values as is
    result[key] = params[key] === null ? undefined : params[key];
  }

  return result as T;
}
