import {
  Badge,
  Card,
  HStack,
  Heading,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { memo } from "react";

import type { AnimalShelterOutput } from "@/api/services/animal-shelters/core/interfaces";
import { Icon } from "@/components/ui";

interface ShelterDetailsProps {
  shelter: AnimalShelterOutput;
}

export const ShelterDetails = memo(({ shelter }: ShelterDetailsProps) => {
  return (
    <Card.Root width="full" variant="outline">
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
              <Link color="blue.600" href={shelter.website_url} target="_blank">
                {shelter.website_url}
              </Link>
            </HStack>
          </VStack>

          <Badge
            colorPalette={shelter.is_verified ? "green" : "gray"}
            variant="subtle"
          >
            {shelter.is_verified ? "Verified" : "Unverified"}
          </Badge>
        </HStack>
      </Card.Header>

      <Card.Body>
        <VStack align="start" spaceY={2}>
          {shelter.image_url && (
            <Image src={shelter.image_url} alt={shelter.name} />
          )}

          {shelter.description && (
            <Text color="white">{shelter.description}</Text>
          )}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
});
