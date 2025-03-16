import { AuthDataGenerator, Fetcher } from "./types";

/**
 * ClientOptions allows you to override any default behaviour within the generated Encore client.
 */
export interface ClientOptions {
  /**
   * By default the client will use the inbuilt fetch function for making the API requests.
   * however you can override it with your own implementation here if you want to run custom
   * code on each API request made or response received.
   */
  fetcher?: Fetcher;

  /** Default RequestInit to be used for the client */
  requestInit?: Omit<RequestInit, "headers"> & {
    headers?: Record<string, string>;
  };

  /**
   * Allows you to set the authentication data to be used for each
   * request either by passing in a static object or by passing in
   * a function which returns a new object for each request.
   */
  auth?: AuthDataGenerator;
}

export interface AuthHandlerParams {
  authorization: string;
  accessType?: string;
}
