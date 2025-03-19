import { animal_shelters } from "~encore/clients";

import { QueryResolvers } from "../__generated__/resolvers-types";

const queries: QueryResolvers = {
  sheltersList: async (_, { params }) => await animal_shelters.getList(params),
};

export default queries;
