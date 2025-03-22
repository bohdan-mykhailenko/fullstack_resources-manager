import { PaginationParams } from "@/api/interfaces";
import { BaseAPIClient } from "@/api/services/baseClient";
import { makeRecord } from "@/api/utils";

import type {
  AnimalShelterOutput,
  CreateAnimalShelterInput,
  FilteredSheltersList,
  PaginatedAnimalSheltersList,
  ShelterFilterParams,
} from "./interfaces";
import { FilterSheltersListQuery } from "./queries";

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

  public async filter(
    params: ShelterFilterParams,
    mode: "graphql" | "rest" = "rest"
  ): Promise<FilteredSheltersList> {
    const fields: string[] = [];

    if (params.is_verified) {
      fields.push("is_verified");
    }

    const formattedParams = {
      sort_by: params.sort_by,
      sort_order: params.sort_order,
      page: params.page,
      limit: params.limit,
      search: params.query,
      fields: fields.join(","),
    };

    const query = makeRecord<string, string | boolean | number | undefined>({
      ...formattedParams,
    });

    if (mode === "rest") {
      const response = await this.baseClient.callTypedAPI(
        "GET",
        `/shelters/filter`,
        undefined,
        { query }
      );

      return await response.json();
    } else {
      return await this.baseClient.callGraphql<
        FilteredSheltersList,
        { params: ShelterFilterParams }
      >(FilterSheltersListQuery, "filterSheltersList", `/shelters/filter`, {
        params: formattedParams,
      });
    }
  }

  public async update(
    id: string,
    params: {
      name?: string;
      description?: string;
      email?: string;
      website_url?: string;
      image_url?: string;
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

  public async verify(id: string): Promise<void> {
    await this.baseClient.callTypedAPI(
      "POST",
      `/shelters/${encodeURIComponent(id)}/verify`
    );
  }

  public async unverify(id: string): Promise<void> {
    await this.baseClient.callTypedAPI(
      "POST",
      `/shelters/${encodeURIComponent(id)}/unverify`
    );
  }
}
