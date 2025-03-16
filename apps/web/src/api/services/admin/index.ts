import { BaseAPIClient } from "@/api/services/baseClient";

import type {
  AdminInput,
  AdminOutput,
  UsersList,
  UsersStatistics,
} from "./interfaces";

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

  public async getUsersStatistics(): Promise<UsersStatistics> {
    const response = await this.baseClient.callTypedAPI<UsersStatistics>(
      "GET",
      `/admin/statistics`
    );

    return await response.json();
  }

  public async getUsersList(): Promise<UsersList> {
    const response = await this.baseClient.callTypedAPI<UsersList>(
      "GET",
      `/admin/users`
    );

    return await response.json();
  }
}
