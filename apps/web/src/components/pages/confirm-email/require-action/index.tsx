import { Heading, Text, VStack } from "@chakra-ui/react";
import { Navigate } from "@tanstack/react-router";

import { useIsConfirmed } from "@/store/current-user";

export const ConfirmEmailRequireActionPage = () => {
  const isConfirmed = useIsConfirmed();

  if (isConfirmed) {
    return <Navigate to="/" />;
  }

  return (
    <VStack p={10} spaceY={4} textAlign="center">
      <Heading size="lg" as="h2">
        Please check your email for a confirmation link.
      </Heading>

      <Text color="fg.muted">
        If you don&apos;t see the confirmation email in your inbox, please check
        your spam folder.
      </Text>
    </VStack>
  );
};
