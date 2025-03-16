import {
  APIError,
  APIErrorResponse,
  ErrorCode,
  isAPIErrorResponse,
} from "../errors";
import type { AuthHandlerParams, ClientOptions } from "../interfaces";
import type { AuthDataGenerator, CallParameters, Fetcher } from "../types";
import { encodeQuery, makeRecord } from "../utils";

const boundFetch = fetch.bind(this);

export class BaseAPIClient {
  readonly baseURL: string;
  readonly fetcher: Fetcher;
  readonly headers: Record<string, string>;
  readonly requestInit: Omit<RequestInit, "headers"> & {
    headers?: Record<string, string>;
  };
  readonly authGenerator?: AuthDataGenerator;

  constructor(baseURL: string, options: ClientOptions) {
    this.baseURL = baseURL;
    this.headers = {};

    this.requestInit = options.requestInit ?? {};

    // Setup what fetch function we'll be using in the base client
    if (options.fetcher !== undefined) {
      this.fetcher = options.fetcher;
    } else {
      this.fetcher = boundFetch;
    }

    // Setup an authentication data generator using the auth data token option
    if (options.auth !== undefined) {
      const auth = options.auth;

      if (typeof auth === "function") {
        this.authGenerator = auth;
      } else {
        this.authGenerator = () => auth;
      }
    }
  }

  private async getAuthData(): Promise<CallParameters | undefined> {
    let authData: AuthHandlerParams | undefined;

    // If authorization data generator is present, call it and add the returned data to the request
    if (this.authGenerator) {
      const mayBePromise = this.authGenerator();

      if (mayBePromise instanceof Promise) {
        authData = await mayBePromise;
      } else {
        authData = mayBePromise;
      }
    }

    if (authData) {
      const data: CallParameters = {};

      data.headers = makeRecord<string, string>({
        authorization: authData.authorization,
        "x-access-type": authData.accessType,
      });

      return data;
    }

    return undefined;
  }

  // callAPI is used by each generated API method to actually make the request
  private async callAPI(
    method: string,
    path: string,
    body?: BodyInit,
    params?: CallParameters
  ): Promise<Response> {
    // eslint-disable-next-line prefer-const
    let { query, headers, ...rest } = params ?? {};
    const init = {
      ...this.requestInit,
      ...rest,
      method,
      body: body ?? null,
    };

    // Merge our headers with any predefined headers
    init.headers = { ...this.headers, ...init.headers, ...headers };

    // Fetch auth data if there is any
    const authData = await this.getAuthData();

    // If we now have authentication data, add it to the request
    if (authData) {
      if (authData.query) {
        query = { ...query, ...authData.query };
      }
      if (authData.headers) {
        init.headers = { ...init.headers, ...authData.headers };
      }
    }

    // Make the actual request
    const queryString = query ? "?" + encodeQuery(query) : "";
    const response = await this.fetcher(
      this.baseURL + path + queryString,
      init
    );

    // handle any error responses
    if (!response.ok) {
      // try and get the error message from the response body
      let body: APIErrorResponse = {
        code: ErrorCode.Unknown,
        message: `request failed: status ${response.status}`,
      };

      // if we can get the structured error we should, otherwise give a best effort
      try {
        const text = await response.text();

        try {
          const jsonBody = JSON.parse(text);

          if (isAPIErrorResponse(jsonBody)) {
            body = jsonBody;
          } else {
            body.message += ": " + JSON.stringify(jsonBody);
          }
        } catch {
          body.message += ": " + text;
        }
      } catch (error) {
        // otherwise we just append the text to the error message
        body.message += ": " + String(error);
      }

      throw new APIError(response.status, body);
    }

    return response;
  }

  // callTypedAPI makes an API call, defaulting content type to "application/json"
  public async callTypedAPI(
    method: string,
    path: string,
    body?: BodyInit,
    params?: CallParameters
  ): Promise<Response> {
    return this.callAPI(method, path, body, {
      ...params,
      headers: { "Content-Type": "application/json", ...params?.headers },
    });
  }
}
