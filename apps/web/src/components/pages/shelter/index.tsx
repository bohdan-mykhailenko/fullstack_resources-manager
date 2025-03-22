import { Container, Separator, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

import { apiClient } from "@/api";
import { FeedbackForm, FeedbackList } from "@/components/features";
import { ShelterDetails, ShelterRating } from "@/components/features/sections";
import { LoadedContentController } from "@/components/utils";
import { APIQueryKey } from "@/queries/keys";
import { useIsAdmin } from "@/store";

const FEEDBACK_PAGE_SIZE = 10;

export const ShelterPage = () => {
  const isAdmin = useIsAdmin();

  const { shelterId: id } = useParams({ from: "/shelters/$shelterId" });

  const {
    data: shelter,
    isLoading,
    error,
    isSuccess,
    refetch: refetchShelter,
  } = useQuery({
    queryKey: [APIQueryKey.SHELTER, id],
    queryFn: () => apiClient.animalShelters.getOne(id),
  });

  const { data: feedbacks, refetch: refetchFeedbacks } = useQuery({
    queryKey: [APIQueryKey.ANIMAL_SHELTER_FEEDBACKS, id],
    queryFn: () =>
      apiClient.animalSheltersFeedback.getList(id, {
        page: 1,
        limit: FEEDBACK_PAGE_SIZE,
      }),
  });

  return (
    <Container maxW="2xl" py={8} spaceY={4}>
      <LoadedContentController
        isLoading={isLoading}
        isError={!!error}
        isEmpty={isSuccess && !shelter}
        errorMessage="Failed to fetch shelter details. Please try again."
        emptyMessage="Shelter not found"
        data={shelter ?? null}
      >
        {(data) => (
          <VStack spaceY={3} align="stretch">
            {!isAdmin && (
              <ShelterRating
                shelterId={id}
                currentRating={shelter?.average_rating}
                onSuccess={() => {
                  refetchShelter();
                }}
              />
            )}

            <ShelterDetails shelter={data} />

            {!isAdmin && (
              <>
                <Separator />

                <VStack spaceY={4} align="stretch">
                  <FeedbackForm
                    shelterId={id}
                    onSuccess={() => {
                      refetchFeedbacks();
                    }}
                  />

                  {feedbacks && <FeedbackList feedbacks={feedbacks.items} />}
                </VStack>
              </>
            )}
          </VStack>
        )}
      </LoadedContentController>
    </Container>
  );
};
