import { Heading, VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useEffect } from "react";

import { apiClient } from "@/api";
import { useMutation } from "@/api/hooks";
import {
  ConfirmEmailInput,
  ConfirmEmailOutput,
} from "@/api/services/users/interfaces";
import { useIsConfirmed } from "@/store";

export const ConfirmEmailTokenPage = () => {
  const isConfirmed = useIsConfirmed();

  const { token } = useParams({ from: "/confirm-email/$token" });

  const navigate = useNavigate();

  const {
    mutate: confirmEmail,
    isPending,
    isSuccess,
    isError,
  } = useMutation<ConfirmEmailOutput, ConfirmEmailInput>({
    mutationFn: (input) => apiClient.users.confirmEmail(input),
  });

  useEffect(() => {
    if (token && !isConfirmed) {
      confirmEmail({ token });
    }
  }, [token, isConfirmed]);

  useEffect(() => {
    if (isSuccess || isConfirmed) {
      navigate({ to: "/sign-in" });
    }
  }, [isSuccess, isConfirmed]);

  return (
    <VStack p={10} spaceY={4} textAlign="center">
      {isPending && (
        <Heading size="lg" as="h2">
          Confirming email...
        </Heading>
      )}

      {isError && (
        <Heading size="lg" as="h2" color="red.500">
          Failed to confirm email
        </Heading>
      )}

      {isSuccess && (
        <Heading size="lg" as="h2">
          Email confirmed
        </Heading>
      )}
    </VStack>
  );
};
