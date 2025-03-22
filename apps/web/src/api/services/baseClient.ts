import {
  APIError,
  APIErrorResponse,
  ErrorCode,
  isAPIErrorResponse,
} from "@/api/errors";
import type { AuthHandlerParams, ClientOptions } from "@/api/interfaces";
import type { AuthDataGenerator, CallParameters, Fetcher } from "@/api/types";
import { encodeQuery, makeRecord } from "@/api/utils";
import { TypedDocumentString } from "@/graphql/graphql";

const boundFetch = fetch.bind(this);

export class BaseAPIClient {
  readonly baseURL: string;
  readonly graphqlURL: string;
  readonly fetcher: Fetcher;
  readonly headers: Record<string, string>;
  readonly requestInit: Omit<RequestInit, "headers"> & {
    headers?: Record<string, string>;
  };
  readonly authGenerator?: AuthDataGenerator;

  constructor(baseURL: string, graphqlURL: string, options: ClientOptions) {
    this.baseURL = baseURL;
    this.graphqlURL = graphqlURL;
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

  private async getAuthData(path: string): Promise<CallParameters | undefined> {
    let authData: AuthHandlerParams | undefined;

    // If authorization data generator is present, call it and add the returned data to the request
    if (this.authGenerator) {
      const mayBePromise = this.authGenerator(path);

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

  /**
   * Reads a ReadableStream of Uint8Array chunks and converts them to decoded string chunks.
   * This method is an asynchronous generator that processes the stream incrementally.
   *
   * @param {ReadableStream<Uint8Array>} body - The readable stream containing binary data.
   * @returns {AsyncIterable<string>} An asynchronous iterable that yields decoded string chunks.
   * @private
   */
  private async *getIterableStream(
    body: ReadableStream<Uint8Array>
  ): AsyncIterable<string> {
    const reader = body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();

      if (done) {
        break;
      }

      const decodedChunk = decoder.decode(value, { stream: true });

      yield decodedChunk;
    }
  }

  /**
   * Processes a streaming request by iterating over the chunks of data from the provided ReadableStream.
   * Emits each chunk to the observer and accumulates the output.
   * In case of an error, emits a stream error to the observer and captures the exception using Sentry.
   *
   * @param {ReadableStream<Uint8Array>} params.body - The readable stream containing the data chunks.
   * @param {AIEnhanceTextRoute} params.route - The route to which the data chunks should be emitted.
   * @param {string} params.streamId - The unique identifier for the stream.
   * @returns {Promise<string>} The accumulated output from the stream.
   * @throws {StreamError} - If an error occurs during the streaming process.
   * @private
   */
  private async processStreaming(
    body: ReadableStream<Uint8Array>
  ): Promise<string> {
    let output = "";

    try {
      for await (const textChunk of this.getIterableStream(body)) {
        output += textChunk;
      }
    } catch (error: any) {
      throw new APIError(500, {
        code: ErrorCode.Internal,
        message: error.message,
      });
    }

    return output;
  }

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
    const authData = await this.getAuthData(path);

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
    const queryString = query
      ? "?" + encodeQuery(query as Record<string, string>)
      : "";
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

  public async callTypedAPI(
    method: string,
    path: string,
    body?: BodyInit,
    params?: CallParameters
  ): Promise<Response> {
    const response = await this.callAPI(method, path, body, {
      ...params,
      headers: { "Content-Type": "application/json", ...params?.headers },
    });

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      const originalJson = response.json;

      response.json = async () => {
        return await originalJson.call(response);

        // use snake_case in the both sides for now
        // return transformKeys(data) as DeepSnakeToCamelCase<T>;
      };
    }

    return response;
  }

  public async callGraphql<Result, Variables>(
    query: TypedDocumentString<unknown, Variables>,
    resultKey: string,
    path: string,
    ...[variables]: Variables extends Record<string, never> ? [] : [Variables]
  ) {
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/graphql-response+json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    };

    const authData = await this.getAuthData(path);

    if (authData) {
      if (authData.headers) {
        init.headers = { ...init.headers, ...authData.headers };
      }
    }

    const response = await fetch(this.graphqlURL, init);

    if (!response.body) {
      throw new APIError(500, {
        code: ErrorCode.Internal,
        message: "No response body",
      });
    }

    if (!response.ok) {
      throw new APIError(response.status, {
        code: ErrorCode.Internal,
        message: response.statusText,
      });
    }

    const result = await this.processStreaming(response.body);

    return JSON.parse(result).data[resultKey] as Result;
  }
}
