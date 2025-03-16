import { BaseAPIClient } from "@/api/services/baseClient";

import type { AdminInput, AdminOutput } from "./interfaces";

export class AdminServiceClient {
  private baseClient: BaseAPIClient;

  constructor(baseClient: BaseAPIClient) {
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
