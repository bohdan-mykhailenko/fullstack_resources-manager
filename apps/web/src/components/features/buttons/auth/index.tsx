import { Button } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";

import { useAuthActions, useIsAuthenticated } from "@/store";

export const AuthButton = () => {
  const isAuthenticated = useIsAuthenticated();
  const { logoutUser } = useAuthActions();
  const navigate = useNavigate();

  const location = useLocation();

  if (isAuthenticated) {
    return (
      <Button
        colorPalette="black"
        onClick={() => {
          logoutUser();

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
