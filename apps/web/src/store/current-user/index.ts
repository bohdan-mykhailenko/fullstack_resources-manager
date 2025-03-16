import { setCookie } from "typescript-cookie";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { UserOutput } from "@/api/services/users/interfaces";

import { cookiesStorage } from "../cookies";
import { CurrentUserState } from "./interfaces";

const COOKIE_NAME = "app_user";

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

        setCookie("accessToken", user.accessToken);
        setCookie("refreshToken", user.refreshToken);
      },

      clearCurrentUser: () =>
        set({
          currentUser: null,
        }),
    }),
    {
      name: COOKIE_NAME,
      storage: createJSONStorage(() => cookiesStorage),
      partialize: (state) => ({
        currentUser: state.currentUser,
      }),
      // onRehydrateStorage: () => (state) => {
      //   if (state) {
      //     state.isAuthenticated = Boolean(state.currentUser);
      //   }
      // },
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

      document.cookie = "";
    },
  };
};
