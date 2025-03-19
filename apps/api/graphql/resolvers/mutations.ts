import { users } from "~encore/clients";

import { MutationResolvers } from "../__generated__/resolvers-types";

const mutations: MutationResolvers = {
  signUp: async (_, { params }) => await users.signUp(params),
};

export default mutations;
