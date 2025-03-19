import {
  admin,
  animal_shelters,
  animal_shelters_feedback,
  animal_shelters_ratings,
  users,
} from "~encore/clients";

import { convertDefaultParamsToUndefined } from "@/shared/utils";

import { MutationResolvers } from "../__generated__/resolvers-types";

const mutations: MutationResolvers = {
  signUp: async (_, { params }) => await users.signUp(params),

  signIn: async (_, { params }) => await users.signIn(params),

  refreshToken: async (_, { refreshToken }) =>
    await users.refresh({ refreshToken }),

  confirmEmail: async (_, { token }) => await users.confirmEmail({ token }),

  adminAuth: async (_, { password }) => await admin.authenticate({ password }),

  createShelter: async (_, { params }) => await animal_shelters.create(params),

  updateShelter: async (_, { id, params }) =>
    await animal_shelters.update({
      ...convertDefaultParamsToUndefined(params),
      id,
    }),

  deleteShelter: async (_, { id }) => await animal_shelters.remove({ id }),

  verifyShelter: async (_, { id }) => await animal_shelters.verify({ id }),

  unverifyShelter: async (_, { id }) => await animal_shelters.unverify({ id }),

  addFeedback: async (_, { shelterId, content }, context) =>
    await animal_shelters_feedback.add({
      id: shelterId,
      content,
      userId: context.userId,
    }),

  rateShelter: async (_, { shelterId, rating }, context) =>
    await animal_shelters_ratings.rate({
      id: shelterId,
      rating,
      userId: context.userId,
    }),
};

export default mutations;
