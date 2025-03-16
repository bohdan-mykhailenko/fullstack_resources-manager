import { removeCookie, setCookie } from "typescript-cookie";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { UserOutput } from "@/api/services/users/interfaces";

import { CookieKey, cookiesStorage } from "../cookies";
import { CurrentUserState } from "./interfaces";

export const useCurrentUser = create<CurrentUserState>()(
  persist(
    (set) => ({
      currentUser: null,

      setCurrentUser: (user) => {
        if (!user) {
          return;
        }

        set({
          currentUser: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        });

        setCookie(CookieKey.ACCESS_TOKEN, user.accessToken);
        setCookie(CookieKey.REFRESH_TOKEN, user.refreshToken);
      },

      clearCurrentUser: () =>
        set({
          currentUser: null,
        }),
    }),
    {
      name: CookieKey.APP_USER,
      storage: createJSONStorage(() => cookiesStorage),
      partialize: (state) => ({
        currentUser: state.currentUser,
      }),
    }
  )
);

export const useIsAuthenticated = () =>
  useCurrentUser((state) => Boolean(state.currentUser));

export const useCurrentUserData = () =>
  useCurrentUser((state) => state.currentUser);

export const useAuthActions = () => {
  const { setCurrentUser, clearCurrentUser } = useCurrentUser();

  return {
    loginUser: (user: UserOutput) => setCurrentUser(user),
    logoutUser: () => {
      clearCurrentUser();

      removeCookie(CookieKey.ACCESS_TOKEN);
      removeCookie(CookieKey.REFRESH_TOKEN);
    },
  };
};
