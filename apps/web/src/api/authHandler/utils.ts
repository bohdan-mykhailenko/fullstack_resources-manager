import jwt from "jsonwebtoken";
import { removeCookie } from "typescript-cookie";

import { SECOND } from "@/constants";
import { CookieKey } from "@/store/cookies";

interface JWTPayload {
  exp?: number;
  [key: string]: unknown;
}

export const jwtUtils = {
  isTokenExpired(token: string | undefined): boolean {
    if (!token) return true;

    try {
      const decoded = jwt.decode(token) as JWTPayload | null;
      if (!decoded?.exp) return true;

      // exp is in seconds, Date.now() is in milliseconds
      return decoded.exp * SECOND <= Date.now();
    } catch {
      return true;
    }
  },

  getTimeUntilExpiry(token: string): number | null {
    try {
      const decoded = jwt.decode(token) as JWTPayload | null;
      if (!decoded?.exp) return null;

      return decoded.exp * SECOND - Date.now();
    } catch {
      return null;
    }
  },

  decodeToken<T extends JWTPayload>(token: string): T | null {
    try {
      return jwt.decode(token) as T;
    } catch {
      return null;
    }
  },
};

export const clearAuthCookies = () => {
  [
    CookieKey.ACCESS_TOKEN,
    CookieKey.REFRESH_TOKEN,
    CookieKey.ADMIN_ACCESS_TOKEN,
  ].forEach((key) => removeCookie(key));
};

export const generateBearerToken = (accessToken: string) =>
  `Bearer ${accessToken}`;
