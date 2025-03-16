import { Container, Separator, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "@tanstack/react-router";

import { getMockPaginatedFeedbacks } from "@/__mocks/shelter_feedbacks";
import { mockShelter } from "@/__mocks/shelter_item";
import { apiClient } from "@/api";
import { FeedbackForm, FeedbackList } from "@/components/features";
import { ShelterDetails, ShelterRating } from "@/components/features/sections";
import { LoadedContentController } from "@/components/utils";
import { APIQueryKey } from "@/queries/keys";
import { useIsAdmin } from "@/store";

const FEEDBACK_PAGE_SIZE = 10;

export const ShelterPage = () => {
  const isAdmin = useIsAdmin();

  if (isAdmin) {
    return <Navigate to="/admin" />;
  }

  const { shelterId: id } = useParams({ from: "/$shelterId" });

  const _shelter = mockShelter;
  const _feedbacks = getMockPaginatedFeedbacks(1, FEEDBACK_PAGE_SIZE);
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
    <Container maxW="container.lg" py={8}>
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
            <ShelterRating
              shelterId={id}
              currentRating={shelter?.averageRating}
              onSuccess={() => {
                refetchShelter();
              }}
            />

            <Separator />

            <ShelterDetails shelter={data} />

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
          </VStack>
        )}
      </LoadedContentController>
    </Container>
  );
};
