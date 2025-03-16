import { BaseAPIClient } from "@/api/encore-client/services/baseClient";
import { makeRecord } from "@/api/encore-client/utils";

import type { FeedbackOutput, FeedbacksList } from "./interface";

export class AnimalSheltersFeedbackServiceClient {
  private baseClient: BaseAPIClient;

  constructor(baseClient: BaseAPIClient) {
    this.baseClient = baseClient;
  }

  public async add(
    id: string,
    params: {
      content: string;
      userId: number;
    }
  ): Promise<FeedbackOutput> {
    const response = await this.baseClient.callTypedAPI(
      "POST",
      `/shelters/${encodeURIComponent(id)}/feedbacks`,
      JSON.stringify(params)
    );

    return (await response.json()) as FeedbackOutput;
  }

  public async getList(
    id: string,
    params: {
      page?: number;
      limit?: number;
    }
  ): Promise<FeedbacksList> {
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

    return (await response.json()) as FeedbacksList;
  }
}
