import { Badge, Button, HStack } from "@chakra-ui/react";

import { apiClient } from "@/api";
import { useMutation } from "@/api/hooks/useMutation";
import { useCurrentUserData } from "@/store";

interface ShelterRatingProps {
  shelterId: string;
  currentRating?: number;
  onSuccess?: () => void;
}

export const ShelterRating = ({
  shelterId,
  currentRating,
  onSuccess,
}: ShelterRatingProps) => {
  const currentUser = useCurrentUserData();

  const { mutate: submitRating, isPending } = useMutation({
    mutationFn: (rating: number) =>
      apiClient.animalSheltersRatings.rate(shelterId, {
        rating,
        userId: Number(currentUser?.id),
      }),
    onSuccess,
    successMessage: "Rating submitted successfully!",
  });

  return (
    <HStack justify="space-between" align="center" w="full">
      <HStack spaceX={1}>
        <HStack spaceX={1}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
            <Button
              size="xs"
              key={rating}
              onClick={() => submitRating(rating)}
              colorPalette="black"
              variant="outline"
              disabled={isPending}
            >
              {rating}
            </Button>
          ))}
        </HStack>
      </HStack>

      <Badge colorPalette="blue" fontSize="sm" color="white" p={2}>
        Average: {currentRating}
      </Badge>
    </HStack>
  );
};
