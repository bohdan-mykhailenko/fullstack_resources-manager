export function encodeQuery(parts: Record<string, string | string[]>): string {
  const pairs: string[] = [];
  for (const key in parts) {
    const values = (
      Array.isArray(parts[key]) ? parts[key] : [parts[key]]
    ) as string[];

    for (const value of values) {
      pairs.push(`${key}=${encodeURIComponent(value)}`);
    }
  }

  return pairs.join("&");
}

// makeRecord takes a record and strips any undefined values from it,
// and returns the same record with a narrower type.
export function makeRecord<K extends string | number | symbol, V>(
  record: Record<K, V | undefined>
): Record<K, V> {
  for (const key in record) {
    if (record[key] === undefined) {
      delete record[key];
    }
  }

  return record as Record<K, V>;
}
