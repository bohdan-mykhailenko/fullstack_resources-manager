import { createAuthGenerator } from "./encore-client/authHandler";
import APIClient from "./encore-client/client";

export const apiClient = new APIClient({
  auth: createAuthGenerator,
});

export * from "./rest-client";
