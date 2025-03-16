import { BaseAPIClient } from "@/api/services/baseClient";

import type {
  RefreshTokenOutput,
  SignInInput,
  SignUpInput,
  UserOutput,
} from "./interfaces";

export class UsersServiceClient {
  private baseClient: BaseAPIClient;

  constructor(baseClient: BaseAPIClient) {
    this.baseClient = baseClient;
  }

  public async refresh(params: {
    refreshToken: string;
  }): Promise<RefreshTokenOutput> {
    const response = await this.baseClient.callTypedAPI(
      "POST",
      `/refresh-token`,
      JSON.stringify(params)
    );

    return (await response.json()) as RefreshTokenOutput;
  }

  public async signIn(params: SignInInput): Promise<UserOutput> {
    const response = await this.baseClient.callTypedAPI(
      "POST",
      `/sign-in`,
      JSON.stringify(params)
    );

    return (await response.json()) as UserOutput;
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
