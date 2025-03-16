import { Container } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "@tanstack/react-router";
import { useState } from "react";

import { apiClient } from "@/api";
import { SheltersList } from "@/components/features/lists/shelters";
import { LoadedContentController } from "@/components/utils";
import { useIsAdmin } from "@/store";

const PAGE_SIZE = 5;

export const SheltersPage = () => {
  const isAdmin = useIsAdmin();

  if (isAdmin) {
    return <Navigate to="/admin" />;
  }

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["shelters", currentPage],
    queryFn: () =>
      apiClient.animalShelters.getList({
        page: currentPage,
        limit: PAGE_SIZE,
      }),
  });

  return (
    <Container maxW="2xl" py={8} spaceY={4}>
      <LoadedContentController
        isLoading={isLoading}
        isError={!!error}
        isEmpty={isSuccess && data?.items.length === 0}
        errorMessage="Failed to fetch shelters. Please try again."
        emptyMessage="No shelters found"
        data={data ?? null}
      >
        {(shelters) => (
          <SheltersList
            shelters={shelters?.items ?? []}
            totalItems={shelters?.total ?? 0}
            pageSize={PAGE_SIZE}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </LoadedContentController>
    </Container>
  );
};
