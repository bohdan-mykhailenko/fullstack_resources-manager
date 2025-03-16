import { Box } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";

import { apiClient } from "@/api";
import { useQuery } from "@/api/hooks";
import { APIQueryKey } from "@/queries/keys";
import { useIsAuthenticated } from "@/store";

export const HomePage = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return navigate({ to: "/sign-in" });
  }

  const { data } = useQuery({
    queryKey: APIQueryKey.ANIMAL_SHELTERS,
    queryFn: () =>
      apiClient.animalShelters.getList({
        limit: 10,
        page: 1,
      }),
    enabled: isAuthenticated,
  });

  console.log("DATA", data);

  return (
    <Box p={10} bg="red">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </Box>
  );
};
