import { Heading, Separator, Text, VStack } from "@chakra-ui/react";

export const HomePage = () => {
  return (
    <VStack gap={4} align="center">
      <Heading as="h2">Home</Heading>

      <Separator />

      <Text color="fg.muted">
        There are many shelters in the world, but not all of them are good. Some
        of them are not even shelters, but just people who want to help animals.
      </Text>

      <Text color="fg.muted">
        We are here to help you find the best shelter for your pet.
      </Text>
    </VStack>
  );
};
