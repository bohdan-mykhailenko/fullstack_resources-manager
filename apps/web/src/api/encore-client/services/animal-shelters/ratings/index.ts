import { BaseAPIClient } from "@/api/encore-client/services/baseClient";

import { RatingOutput } from "./interfaces";

export class AnimalSheltersRatingsServiceClient {
  private baseClient: BaseAPIClient;

  constructor(baseClient: BaseAPIClient) {
    this.baseClient = baseClient;
  }

  public async rate(
    id: string,
    params: {
      rating: number;
      userId: number;
    }
  ): Promise<RatingOutput> {
    const response = await this.baseClient.callTypedAPI(
      "POST",
      `/shelters/${encodeURIComponent(id)}/ratings`,
      JSON.stringify(params)
    );

    return (await response.json()) as RatingOutput;
  }
}
