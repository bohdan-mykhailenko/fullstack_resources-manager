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
const GRAPHQL_URL = API_URL + "/graphql";

export default class APIClient {
  public readonly admin: AdminServiceClient;
  public readonly animalShelters: AnimalSheltersServiceClient;
  public readonly animalSheltersFeedback: AnimalSheltersFeedbackServiceClient;
  public readonly animalSheltersRatings: AnimalSheltersRatingsServiceClient;
  public readonly users: UsersServiceClient;

  constructor(options?: ClientOptions) {
    const base = new BaseAPIClient(API_URL, GRAPHQL_URL, options ?? {});

    this.admin = new AdminServiceClient(base);
    this.animalShelters = new AnimalSheltersServiceClient(base);
    this.animalSheltersFeedback = new AnimalSheltersFeedbackServiceClient(base);
    this.animalSheltersRatings = new AnimalSheltersRatingsServiceClient(base);
    this.users = new UsersServiceClient(base);
  }
}
