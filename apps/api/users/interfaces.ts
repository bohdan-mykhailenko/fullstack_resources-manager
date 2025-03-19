import { JwtPayload } from "jsonwebtoken";

import { UserIdParams } from "@/shared/interfaces";

export interface UserOutput {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  is_confirmed: boolean;
}

export interface SignUpOutput extends UserOutput {}

export interface SignInOutput extends UserOutput {
  accessToken: string;
  refreshToken: string;
}

export interface UserJWTPayload extends UserIdParams, JwtPayload {}

export interface RefreshTokenInput {
  refreshToken: string;
}

export interface RefreshTokenOutput {
  accessToken: string;
}

export interface ConfirmEmailParams {
  token: string;
}
