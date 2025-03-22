import { APIError } from "encore.dev/api";
import { secret } from "encore.dev/config";

import jwt from "jsonwebtoken";

import { UserIdParams } from "@/shared/interfaces";

import { UserJWTPayload } from "./interfaces";

const JWT_SECRET = secret("JWT_SECRET")();
const CONFIRMATION_SECRET = secret("CONFIRMATION_SECRET")();

const ACCESS_TOKEN_EXPIRY = "1d";
const REFRESH_TOKEN_EXPIRY = "1h";
const CONFIRMATION_TOKEN_EXPIRY = "8h";

const TOKEN_TO_URL_SAFE_REGEX = /\./g;
const URL_SAFE_TO_TOKEN_REGEX = /_/g;

export const generateTokens = (userId: number) => {
  const accessToken = jwt.sign(
    { userId } satisfies UserJWTPayload,
    JWT_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );

  const refreshToken = jwt.sign({ userId } satisfies UserIdParams, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

  return { accessToken, refreshToken };
};

export const generateConfirmationToken = (userId: number): string => {
  const token = jwt.sign({ userId }, CONFIRMATION_SECRET, {
    expiresIn: CONFIRMATION_TOKEN_EXPIRY,
  });

  return token.replace(TOKEN_TO_URL_SAFE_REGEX, "_");
};

export const verifyConfirmationToken = (
  urlSafeToken: string
): UserIdParams | null => {
  try {
    const token = urlSafeToken.replace(URL_SAFE_TO_TOKEN_REGEX, ".");

    const decodedResult = jwt.verify(token, CONFIRMATION_SECRET);

    if (!decodedResult) {
      throw APIError.unauthenticated("Invalid token");
    }

    return { userId: (decodedResult as UserJWTPayload).userId };
  } catch {
    throw APIError.unauthenticated("Invalid token");
  }
};
