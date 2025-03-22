import { createQueryKeyStore } from "@lukemorales/query-key-factory";

import { apiClient } from "@/api";
import { PaginationParams } from "@/api/interfaces";

export enum APIQueryKey {
  SHELTERS = "animalShelters",
  ANIMAL_SHELTER_FEEDBACKS = "animalShelterFeedbacks",
  USERS = "users",
  SHELTER = "shelter",
  USERS_STATISTICS = "usersStatistics",
}

// TODO: complete integration
export const queries = createQueryKeyStore({
  [APIQueryKey.SHELTERS]: {
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
