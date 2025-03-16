import { Button } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";

import {
  useAdminActions,
  useAuthActions,
  useIsAdmin,
  useIsAuthenticated,
} from "@/store";

export const AuthButton = () => {
  const isAdmin = useIsAdmin();
  const isAuthenticated = useIsAuthenticated();
  const { logoutUser } = useAuthActions();
  const { logoutAdmin } = useAdminActions();
  const navigate = useNavigate();

  const location = useLocation();

  if (isAuthenticated || isAdmin) {
    return (
      <Button
        colorPalette="black"
        onClick={() => {
          if (isAdmin) {
            logoutAdmin();
          } else {
            logoutUser();
          }

          navigate({ to: "/sign-in" });
        }}
      >
        Logout
      </Button>
    );
  }

  if (location.pathname === "/sign-up") {
    return null;
  }

  return (
    <Button colorPalette="blue" variant="subtle" color="white">
      <Link to="/sign-up">Sign Up</Link>
    </Button>
  );
};
