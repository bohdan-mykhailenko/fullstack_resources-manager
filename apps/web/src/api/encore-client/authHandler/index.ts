import { getCookie, setCookie } from "typescript-cookie";

import { APIError, ErrorCode } from "../errors";
import { AuthHandlerParams } from "../interfaces";
import { AuthCookieKey } from "./keys";
import { clearAuthCookies, generateBearerToken, jwtUtils } from "./utils";

export async function createAuthGenerator(): Promise<
  AuthHandlerParams | undefined
> {
  const accessToken = getCookie(AuthCookieKey.ACCESS_TOKEN);
  const refreshToken = getCookie(AuthCookieKey.REFRESH_TOKEN);
  const isAdmin = getCookie(AuthCookieKey.IS_ADMIN) === "true";

  // if (!accessToken && !refreshToken) {
  //   return undefined;
  // }

  // if (accessToken && !jwtUtils.isTokenExpired(accessToken)) {
  //   return {
  //     authorization: generateBearerToken(accessToken),
  //     accessType: isAdmin ? "admin" : "user",
  //   };
  // }

  if (refreshToken && !jwtUtils.isTokenExpired(refreshToken)) {
    try {
      // avoid circular dependency by importing apiClient dynamically
      const { apiClient } = await import("../../index");
      const result = await apiClient.users.refresh({
        refreshToken,
      });

      setCookie(AuthCookieKey.ACCESS_TOKEN, result.accessToken);

      return {
        authorization: generateBearerToken(result.accessToken),
        accessType: isAdmin ? "admin" : "user",
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
    message: "Authentication expired",
  });
}
