import { JwtPayload } from "jsonwebtoken";

import { UserIdParams } from "@/shared/interfaces";

export interface SignUpOutput {
  confirmation_token: string;
}

export interface UserOutput {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  is_confirmed: boolean;
}

export interface UserJWTPayload extends UserIdParams, JwtPayload {}

export interface RefreshTokenInput {
  refreshToken: string;
}

export interface RefreshTokenOutput {
  accessToken: string;
}

export interface ConfirmEmailParams extends SignUpOutput {}
