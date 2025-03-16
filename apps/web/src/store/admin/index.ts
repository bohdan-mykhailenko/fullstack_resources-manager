import { removeCookie, setCookie } from "typescript-cookie";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { CookieKey, cookiesStorage } from "../cookies";
import { AdminState } from "./interfaces";

export const useAdmin = create<AdminState>()(
  persist(
    (set) => ({
      isAdmin: false,

      setAdminToken: (accessToken) => {
        set({
          isAdmin: true,
        });

        setCookie(CookieKey.ADMIN_ACCESS_TOKEN, accessToken);
      },

      clearAdminToken: () => {
        set({ isAdmin: false });

        removeCookie(CookieKey.ADMIN_ACCESS_TOKEN);
      },
    }),
    {
      name: CookieKey.IS_ADMIN,
      storage: createJSONStorage(() => cookiesStorage),
      partialize: (state) => ({
        isAdmin: state.isAdmin,
      }),
    }
  )
);

export const useIsAdmin = () => useAdmin((state) => Boolean(state.isAdmin));

export const useAdminActions = () => {
  const { setAdminToken, clearAdminToken } = useAdmin();

  return {
    loginAdmin: (accessToken: string) => setAdminToken(accessToken),
    logoutAdmin: clearAdminToken,
  };
};
