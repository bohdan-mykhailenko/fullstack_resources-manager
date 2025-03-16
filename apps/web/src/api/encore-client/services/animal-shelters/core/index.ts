import { BaseAPIClient } from "@/api/encore-client/services/baseClient";
import { makeRecord } from "@/api/encore-client/utils";
import { PaginationParams } from "@/api/shared/interfaces";

import type {
  AnimalShelterOutput,
  CreateAnimalShelterInput,
  PaginatedAnimalSheltersList,
  SearchAnimalShelterParams,
  SearchedAnimalSheltersList,
} from "./interfaces";

export class AnimalSheltersServiceClient {
  private baseClient: BaseAPIClient;

  constructor(baseClient: BaseAPIClient) {
    this.baseClient = baseClient;
  }

  public async create(
    params: CreateAnimalShelterInput
  ): Promise<AnimalShelterOutput> {
    const response = await this.baseClient.callTypedAPI(
      "POST",
      `/shelters`,
      JSON.stringify(params)
    );

    return (await response.json()) as AnimalShelterOutput;
  }

  public async getList(
    params: PaginationParams
  ): Promise<PaginatedAnimalSheltersList> {
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
    return (await response.json()) as PaginatedAnimalSheltersList;
  }

  public async getOne(id: string): Promise<AnimalShelterOutput> {
    const response = await this.baseClient.callTypedAPI(
      "GET",
      `/shelters/${encodeURIComponent(id)}`
    );

    return (await response.json()) as AnimalShelterOutput;
  }

  public async remove(id: string): Promise<void> {
    await this.baseClient.callTypedAPI(
      "DELETE",
      `/shelters/${encodeURIComponent(id)}`
    );
  }

  public async search(
    params: SearchAnimalShelterParams
  ): Promise<SearchedAnimalSheltersList> {
    const query = makeRecord<string, string | string[]>({
      query: params.query,
    });

    const response = await this.baseClient.callTypedAPI(
      "GET",
      `/shelters/search`,
      undefined,
      { query }
    );

    return (await response.json()) as SearchedAnimalSheltersList;
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
  ): Promise<AnimalShelterOutput> {
    const response = await this.baseClient.callTypedAPI(
      "PUT",
      `/shelters/${encodeURIComponent(id)}`,
      JSON.stringify(params)
    );

    return (await response.json()) as AnimalShelterOutput;
  }
}
