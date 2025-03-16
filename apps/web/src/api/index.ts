import { createAuthGenerator } from "./authHandler";
import APIClient from "./client";

export const apiClient = new APIClient({
  auth: createAuthGenerator,
});
