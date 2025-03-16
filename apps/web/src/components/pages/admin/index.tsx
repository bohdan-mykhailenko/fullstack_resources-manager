import {
  Accordion,
  Button,
  Container,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Navigate } from "@tanstack/react-router";
import { useState } from "react";

import { apiClient } from "@/api";
import { useMutation } from "@/api/hooks/useMutation";
import { useQuery } from "@/api/hooks/useQuery";
import {
  AdminVerificationForm,
  CreateShelterForm,
} from "@/components/features/forms";
import { AdminSheltersList } from "@/components/features/lists";
import { UsersStatistics } from "@/components/features/sections";
import { Dialog, Icon } from "@/components/ui";
import { LoadedContentController } from "@/components/utils";
import { APIQueryKey } from "@/queries/keys";
import { useIsAdmin, useIsAuthenticated } from "@/store";

export const AdminPage = () => {
  const isAdmin = useIsAdmin();
  const isAuthenticated = useIsAuthenticated();
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const pageSize = 10;

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!isAdmin) {
    return <AdminVerificationForm />;
  }

  const {
    data: sheltersData,
    refetch: refetchShelters,
    isLoading: isLoadingShelters,
    isError: isErrorShelters,
    isSuccess: isSuccessShelters,
  } = useQuery({
    queryKey: [APIQueryKey.ANIMAL_SHELTERS, currentPage],
    queryFn: () =>
      apiClient.animalShelters.getList({ page: currentPage, limit: pageSize }),
  });

  const {
    data: statisticsData,
    isLoading: isLoadingStatistics,
    isError: isErrorStatistics,
    isSuccess: isSuccessStatistics,
  } = useQuery({
    queryKey: [APIQueryKey.USERS_STATISTICS],
    queryFn: () => apiClient.admin.getUsersStatistics(),
  });

  const { mutate: deleteShelter } = useMutation({
    mutationFn: (id: string) => apiClient.animalShelters.remove(id),
    successMessage: "Shelter deleted successfully!",
    onSuccess: () => refetchShelters(),
  });

  const { mutate: verifyShelter } = useMutation({
    mutationFn: (id: string) => apiClient.animalShelters.verify(id),
    successMessage: "Shelter verified successfully!",
    onSuccess: () => refetchShelters(),
  });

  const { mutate: unverifyShelter } = useMutation({
    mutationFn: (id: string) => apiClient.animalShelters.unverify(id),
    successMessage: "Shelter unverified successfully!",
    onSuccess: () => refetchShelters(),
  });

  return (
    <Container maxW="2xl" py={8} spaceY={6}>
      <HStack justify="space-between" w="full">
        <Text fontSize="xl" fontWeight="bold">
          Shelters Management
        </Text>

        <Dialog
          title="Create New Shelter"
          trigger={
            <Button colorPalette="black" variant="subtle">
              <Icon name="Plus" />
              Create Shelter
            </Button>
          }
          onOpenChange={(event) => setIsCreateDialogOpen(event.open)}
          isOpen={isCreateDialogOpen}
        >
          <CreateShelterForm
            onSuccess={() => {
              setIsCreateDialogOpen(false);
              refetchShelters();
            }}
          />
        </Dialog>
      </HStack>

      <LoadedContentController
        data={sheltersData ?? null}
        isLoading={isLoadingShelters}
        isError={isErrorShelters}
        isEmpty={isSuccessShelters && sheltersData?.items.length === 0}
        errorMessage="Failed to fetch shelters"
        emptyMessage="No shelters found"
      >
        {(data) => (
          <AdminSheltersList
            shelters={data.items || []}
            totalItems={data.total || 0}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onDelete={deleteShelter}
            onVerify={verifyShelter}
            onUnverify={unverifyShelter}
            onRefetchList={refetchShelters}
          />
        )}
      </LoadedContentController>

      <Accordion.Root collapsible multiple>
        <Accordion.Item value="users-statistics">
          <Accordion.ItemTrigger justifyContent="space-between">
            <HStack spaceX={2}>
              <Icon name="ScatterChart" />
              <Heading size="lg">Users Statistics</Heading>
            </HStack>

            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <LoadedContentController
                data={statisticsData ?? null}
                isLoading={isLoadingStatistics}
                isError={isErrorStatistics}
                isEmpty={isSuccessStatistics && statisticsData === null}
                errorMessage="Failed to fetch statistics"
                emptyMessage="No statistics found"
              >
                {(data) => <UsersStatistics statistics={data} />}
              </LoadedContentController>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </Container>
  );
};
