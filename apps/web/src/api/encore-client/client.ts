import {
  AdminServiceClient,
  AnimalSheltersFeedbackServiceClient,
  AnimalSheltersRatingsServiceClient,
  AnimalSheltersServiceClient,
  UsersServiceClient,
} from "@/api/encore-client/services";
import { BaseAPIClient } from "@/api/encore-client/services/baseClient";

import { ClientOptions } from "./interfaces";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Client is an API client for the backend-wswi Encore application.
 */
export default class APIClient {
  public readonly admin: AdminServiceClient;
  public readonly animalShelters: AnimalSheltersServiceClient;
  public readonly animalSheltersFeedback: AnimalSheltersFeedbackServiceClient;
  public readonly animalSheltersRatings: AnimalSheltersRatingsServiceClient;
  public readonly users: UsersServiceClient;

  /**
   * Creates a Client for calling the public and authenticated APIs of your Encore application.
   *
   * @param target  The target which the client should be configured to use. See Local and Environment for options.
   * @param options Options for the client
   */
  constructor(options?: ClientOptions) {
    const baseWithAuth = new BaseAPIClient(API_URL, options ?? {});
    const baseWithoutAuth = new BaseAPIClient(API_URL, {
      ...options,
      auth: undefined,
    });

    this.admin = new AdminServiceClient(baseWithAuth);
    this.animalShelters = new AnimalSheltersServiceClient(baseWithAuth);
    this.animalSheltersFeedback = new AnimalSheltersFeedbackServiceClient(
      baseWithAuth
    );
    this.animalSheltersRatings = new AnimalSheltersRatingsServiceClient(
      baseWithAuth
    );
    this.users = new UsersServiceClient(baseWithoutAuth);
  }
}
