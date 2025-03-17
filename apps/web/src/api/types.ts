import { AuthHandlerParams } from "./interfaces";

// A fetcher is the prototype for the inbuilt Fetch function
export type Fetcher = typeof fetch;

// CallParameters is the type of the parameters to a method call, but require headers to be a Record type
export type CallParameters = Omit<
  RequestInit,
  "method" | "body" | "headers"
> & {
  /** Headers to be sent with the request */
  headers?: Record<string, string>;

  /** Query parameters to be sent with the request */
  query?: Record<string, string | string[] | boolean | number | undefined>;
};

// AuthDataGenerator is a function that returns a new instance of the authentication data required by this API
export type AuthDataGenerator = (
  path: string
) => AuthHandlerParams | Promise<AuthHandlerParams | undefined> | undefined;
