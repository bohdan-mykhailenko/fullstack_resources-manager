import { getCookie, removeCookie, setCookie } from "typescript-cookie";
import { StateStorage } from "zustand/middleware";

export const cookiesStorage: StateStorage = {
  getItem: (name: string) => {
    return getCookie(name) ?? null;
  },
  setItem: (name: string, value: string) => {
    setCookie(name, value, { expires: 1 });
  },
  removeItem: (name: string) => {
    removeCookie(name);
  },
};

export enum CookieKey {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
  ADMIN_ACCESS_TOKEN = "admin_access_token",
  APP_USER = "app_user",
  IS_ADMIN = "is_admin",
}
