import { createQueryKeyStore } from "@lukemorales/query-key-factory";

import { apiClient } from "@/api";
import { PaginationParams } from "@/api/shared/interfaces";

export enum APIQueryKey {
  ANIMAL_SHELTERS = "animalShelters",
  ANIMAL_SHELTER_FEEDBACKS = "animalShelterFeedbacks",
  USERS = "users",
  SHELTER = "shelter",
}

// TODO: complete integration
export const queries = createQueryKeyStore({
  [APIQueryKey.ANIMAL_SHELTERS]: {
    one: (id: string) => ({
      queryKey: [id],
      queryFn: () => apiClient.animalShelters.getOne(id),
    }),
    list: (params: PaginationParams) => ({
      queryKey: [params],
      queryFn: () => apiClient.animalShelters.getList(params),
    }),
  },
});
