type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S;

export type DeepSnakeToCamelCase<T> =
  T extends Array<infer U>
    ? Array<DeepSnakeToCamelCase<U>>
    : T extends object
      ? {
          [K in keyof T as SnakeToCamelCase<K & string>]: DeepSnakeToCamelCase<
            T[K]
          >;
        }
      : T;

const toCamelCase = (string: string): string => {
  return string.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", "")
  );
};

export const transformKeys = <T extends object>(
  object: T
): DeepSnakeToCamelCase<T> => {
  if (Array.isArray(object)) {
    return object.map((item) =>
      typeof item === "object" && item !== null ? transformKeys(item) : item
    ) as DeepSnakeToCamelCase<T>;
  }

  const transformed = Object.entries(object).reduce((acc, [key, value]) => {
    const camelKey = toCamelCase(key);
    const transformedValue =
      value && typeof value === "object" ? transformKeys(value) : value;

    return { ...acc, [camelKey]: transformedValue };
  }, {});

  return transformed as DeepSnakeToCamelCase<T>;
};
