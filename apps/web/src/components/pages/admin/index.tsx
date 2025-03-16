import { Navigate } from "@tanstack/react-router";
import { useState } from "react";

import { apiClient } from "@/api";
import { useMutation } from "@/api/hooks/useMutation";
import { useQuery } from "@/api/hooks/useQuery";
import { AdminVerificationForm } from "@/components/features/forms";
import { AdminSheltersList } from "@/components/features/lists";
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
  );
};
