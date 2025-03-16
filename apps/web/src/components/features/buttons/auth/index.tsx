import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "@tanstack/react-router";

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

  console.log("AUTH BUTTON", isAuthenticated, isAdmin);

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

  if (!isAuthenticated) {
    return (
      <Button colorPalette="blue" variant="subtle" color="white">
        <Link to="/sign-in">Sign In</Link>
      </Button>
    );
  }
};
