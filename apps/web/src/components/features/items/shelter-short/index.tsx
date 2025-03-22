import { Badge, Button, HStack, Heading } from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";
import { memo } from "react";

import type { AnimalShelterOutput } from "@/api/services/animal-shelters/core/interfaces";

interface ShelterShortItemProps {
  shelter: AnimalShelterOutput;
}

export const ShelterShortItem = memo(({ shelter }: ShelterShortItemProps) => {
  return (
    <HStack
      width="100%"
      _hover={{ shadow: "md" }}
      transition="all 0.2s"
      justify="space-between"
      align="center"
      p={2}
      border="1px solid"
      borderColor="bg.muted"
      borderRadius="md"
    >
      <Button color="white" colorPalette="black" variant="ghost">
        <RouterLink
          to="/shelters/$shelterId"
          params={{ shelterId: String(shelter.id) }}
        >
          <Heading fontWeight="bold" size="lg" color="white">
            {shelter.name}
          </Heading>{" "}
        </RouterLink>
      </Button>

      <Badge
        colorPalette={shelter.is_verified ? "green" : "red"}
        variant="subtle"
      >
        {shelter.is_verified ? "Verified" : "Unverified"}
      </Badge>
    </HStack>
  );
});
