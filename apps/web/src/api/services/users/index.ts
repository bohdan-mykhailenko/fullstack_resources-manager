import { BaseAPIClient } from "@/api/services/baseClient";

import type {
  ConfirmEmailInput,
  ConfirmEmailOutput,
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

  public async refresh(params: { refreshToken: string }) {
    const response = await this.baseClient.callTypedAPI<RefreshTokenOutput>(
      "POST",
      `/refresh-token`,
      JSON.stringify(params)
    );

    return await response.json();
  }

  public async signIn(params: SignInInput) {
    const response = await this.baseClient.callTypedAPI<UserOutput>(
      "POST",
      `/sign-in`,
      JSON.stringify(params)
    );

    return await response.json();
  }

  public async signUp(params: SignUpInput) {
    const response = await this.baseClient.callTypedAPI<UserOutput>(
      "POST",
      `/sign-up`,
      JSON.stringify(params)
    );

    return await response.json();
  }

  public async confirmEmail(params: ConfirmEmailInput) {
    const response = await this.baseClient.callTypedAPI<ConfirmEmailOutput>(
      "POST",
      `/confirm-email/${params.token}`
    );

    return await response.json();
  }
}
