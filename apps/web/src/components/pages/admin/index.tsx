import { Accordion, Separator, VStack } from "@chakra-ui/react";
import { Navigate } from "@tanstack/react-router";
import { useState } from "react";

import { apiClient } from "@/api";
import { useMutation } from "@/api/hooks/useMutation";
import { useQuery } from "@/api/hooks/useQuery";
import { AdminVerificationForm } from "@/components/features/forms";
import { AdminSheltersList, UsersList } from "@/components/features/lists";
import { UsersStatistics } from "@/components/features/sections";
import { Icon } from "@/components/ui";
import { LoadedContentController } from "@/components/utils";
import { APIQueryKey } from "@/queries/keys";
import { useIsAdmin, useIsAuthenticated } from "@/store";

export const AdminPage = () => {
  const isAdmin = useIsAdmin();
  const isAuthenticated = useIsAuthenticated();
  const [currentPage, setCurrentPage] = useState(1);
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
    data: usersData,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    isSuccess: isSuccessUsers,
  } = useQuery({
    queryKey: [APIQueryKey.USERS, currentPage],
    queryFn: () => apiClient.admin.getUsersList(),
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
    <VStack align="stretch" spaceY={4}>
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

      <Separator />

      <Accordion.Root collapsible>
        <Accordion.Item value="users-statistics">
          <Accordion.ItemTrigger>
            <Icon name="Users" />
            All Users
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <LoadedContentController
                data={usersData ?? null}
                isLoading={isLoadingUsers}
                isError={isErrorUsers}
                isEmpty={isSuccessUsers && usersData?.users.length === 0}
                errorMessage="Failed to fetch users"
                emptyMessage="No users found"
              >
                {(data) => <UsersList users={data.users} />}
              </LoadedContentController>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>

      <Accordion.Root collapsible>
        <Accordion.Item value="users-statistics">
          <Accordion.ItemTrigger>
            <Icon name="ScatterChart" />
            Users Statistics
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
    </VStack>
  );
};
