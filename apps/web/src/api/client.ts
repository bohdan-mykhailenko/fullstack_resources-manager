import {
  AdminServiceClient,
  AnimalSheltersFeedbackServiceClient,
  AnimalSheltersRatingsServiceClient,
  AnimalSheltersServiceClient,
  UsersServiceClient,
} from "@/api/services";
import { BaseAPIClient } from "@/api/services/baseClient";

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
    const base = new BaseAPIClient(API_URL, options ?? {});

    this.admin = new AdminServiceClient(base);
    this.animalShelters = new AnimalSheltersServiceClient(base);
    this.animalSheltersFeedback = new AnimalSheltersFeedbackServiceClient(base);
    this.animalSheltersRatings = new AnimalSheltersRatingsServiceClient(base);
    this.users = new UsersServiceClient(base);
  }
}
