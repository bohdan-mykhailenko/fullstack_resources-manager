import { getCookie, setCookie } from "typescript-cookie";

import {
  clearAuthCookies,
  generateBearerToken,
  isPublicRoute,
  jwtUtils,
} from "@/api/authHandler/utils";
import { APIError, ErrorCode } from "@/api/errors";
import type { AuthHandlerParams } from "@/api/interfaces";
import { CookieKey } from "@/store/cookies";

export async function createAuthGenerator(
  path: string
): Promise<AuthHandlerParams | undefined> {
  console.log("path", path);
  if (isPublicRoute(path)) {
    return undefined;
  }

  const adminAccessToken = getCookie(CookieKey.ADMIN_ACCESS_TOKEN);

  if (adminAccessToken) {
    if (jwtUtils.isTokenExpired(adminAccessToken)) {
      throw new APIError(401, {
        code: ErrorCode.Unauthenticated,
        message: "Your admin session has expired. Please log in again.",
      });
    }

    return {
      authorization: generateBearerToken(adminAccessToken),
      accessType: "admin",
    };
  }

  const accessToken = getCookie(CookieKey.ACCESS_TOKEN);
  const refreshToken = getCookie(CookieKey.REFRESH_TOKEN);

  if (!accessToken && !refreshToken) {
    throw new APIError(401, {
      code: ErrorCode.Unauthenticated,
      message: "Your need to log in to continue.",
    });
  }

  if (accessToken && !jwtUtils.isTokenExpired(accessToken)) {
    return {
      authorization: generateBearerToken(accessToken),
      accessType: "user",
    };
  }

  if (refreshToken && !jwtUtils.isTokenExpired(refreshToken)) {
    try {
      // avoid circular dependency by importing apiClient dynamically
      const { apiClient } = await import("../index");
      const result = await apiClient.users.refresh({
        refreshToken,
      });

      setCookie(CookieKey.ACCESS_TOKEN, result.accessToken);

      return {
        authorization: generateBearerToken(result.accessToken),
        accessType: "user",
      };
    } catch {
      clearAuthCookies();

      throw new APIError(401, {
        code: ErrorCode.Unauthenticated,
        message: "Failed to refresh authentication token",
      });
    }
  }

  clearAuthCookies();

  throw new APIError(401, {
    code: ErrorCode.Unauthenticated,
    message: "Your session has expired. Please log in again.",
  });
}
