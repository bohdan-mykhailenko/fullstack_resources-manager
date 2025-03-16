import {
  Badge,
  Button,
  Card,
  HStack,
  Heading,
  IconButton,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";
import { memo } from "react";

import type { AnimalShelterOutput } from "@/api/encore-client/services/animal-shelters/core/interfaces";
import { Icon } from "@/components/ui";

interface ShelterShortItemProps {
  shelter: AnimalShelterOutput;
}

export const ShelterShortItem = memo(({ shelter }: ShelterShortItemProps) => {
  const isVerified = true;

  return (
    <Card.Root
      width={{
        base: "full",
        md: 600,
        lg: 800,
        xl: 1000,
      }}
      variant="outline"
      _hover={{ shadow: "md" }}
      transition="all 0.2s"
    >
      <Card.Header pb={0}>
        <HStack justify="space-between" align="start">
          <VStack align="start" spaceX={1}>
            <Heading fontWeight="bold" size="lg" color="white" bg="bg.muted">
              {shelter.name}
            </Heading>

            <HStack spaceX={2}>
              <Icon name="MapPinHouse" size={16} />

              <Text color="fg.muted" fontSize="sm">
                {shelter.address}
              </Text>
            </HStack>

            {shelter.phone && (
              <HStack spaceX={2}>
                <Icon name="Phone" size={16} />
                <Text color="fg.muted">{shelter.phone}</Text>
              </HStack>
            )}

            <HStack spaceX={2}>
              <Icon name="Globe" size={16} />

              <Text color="fg.muted" fontSize="sm">
                <Link
                  color="blue.600"
                  href={shelter.websiteUrl}
                  target="_blank"
                >
                  {shelter.websiteUrl}
                </Link>
              </Text>
            </HStack>
          </VStack>

          <VStack align="end" spaceY={2}>
            <Badge
              colorPalette={isVerified ? "green" : "gray"}
              variant="subtle"
            >
              {isVerified ? "Verified" : "Unverified"}
            </Badge>

            <Button color="white" colorPalette="black" variant="outline">
              <RouterLink
                to="/$shelterId"
                params={{ shelterId: String(shelter.id) }}
              >
                See details
              </RouterLink>
            </Button>
          </VStack>
        </HStack>
      </Card.Header>

      <Card.Body>
        {shelter.description && (
          <Text color="white">{shelter.description}</Text>
        )}
      </Card.Body>
    </Card.Root>
  );
});
