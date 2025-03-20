import {
  admin,
  animal_shelters,
  animal_shelters_feedback,
} from "~encore/clients";

import { ShelterFilterParams } from "@/animal-shelters/core/interfaces";
import { PaginationParams } from "@/shared/interfaces";
import { convertDefaultParamsToUndefined } from "@/shared/utils";

import { QueryResolvers } from "../__generated__/resolvers-types";

const queries: QueryResolvers = {
  sheltersList: async (_, { params }) =>
    await animal_shelters.getList(
      convertDefaultParamsToUndefined<PaginationParams>(params)
    ),

  getShelter: async (_, { id }) => await animal_shelters.getOne({ id }),

  filterSheltersList: async (_, { params }) =>
    await animal_shelters.getFilteredList(
      convertDefaultParamsToUndefined<ShelterFilterParams>(params)
    ),

  feedbacksList: async (_, { shelterId, params }) =>
    await animal_shelters_feedback.getList({
      id: shelterId,
      ...convertDefaultParamsToUndefined<PaginationParams>(params),
    }),

  usersStatistics: async () => await admin.usersStatistics(),

  usersList: async () => await admin.usersList(),
};

export default queries;
