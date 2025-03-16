import {
  APIError,
  APIErrorResponse,
  ErrorCode,
  isAPIErrorResponse,
} from "./errors";
import type { AuthHandlerParams } from "./interfaces";
import type { CallParameters, Fetcher } from "./types";
import type { AuthDataGenerator } from "./types";
import { encodeQuery, makeRecord } from "./utils";

const API_URL = import.meta.env.VITE_API_URL;

const boundFetch = fetch.bind(this);

/**
 * Client is an API client for the backend-wswi Encore application.
 */
export default class APIClient {
  public readonly admin: admin.ServiceClient;
  public readonly animal_shelters: animal_shelters.ServiceClient;
  public readonly animal_shelters_feedback: animal_shelters_feedback.ServiceClient;
  public readonly animal_shelters_ratings: animal_shelters_ratings.ServiceClient;
  public readonly users: users.ServiceClient;

  /**
   * Creates a Client for calling the public and authenticated APIs of your Encore application.
   *
   * @param target  The target which the client should be configured to use. See Local and Environment for options.
   * @param options Options for the client
   */
  constructor(options?: ClientOptions) {
    const base = new BaseClient(API_URL, options ?? {});
    this.admin = new admin.ServiceClient(base);
    this.animal_shelters = new animal_shelters.ServiceClient(base);
    this.animal_shelters_feedback = new animal_shelters_feedback.ServiceClient(
      base
    );
    this.animal_shelters_ratings = new animal_shelters_ratings.ServiceClient(
      base
    );
    this.users = new users.ServiceClient(base);
  }
}

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
  auth?: AuthHandlerParams | AuthDataGenerator;
}

export namespace admin {
  export interface AdminInput {
    password: string;
  }

  export interface AdminOutput {
    message: string;
    token: string;
  }

  export class ServiceClient {
    private baseClient: BaseClient;

    constructor(baseClient: BaseClient) {
      this.baseClient = baseClient;
    }

    public async authenticate(params: AdminInput): Promise<AdminOutput> {
      const response = await this.baseClient.callTypedAPI(
        "POST",
        `/admin/auth`,
        JSON.stringify(params)
      );
      return (await response.json()) as AdminOutput;
    }
  }
}

export namespace animal_shelters {
  export class ServiceClient {
    private baseClient: BaseClient;

    constructor(baseClient: BaseClient) {
      this.baseClient = baseClient;
    }

    public async create(
      params: core.CreateAnimalShelterInput
    ): Promise<core.AnimalShelterOutput> {
      const response = await this.baseClient.callTypedAPI(
        "POST",
        `/shelters`,
        JSON.stringify(params)
      );
      return (await response.json()) as core.AnimalShelterOutput;
    }

    public async getList(
      params: shared.PaginationParams
    ): Promise<core.PaginatedAnimalSheltersList> {
      const query = makeRecord<string, string | string[]>({
        limit: params.limit === undefined ? undefined : String(params.limit),
        page: params.page === undefined ? undefined : String(params.page),
      });

      const response = await this.baseClient.callTypedAPI(
        "GET",
        `/shelters`,
        undefined,
        { query }
      );
      return (await response.json()) as core.PaginatedAnimalSheltersList;
    }

    public async getOne(id: string): Promise<core.AnimalShelterOutput> {
      const response = await this.baseClient.callTypedAPI(
        "GET",
        `/shelters/${encodeURIComponent(id)}`
      );
      return (await response.json()) as core.AnimalShelterOutput;
    }

    public async remove(id: string): Promise<void> {
      await this.baseClient.callTypedAPI(
        "DELETE",
        `/shelters/${encodeURIComponent(id)}`
      );
    }

    public async search(
      params: core.SearchAnimalShelterParams
    ): Promise<core.SearchedAnimalSheltersList> {
      const query = makeRecord<string, string | string[]>({
        query: params.query,
      });

      const response = await this.baseClient.callTypedAPI(
        "GET",
        `/shelters/search`,
        undefined,
        { query }
      );
      return (await response.json()) as core.SearchedAnimalSheltersList;
    }

    public async update(
      id: string,
      params: {
        name?: string;
        description?: string;
        email?: string;
        websiteUrl?: string;
        imageUrl?: string;
        address?: string;
        phone?: string;
      }
    ): Promise<core.AnimalShelterOutput> {
      const response = await this.baseClient.callTypedAPI(
        "PUT",
        `/shelters/${encodeURIComponent(id)}`,
        JSON.stringify(params)
      );
      return (await response.json()) as core.AnimalShelterOutput;
    }
  }
}

export namespace animal_shelters_feedback {
  export class ServiceClient {
    private baseClient: BaseClient;

    constructor(baseClient: BaseClient) {
      this.baseClient = baseClient;
    }

    public async add(
      id: string,
      params: {
        content: string;
        userId: number;
      }
    ): Promise<feedback.FeedbackOutput> {
      const response = await this.baseClient.callTypedAPI(
        "POST",
        `/shelters/${encodeURIComponent(id)}/feedbacks`,
        JSON.stringify(params)
      );
      return (await response.json()) as feedback.FeedbackOutput;
    }

    public async getList(
      id: string,
      params: {
        page?: number;
        limit?: number;
      }
    ): Promise<feedback.FeedbacksList> {
      const query = makeRecord<string, string | string[]>({
        limit: params.limit === undefined ? undefined : String(params.limit),
        page: params.page === undefined ? undefined : String(params.page),
      });

      const response = await this.baseClient.callTypedAPI(
        "GET",
        `/shelters/${encodeURIComponent(id)}/feedbacks`,
        undefined,
        { query }
      );
      return (await response.json()) as feedback.FeedbacksList;
    }
  }
}

export namespace animal_shelters_ratings {
  export class ServiceClient {
    private baseClient: BaseClient;

    constructor(baseClient: BaseClient) {
      this.baseClient = baseClient;
    }

    public async rate(
      id: string,
      params: {
        rating: number;
        userId: number;
      }
    ): Promise<ratings.RatingOutput> {
      const response = await this.baseClient.callTypedAPI(
        "POST",
        `/shelters/${encodeURIComponent(id)}/ratings`,
        JSON.stringify(params)
      );
      return (await response.json()) as ratings.RatingOutput;
    }
  }
}

export namespace users {
  export interface SignInInput {
    email: string;
    password: string;
  }

  export interface SignUpInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  export interface UserOutput {
    firstName: string;
    lastName: string;
    email: string;
    accessToken: string;
    refreshToken: string;
  }

  export class ServiceClient {
    private baseClient: BaseClient;

    constructor(baseClient: BaseClient) {
      this.baseClient = baseClient;
    }

    public async refresh(params: { refreshToken: string }): Promise<void> {
      await this.baseClient.callTypedAPI(
        "POST",
        `/refresh-token`,
        JSON.stringify(params)
      );
    }

    public async signIn(params: SignInInput): Promise<void> {
      await this.baseClient.callTypedAPI(
        "POST",
        `/sign-in`,
        JSON.stringify(params)
      );
    }

    public async signUp(params: SignUpInput): Promise<UserOutput> {
      const response = await this.baseClient.callTypedAPI(
        "POST",
        `/sign-up`,
        JSON.stringify(params)
      );
      return (await response.json()) as UserOutput;
    }
  }
}

export namespace core {
  export interface AnimalShelterOutput {
    id: string;
    name: string;
    description: string;
    email: string;
    websiteUrl: string;
    imageUrl: string;
    address: string;
    phone: string;
    ratingsCount?: number;
    feedbacksCount?: number;
    createdAt: string;
    updatedAt?: string;
  }

  export interface CreateAnimalShelterInput {
    name: string;
    description: string;
    email: string;
    websiteUrl: string;
    imageUrl: string;
    address: string;
    phone: string;
  }

  export interface PaginatedAnimalSheltersList {
    items: AnimalShelterOutput[];
    total: number;
    page: number;
    limit: number;
  }

  export interface SearchAnimalShelterParams {
    query?: string;
  }

  export interface SearchedAnimalSheltersList {
    items: AnimalShelterOutput[];
  }
}

export namespace feedback {
  export interface FeedbackOutput {
    content: string;
    created_at: string;
    first_name: string;
    last_name: string;
    id: string;
  }

  export interface FeedbacksList {
    items: FeedbackOutput[];
    total: number;
    page: number;
    limit: number;
  }
}

export namespace ratings {
  export interface RatingOutput {
    message: string;
  }
}

export namespace shared {
  export interface PaginationParams {
    page?: number;
    limit?: number;
  }
}

class BaseClient {
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

    // Add User-Agent header if the script is running in the server
    // because browsers do not allow setting User-Agent headers to requests
    if (typeof window === "undefined") {
      this.headers["User-Agent"] =
        "backend-wswi-Generated-TS-Client (Encore/v1.46.9)";
    }

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

  async getAuthData(): Promise<CallParameters | undefined> {
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

  // callAPI is used by each generated API method to actually make the request
  public async callAPI(
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
}
