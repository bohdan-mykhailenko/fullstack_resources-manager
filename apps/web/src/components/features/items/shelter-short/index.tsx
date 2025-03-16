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
      minW={300}
      width={{
        base: "full",
        md: 600,
        lg: 800,
        xl: 1000,
      }}
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
        <RouterLink to="/$shelterId" params={{ shelterId: String(shelter.id) }}>
          <Heading fontWeight="bold" size="lg" color="white">
            {shelter.name}
          </Heading>{" "}
        </RouterLink>
      </Button>

      <Badge
        colorPalette={shelter.isVerified ? "green" : "red"}
        variant="subtle"
      >
        {shelter.isVerified ? "Verified" : "Unverified"}
      </Badge>
    </HStack>
  );
});
